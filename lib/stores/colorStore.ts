import { create } from "zustand";

const PALETTE = [
  "#365cff",
  "#4e6bff",
  "#8a9ff0",
  "#1f36a9",
  "rgba(54,92,255,0.3)",
  "rgba(54,92,255,0.15)",
  "#4ade80",
  "rgba(255,255,255,0.18)",
  "rgba(255,255,255,0.08)",
  "#d8defa",
];

function randomFromPalette(): string {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)]!;
}

interface ColorStore {
  background: string;
  setRandomColor: () => void;
  setColor: (color: string) => void;
}

export const useColorStore = create<ColorStore>((set) => ({
  background: "#365cff",
  setRandomColor: () => set({ background: randomFromPalette() }),
  setColor: (color: string) => set({ background: color }),
}));
