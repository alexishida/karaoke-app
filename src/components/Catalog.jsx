import { useState } from "react"
import musicas from "../data/musicas.json"
import { useQueueStore } from "../store/queueStore"
import { Search } from "lucide-react"

export default function Catalog() {
  const [search, setSearch] = useState("")
  const addToQueue = useQueueStore((s) => s.addToQueue)

  const filtered = musicas.filter((m) =>
    m.titulo.toLowerCase().includes(search.toLowerCase()) ||
    m.artista.toLowerCase().includes(search.toLowerCase()) ||
    m.id.toString() === search
  )

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Search />
        <input
          className="w-full p-4 rounded-2xl bg-neutral-800 text-lg"
          placeholder="Buscar música ou número"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((m) => (
          <button
            key={m.id}
            onClick={() => addToQueue(m)}
            className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-2xl text-left"
          >
            <p className="text-xl font-bold">#{m.id} {m.titulo}</p>
            <p className="text-sm opacity-80">{m.artista}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
