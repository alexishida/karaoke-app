import { useQueueStore } from "../store/queueStore"
import { Trash2, SkipForward } from "lucide-react"

export default function QueuePanel() {
  const { queue, nextMusic, removeFromQueue } = useQueueStore()

  if (!queue.length) return null

  return (
    <div className="mt-4 bg-neutral-900 rounded-2xl p-4">
      <h2 className="text-xl mb-3">🎶 Próximas</h2>

      {queue.map((m, i) => (
        <div
          key={m.id}
          className="flex justify-between items-center bg-neutral-800 p-3 rounded-xl mb-2"
        >
          <span>{i === 0 ? "▶️ " : ""}{m.titulo}</span>
          <div className="flex gap-3">
            {i === 0 && <button onClick={nextMusic}><SkipForward /></button>}
            <button onClick={() => removeFromQueue(m.id)}><Trash2 /></button>
          </div>
        </div>
      ))}
    </div>
  )
}
