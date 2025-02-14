import { writable } from "svelte/store";


export const favorites = writable(localStorage.getItem("fetch-favorites"));
favorites.subscribe((d) => localStorage.setItem("fetch-favorites", d));