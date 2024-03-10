import { readable, writable } from "svelte/store";
import { CoreGetMatch } from '@wailsjs'

export const GameStates = {
  lineUps: 0,
  beforeSet: 1,
  beforeRally: 2,
  rally: 3,
  setEnd: 4,
  matchEnd: 5,
};

export const colorPairs = {
  "cherry-white": {
    primary: "#990011",
    secondary: "#FCF6F5"
  },
  "navy": {
    primary: "#002C54",
    secondary: "#C5001A"
  }
}

export const gameState = writable(GameStates.lineUps);
export const score = writable([0, 0])
export const sets = writable([0, 0])
export const serveSide = writable(0)
export const subCount = writable([0, 0])

export const timeOutTime = readable(10)
export const maxSubsAllowed = writable(12)
export const maxTimeOutsAllowed = writable(2)

export const timeOut = writable(false)
export const switchSides = writable(false)

export const teamNames = writable(["", ""])
export const teamColors = readable([colorPairs["navy"], colorPairs["cherry-white"]])


export const rotations = writable([[], []])
export const courtData = writable([[], []])
export const benchData = writable([[], []])

export async function updateMatchState() {
  return
}
