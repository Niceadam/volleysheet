package backend

import (
	"errors"
)

const maxTimeOuts = 2
const allowedSubCount = 12

const timeOutTime = 30
const setBreakTime = 3 * 60

type Num int

type Player struct {
	Num     Num    `json:"num"`
	Name    string `json:"name"`
	Libero  bool   `json:"libero"`
	Captain bool   `json:"captain"`
	SubNum  Num    `json:"subNum"`
}

type Team struct {
	Name    string         `json:"name"`
	Players map[Num]Player `json:"players"`
}

type TeamState struct {
	Team *Team `json:"team"`

	Score    int `json:"score"`
	SetsWon  int `json:"setsWon"`
	TimeOuts int `json:"timeOuts"`
	SubCount int `json:"subCount"`

	Rotation []*Player `json:"rotation"`
	Bench    []*Player `json:"bench"`
}

type Match struct {
	TeamState [2]*TeamState `json:"teamState"`
	ServeSide int           `json:"serveSide"`
}

var match *Match

func AssignPoint(teamWin int) (setWon bool) {
	team := match.TeamState[teamWin]

	// Add point
	team.Score++
	score1 := match.TeamState[teamWin].Score
	score2 := match.TeamState[1-teamWin].Score

	// Check for end of set
	if score1 >= 25 && (score1-score2) == 2 {
		return true
	}

	// Rotate
	match.ServeSide = teamWin
	newRot := team.Rotation[:]
	newRot = append(newRot[1:], newRot[0])
	team.Rotation = newRot

	// Mandatory: sub out libero if in frontrow
	num := team.Rotation[4].Num
	if team.isLibero(num) {
		team.switchPlayers(team.LiberoSub, num)
	}

	return false
}

func SwitchServe() {
	match.ServeSide = 1 - match.ServeSide
}

func TimeOut(team int) (canTimeOut bool) {
	timeOuts := &match.TeamState[team].TimeOuts
	*timeOuts++
	return *timeOuts < maxTimeOuts
}

func (team *TeamState) isLibero(num Num) bool {
	for i, player := range team.Team.Players {
		if i == num {
			return player.Libero
		}
	}
	return false
}

func (team *TeamState) isBackRow(num Num) bool {
	return team.Rotation[0].Num == num || team.Rotation[4].Num == num || team.Rotation[5].Num == num
}

func Sub(teamIdx int, playerIn Num, playerOut Num) (liberoSub bool, err error) {
	// TODO
	team := match.TeamState[teamIdx]

	inIsLibero := team.isLibero(playerIn)
	outIsLibero := team.isLibero(playerOut)

	// libero <-> libero
	if inIsLibero && outIsLibero {
		team.switchPlayers(playerIn, playerOut)
		return true, nil
	}

	// libero <-> player
	if inIsLibero {
		if !team.isBackRow(playerOut) {
			return true, errors.New("Libero Substitution invalid: Player must be back row")
		} else {
			team.switchPlayers(playerIn, playerOut)
			return true, nil
		}
	}

	// player <-> libero
	if outIsLibero {
		team.switchPlayers(playerIn, playerOut)
		return true, nil
	}

	// player <-> player
	if team.SubCount == allowedSubCount {
		return false, errors.New("Substitution invalid: Reached maximum allowed substitutions")
	}

	_, exists := team.NormSub[playerOut]
	if exists {
		return false, errors.New("Substituation invalid: This player already substituted with different player")
	}

	team.switchPlayers(playerIn, playerOut)
	team.SubCount++
	return false, nil
}

func GetMatch() *Match {
	return match
}

func ExportMatch() bool {
	// TODO
	return true
}

func init() {
	team1 := Team{
		Name: "Lunds VK",
		Players: map[Num]Player{
			Num(1):  {Name: "Matt Anderson"},
			Num(2):  {Name: "Taylor Averill"},
			Num(3):  {Name: "Mason Briggs"},
			Num(4):  {Name: "Ethan Champlin"},
			Num(5):  {Name: "Micah Christenson"},
			Num(8):  {Name: "Kyle Dagostino", Libero: true, Captain: true},
			Num(10): {Name: "TJ DeFalco", Libero: true},
			Num(12): {Name: "Kyle Ensing"},
		},
	}

	team2 := Team{
		Name: "Svedala Volley",
		Players: map[Num]Player{
			Num(1):  {Name: "Yuji Nishida"},
			Num(2):  {Name: "Taishi Onodera"},
			Num(3):  {Name: "Akihiro Fukatsu", Libero: true},
			Num(4):  {Name: "Tatsunori Otsuka", Libero: true},
			Num(5):  {Name: "Akihiro Yamauchi"},
			Num(8):  {Name: "Kenta Takanashi"},
			Num(10): {Name: "Masahiro Sekita", Captain: true},
			Num(12): {Name: "Masaki Oya"},
		},
	}

	team1State := TeamState{
		Team: &team1,
	}

	team2State := TeamState{
		Team: &team2,
	}

	match = &Match{
		TeamState: [2]*TeamState{&team1State, &team2State},
		ServeSide: 1,
	}
}
