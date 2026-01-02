import KaraokePlayer from "./components/KaraokePlayer"
import QueuePanel from "./components/QueuePanel"
import Catalog from "./components/Catalog"
import { useUIStore } from "./store/uiStore"

export default function App() {
  const { isFullscreen } = useUIStore()

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="flex h-screen">

        {/* MENU LATERAL */}
        {!isFullscreen && (
          <aside className="w-80 bg-neutral-900 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 neon-text">
              🎤 Karaokê da Festa
            </h2>

            <QueuePanel />

            <div className="mt-6">
              <Catalog />
            </div>
          </aside>
        )}

        {/* ÁREA DO PLAYER (NÃO CENTRALIZA VERTICALMENTE) */}
        <main className="flex-1 overflow-auto p-4">
          <KaraokePlayer />
        </main>

      </div>
    </div>
  )
}
