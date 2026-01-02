import { useEffect, useRef, forwardRef, useImperativeHandle } from "react"

const VideoPlayer = forwardRef(function VideoPlayer({ src, onEnd }, ref) {
  const videoRef = useRef(null)

  useImperativeHandle(ref, () => ({
    stop() {
      const v = videoRef.current
      if (v) {
        v.pause()
        try {
          v.currentTime = 0
        } catch (e) {
          // ignore
        }
      }
    }
  }))

  useEffect(() => {
    const v = videoRef.current
    if (!v) return

    const handleEnded = () => onEnd && onEnd()
    v.addEventListener("ended", handleEnded)

    const start = async () => {
      try {
        await v.play()
      } catch (e) {
        // autoplay may be blocked; user can still press play
      }
    }

    start()

    return () => {
      v.removeEventListener("ended", handleEnded)
    }
  }, [src, onEnd])

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={src}
        controls
        autoPlay
        playsInline
        className="w-full h-full object-contain bg-black"
      />
    </div>
  )
})

export default VideoPlayer
