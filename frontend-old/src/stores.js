import { readable, writable } from "svelte/store";

export const GameStates = {
  lineUps: 0,
  beforeSet: 1,
  beforeRally: 2,
  rally: 3,
  setEnd: 4,
  matchEnd: 5,
};

export const gameState = writable(GameStates.lineUps);
export const timeOut = writable(false)
export const serveSide = writable(0)

export const score = writable([0, 0])
export const sets = writable([0, 0])
export const subCount = writable([0, 0])
export const switchSides = writable(false)

export const TIMEOUT_TIME = 10
export const MAX_SUBS = writable(12)
export const MAX_TIME_OUTS = writable(2)

export const teamColors = readable([
  {
    name: "cherry-white",
    primary: "#990011",
    secondary: "#FCF6F5"
  },
  {
    name: "navy",
    primary: "#002C54",
    secondary: "#C5001A"
  }])

export const teamNames = writable([])

export const rotations = writable([[], []])
export const courtData = writable([[], []])
export const benchData = writable([[], []])
