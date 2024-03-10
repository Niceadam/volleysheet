package main

import (
	"context"

	"github.com/Niceadam/volleysheet/backend"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) CoreNewMatch() bool {
	// TODO
	return true
}

func (a *App) CoreNewTeam() bool {
	// TODO
	return true
}

func (a *App) CoreAssignPoint(team int) bool {
	setWon, _ := backend.AssignPoint(team)
	return setWon
}

func (a *App) CoreTimeOut(team int) bool {
	return backend.TimeOut(team)
}

func (a *App) CoreSwitchServe() {
	backend.SwitchServe()
}

type SubReturn struct {
	LiberoSub bool   `json:"liberoSub"`
	Err       string `json:"err"`
}

func (a *App) CoreSub(team int, in int, out int) SubReturn {
	liberoSub, err := backend.Sub(team, backend.Num(in), backend.Num(out))
	message := ""
	if err != nil {
		message = err.Error()
	}
	return SubReturn{LiberoSub: liberoSub, Err: message}
}

func (a *App) CoreGetMatch() backend.Match {
	return *backend.GetMatch()
}

func (a *App) CoreExportMatch() bool {
	return backend.ExportMatch()
}
