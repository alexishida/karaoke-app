import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useQueueStore = create(
  persist(
    (set) => ({
      queue: [],
      current: null,

      addToQueue: (music) =>
        set((state) => ({
          queue: [...state.queue, music],
          current: state.current ?? music
        })),

      nextMusic: () =>
        set((state) => {
          const [, ...rest] = state.queue
          return { queue: rest, current: rest[0] ?? null }
        }),

      removeFromQueue: (id) =>
        set((state) => ({
          queue: state.queue.filter((m) => m.id !== id)
        }))
    }),
    { name: "karaoke-queue" }
  )
)
