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
  teamState.timeOuts.update((val) => {
    val[team]++
    return val
  })
}

export function getCourtSubOptions(team: number, liberoSub: boolean) {
  const courtt = get(court)[team]

  if (liberoSub) {
    // Allow libero sub only in backrow
    let options = courtt.slice(4, 6);
    if (get(score.serve) != team) {
      // Libero cannot serve
      options.push(courtt[0]);
    }
    return options
  } else {
    return courtt.filter(
      (player: Player) => !player.libero && !player.doneSub,
    );
  }
}

export function getBenchSubOptions(select: Player, team: number, liberoSub: boolean) {
  const bencht = get(bench)[team]

  if (liberoSub) {
    // All liberos on bench
    return bencht.filter((player: Player) => player.libero);
  }

  if (select.sub !== undefined) {
    // Player is already substituted, one option to sub back
    return [bencht[select.sub]];
  } else {
    // First sub: Can sub out for anyone, except libero and starters
    return bencht.filter((player: Player) =>
      !player.libero && !player.starter
    );
  }
}

export function liberoOut(team: number) {
  let libero = get(court)[team].find((player: Player) => player.libero)
  let playerIn = get(bench)[team][libero.sub]

  callSubs(team, libero, playerIn)

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

  // Substitute
  bench.update((bench) => {
    delete courtPlayer.sub
    bench[team][benchIdx] = courtPlayer
    return bench
  })
  court.update((court) => {
    court[team][courtIdx] = benchPlayer
    return court
  })

  // Update sub + libero counts
  if (liberoSub) {
    teamState.liberoIn.update((val) => {
      val[team] = (benchPlayer.libero === true)
      return val
    })
    teamState.doneLibero.update((val) => {
      val[team] = true
      return val
    })
  } else {
    teamState.subCount.update((val) => {
      val[team]++
      return val
    })
  }
}

export function scorePoint(team: number) {
  score.serve.set(team)
  score.points.update(val => {
    val[team]++
    return val
  });


  // Rotate
  court.update(court => {
    court[team].push(court[team].shift())
    return court
  })

  // Allow libero sub again
  teamState.doneLibero.set([false, false])

  // Check mandatory libero exit
  let player3 = get(court)[team][3];
  if (player3.libero) {
    liberoOut(team)
  }

  // Check if set won
  const currScore = get(score.points);
  const setWon = (currScore[team] >= 4) && (currScore[team] - currScore[1 - team] >= 2)
  if (setWon) {
    state.set("endSet");
  } else {
    state.set("beforeRally");
  }
}

export function confirmLineUp() {
  court.update(court => {
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 6; j++) {
        if (court[i][j] === null)
          // Court is not full yet
          return court
      }
    }

    bench.update(bench => {
      for (let i = 0; i < 2; i++) {
        // Remove chosen players from bench
        court[i].forEach((val) => {
          const idx = bench[i].indexOf(val)
          bench[i].splice(idx, 1)
        })

        // Mark original linup
        for (let j = 0; j < 6; j++) {
          court[i][j].starter = true
        }
      }
      return bench
    })

    state.set("beforeRally")
    return court
  })
}


export function endSet() {
  const currScore = get(score.points);
  const winTeam = +(currScore[1] > currScore[0])

  teamState.timeOuts.set([0, 0])
  teamState.subCount.set([0, 0])

  score.points.set([0, 0])
  score.sets.update(val => {
    val[winTeam]++

    // Check if match won
    if (val[winTeam] == 2) {
      goto("/match/results")
    } else {
      state.set("beforeRally")
    }

    return val
  })
}
