export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        neonPink: "0 0 10px #ec4899, 0 0 30px #ec4899"
      },
      keyframes: {
        pulseNeon: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.7 }
        },
        glow: {
          "0%,100%": { boxShadow: "0 0 10px #ec4899" },
          "50%": { boxShadow: "0 0 30px #ec4899" }
        }
      },
      animation: {
        pulseNeon: "pulseNeon 1.5s infinite",
        glow: "glow 2s infinite"
      }
    }
  },
  plugins: []
}
