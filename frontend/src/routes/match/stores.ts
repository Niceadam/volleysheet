import { writable } from "svelte/store";

export interface Player {
  number: number,
  name: string,
  libero?: boolean,
  captain?: boolean,
  starter?: boolean // is in starting line up of set
  sub?: number // index in bench array of sub
  doneSub?: boolean // Player already subbed in and out
}

// ex. getColor("btn", 0, "light") => btn-primary-light
export const colors = ["primary", "secondary"]
export function getColor(team: number) {
  return (team == 0) ? "primary" : "secondary"
};

export const score = {
  serve: writable(0),
  points: writable([0, 0]),
  sets: writable([0, 0]),
}

export const teamState = {
  side: writable(false),
  timeOuts: writable([0, 0]),
  subCount: writable([0, 0]),
  liberoIn: writable([false, false]),
  doneLibero: writable([false, false]),
}

export const teamNames = writable(Array(2))
export const bench: Writable<Player[][]> = writable([[], []])
export const court: Writable<Player[][]> = writable([
  Array(6).fill(null),
  Array(6).fill(null),
])

export const timeOut = writable(false)

// ----------------------------------------
export type State =
  "rally"
  | "beforeRally"
  | "timeOut"
  | "lineUps"
  | "endSet"

export const state: Writable<State> = writable("lineUps")

// ----------------------------------------

export type Modal = {
  type:
  "none"
  | "injury"
  | "sanction"
  | "substitution"
  | "libero"
  | "liberoExit",
  data: object
}

export const modal: Writable<Modal> = writable({ type: "none" })
export const lineupSelect = [writable(null), writable(null)]

// ----------------------------------------

type History = {
  action: string
  data: object
  score: number[]
}

export const history: Writable<History> = writable([])
