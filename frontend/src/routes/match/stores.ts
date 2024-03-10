import { writable } from "svelte/store";

export interface Player {
  number: number,
  name: string,
  libero?: boolean,
  captain?: boolean,
  sub?: number // index in bench array of sub
  doneSub?: boolean // Player already subbed in and out
}

export const score = writable({
  serve: 0,
  points: [0, 0],
  sets: [0, 0]
})

export const teamState = writable({
  timeOuts: [0, 0],
  subCount: [0, 0],
  liberoIn: [true, true],
  doneLibero: [false, false]
})

export const teamNames = writable(Array(2))
export const court: Writable<Player[][]> = writable([[], []])
export const bench: Writable<Player[][]> = writable([[], []])

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

// ----------------------------------------
