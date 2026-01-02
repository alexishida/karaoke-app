import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { loadYouTubeAPI } from "../utils/loadYouTubeAPI"

const YouTubePlayer = forwardRef(function YouTubePlayer(
  { videoId, onEnd },
  ref
) {
  const containerRef = useRef(null)
  const playerRef = useRef(null)

  // API exposta para o KaraokePlayer
  useImperativeHandle(ref, () => ({
    stop() {
      if (playerRef.current) {
        playerRef.current.stopVideo()
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }))

  useEffect(() => {
    let destroyed = false

    async function init() {
      const YT = await loadYouTubeAPI()
      if (destroyed) return

      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }

      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          controls: 1,          // ✅ controles padrão
          rel: 0,               // reduz sugestões externas
          modestbranding: 1,    // branding discreto
          playsinline: 1
        },
        events: {
          onReady: (e) => {
            e.target.playVideo()
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.ENDED) {
              onEnd?.()
            }
          }
        }
      })
    }

    if (videoId) {
      init()
    }

    return () => {
      destroyed = true
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [videoId])

  return (
    <div className="w-full h-full bg-black">
      <div
        ref={containerRef}
        className="w-full h-full"
      />
    </div>
  )
})

export default YouTubePlayer
