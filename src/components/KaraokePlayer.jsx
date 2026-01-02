import { useQueueStore } from "../store/queueStore"
import { useUIStore } from "../store/uiStore"
import { useState, useRef, useEffect } from "react"
import YouTubePlayer from "./YouTubePlayer"
import { playSound } from "../hooks/useSound"
import { XCircle, Maximize2 } from "lucide-react"

function extractVideoId(url) {
  if (!url) return null

  const s = String(url)
  const patterns = [
    /v=([^&]+)/, // https://www.youtube.com/watch?v=VIDEO
    /youtu\.be\/([^?&]+)/, // https://youtu.be/VIDEO
    /embed\/([^?&]+)/, // https://www.youtube.com/embed/VIDEO
    /^([A-Za-z0-9_-]{11})$/ // plain video id
  ]

  for (const re of patterns) {
    const match = s.match(re)
    if (match) return match[1]
  }

  return null
}

export default function KaraokePlayer() {
  const { current, nextMusic } = useQueueStore()
  const { isFullscreen, setFullscreen } = useUIStore()

  const [phase, setPhase] = useState(null)
  const [displayScore, setDisplayScore] = useState(0)

  const playerRef = useRef(null)
  const containerRef = useRef(null)

  const videoId =
    current && !phase ? extractVideoId(current.youtubeUrl) : null

  // 🎯 ÚNICO LUGAR QUE CONTROLA FULLSCREEN STATE
  useEffect(() => {
    const onFullscreenChange = () => {
      const active = Boolean(document.fullscreenElement)
      setFullscreen(active)
    }

    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  // ▶️ AUTO FULLSCREEN AO INICIAR MÚSICA
  useEffect(() => {
    if (current && !phase && containerRef.current && !document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {})
    }
  }, [current, phase])

  const exitFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    }
  }

  const finishSong = async () => {
    playerRef.current?.stop()

    const score = Math.floor(Math.random() * 31) + 70

    setPhase("loading")

    setTimeout(() => setPhase("rolling"), 1200)

    setTimeout(() => {
      setDisplayScore(score)
      setPhase("final")

      if (score >= 90) playSound("/sounds/applause.mp3")
      else if (score < 80) playSound("/sounds/boo.mp3")
    }, 3000)

    setTimeout(async () => {
      setPhase(null)
      setDisplayScore(0)
      await exitFullscreen()
      nextMusic()
    }, 6000)
  }

  const cancelCurrent = async () => {
    playerRef.current?.stop()
    setPhase(null)
    await exitFullscreen()
    nextMusic()
  }

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement && containerRef.current) {
      await containerRef.current.requestFullscreen()
    } else {
      await exitFullscreen()
    }
  }

  if (!current) {
    return <div className="text-3xl text-gray-500">🎤 Escolha uma música</div>
  }

  return (
    <div
      ref={containerRef}
      className={`
        bg-black overflow-hidden
        ${isFullscreen
          ? "fixed inset-0 z-[9999] w-screen h-screen"
          : "relative w-full max-w-6xl h-[60vh]"}
      `}
    >
      {/* CONTROLES (SÓ SE NÃO ESTIVER NA TELA DE NOTA) */}
      {!phase && (
        <div className="absolute bottom-4 right-4 z-50 flex gap-3">
          <button
            onClick={cancelCurrent}
            className="px-4 py-2 bg-red-600/80 rounded-xl"
          >
            <XCircle />
          </button>

          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 bg-purple-600/80 rounded-xl"
          >
            <Maximize2 />
          </button>
        </div>
      )}

      {/* PLAYER */}
      {!phase && videoId && (
        <YouTubePlayer
          ref={playerRef}
          videoId={videoId}
          onEnd={finishSong}
        />
      )}

      {/* 🎭 SUSPENSE DA NOTA */}
      {phase && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 text-center">
          {phase === "loading" && (
            <p className="text-4xl animate-pulse">
              🎛️ Calculando performance…
            </p>
          )}

          {phase === "rolling" && (
            <p className="text-8xl font-extrabold animate-pulse neon-text">
              {Math.floor(Math.random() * 31) + 70}
            </p>
          )}

          {phase === "final" && (
            <>
              <p className="text-9xl font-extrabold neon-text animate-bounce">
                {displayScore}
              </p>
              <p className="text-2xl mt-4 text-gray-300">
                Performance da Noite
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
