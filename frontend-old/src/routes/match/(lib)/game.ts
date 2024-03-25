import { gameState, GameStates, score, switchSides } from "@/stores";
import { get } from "svelte/store";

export function assignPoint(team: number) {
  score.update(score => {
    score[team]++
    return score
  })

  gameState.set(GameStates.beforeRally);
}

export function startRally() {
  gameState.set(GameStates.rally);
}

export function stopRally() {
  gameState.set(GameStates.beforeRally);
}

export function startSet() {
  gameState.set(GameStates.beforeRally);
}

export function switchServe() {
  switchSides.set(!get(switchSides));
}
