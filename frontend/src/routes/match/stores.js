import { writable } from "svelte/store";

export const score = writable([0, 0])
export const sets = writable([0, 0])

export const timeOut = writable(false)
