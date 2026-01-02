import { create } from "zustand"

export const useUIStore = create((set) => ({
  isFullscreen: false,
  setFullscreen: (value) => set({ isFullscreen: value })
}))
