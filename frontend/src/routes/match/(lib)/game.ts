import {
  modal,
  bench,
  court,
  score,
  state,
  teamState,
  type Player
} from "../stores"
import { get } from 'svelte/store'
import { goto } from '$app/navigation'

export function callTimeOut(team: number) {
  state.set("timeOut");
  teamState.update(state => {
    state.timeOuts[team]++
    return state
  })
}

export function getSubOptions(select: Player, team: number) {
  let subsOnBench: number[];
  let subOptions: Player[];
  let bencht: Player[] = get(bench)[team]
  let courtt: Player[] = get(court)[team]

  subsOnBench = courtt
    .filter((player: Player) => (player.sub !== undefined) && !player.libero)
    .map((player: Player) => player.sub);

  if (select.sub !== undefined) {
    // Player is already substituted, one option to sub back
    subOptions = [bencht[select.sub]];
  } else {
    // Anyone can sub in, except libero and subs
    subOptions = bencht.filter((player: Player, idx: number) =>
      !player.libero && !subsOnBench.includes(idx)
    );
  }

  return subOptions
}

export function liberoOut(team: number) {
  let libero = get(court)[team].find((player: Player) => player.libero)
  let playerIn = get(bench)[team][libero.sub]

  callSubs(team, libero, playerIn)

  teamState.update(state => {
    state.liberoIn[team] = false
    return state
  })

  modal.set({
    type: "liberoExit",
    data: {
      team: team,
      libero: libero,
      playerIn: playerIn
    }
  })
}

export function callSubs(team: number, courtPlayer: Player, benchPlayer: Player) {
  let benchIdx = get(bench)[team].indexOf(benchPlayer)
  let courtIdx = get(court)[team].indexOf(courtPlayer)

  let liberoSub = courtPlayer.libero || benchPlayer.libero

  if (courtPlayer.sub !== undefined) {
    if (!liberoSub) {
      benchPlayer.doneSub = true
    }
  } else {
    benchPlayer.sub = benchIdx
  }

  bench.update((bench) => {
    delete courtPlayer.sub
    bench[team][benchIdx] = courtPlayer
    return bench
  })

  court.update((court) => {
    court[team][courtIdx] = benchPlayer
    return court
  })

  teamState.update(state => {
    if (!liberoSub) {
      state.subCount[team]++
    } else {
      state.doneLibero[team] = true
    }
    return state
  })
}

export function scorePoint(team: number) {
  score.update(score => {
    score.points[team]++
    score.serve = team
    return score
  });

  // Rotate
  court.update(court => {
    court[team].push(court[team].shift())
    return court
  })

  // Allow libero sub again
  teamState.update(state => {
    state.doneLibero = [false, false]
    return state
  })


  // Check mandatory libero exit
  let player3 = get(court)[team][3];
  if (player3.libero) {
    liberoOut(team)
  }

  // Check if set won
  const currScore = get(score).points;
  const setWon = (currScore[team] >= 4) && (currScore[team] - currScore[1 - team] >= 2)
  if (setWon) {
    state.set("endSet");
  } else {
    state.set("beforeRally");
  }
}

export function endSet() {
  const currSet = get(score).sets
  const currScore = get(score).points;
  const winTeam = +(currScore[1] > currScore[0])

  score.update(score => {
    score.points = [0, 0]
    score.sets[winTeam]++
    return score
  })

  teamState.update(state => {
    state.timeOuts = [0, 0]
    state.subCount = [0, 0]
    return state
  })

  // Check if match won
  const matchWon = (currSet[winTeam] == 2)
  if (matchWon) {
    goto("/match/results")
  } else {
    state.set("beforeRally")
  }
}
