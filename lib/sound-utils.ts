// Sound utility for playing game sounds

type SoundType = "xMove" | "oMove" | "invalidMove" | "win" | "draw" | "boardSelect"

// Cache audio objects to prevent recreating them on each play
const audioCache: Record<string, HTMLAudioElement> = {}

// Default sound settings
let isMuted = false
let volume = 0.7 // Increased default volume

// Initialize audio files
export const initAudio = () => {
  if (typeof window === "undefined") return // Skip on server

  // Preload sounds
  const sounds = {
    xMove: "/sounds/bubble-pop.mp3",
    oMove: "/sounds/water-drop.mp3",
    invalidMove: "/sounds/water-drop.mp3", // Reuse with lower volume
    win: "/sounds/win.mp3",
    draw: "/sounds/splash.mp3",
    boardSelect: "/sounds/bubble-pop.mp3", // Reuse with lower volume
  }

  // Create and cache audio elements
  Object.entries(sounds).forEach(([key, path]) => {
    const audio = new Audio(path)
    audio.volume = volume
    // Force load the audio file
    audio.load()
    audioCache[key] = audio
  })

  // Play a silent sound to unlock audio on iOS/Safari
  document.addEventListener(
    "click",
    function initAudioOnFirstClick() {
      const silentAudio = new Audio()
      silentAudio.play().catch(() => {})
      document.removeEventListener("click", initAudioOnFirstClick)
    },
    { once: true },
  )
}

// Play a sound effect
export const playSound = (sound: SoundType) => {
  if (typeof window === "undefined" || isMuted) return

  // Initialize audio if not already done
  if (Object.keys(audioCache).length === 0) {
    initAudio()
  }

  const audio = audioCache[sound]
  if (!audio) return

  // Adjust volume for specific sounds
  if (sound === "invalidMove") {
    audio.volume = volume * 0.3
  } else if (sound === "boardSelect") {
    audio.volume = volume * 0.4
  } else if (sound === "win") {
    audio.volume = volume * 0.7
  } else {
    audio.volume = volume
  }

  // Stop and reset the audio before playing
  audio.currentTime = 0

  // Create a clone to allow overlapping sounds
  const audioClone = audio.cloneNode() as HTMLAudioElement
  audioClone.volume = audio.volume

  // Play the sound
  audioClone.play().catch((error) => {
    // Handle autoplay restrictions
    console.log("Audio playback failed:", error)
  })
}

// Toggle mute state
export const toggleMute = (): boolean => {
  isMuted = !isMuted
  return isMuted
}

// Set volume (0.0 to 1.0)
export const setVolume = (newVolume: number) => {
  volume = Math.max(0, Math.min(1, newVolume))

  // Update volume for all cached audio
  Object.values(audioCache).forEach((audio) => {
    audio.volume = volume
  })

  return volume
}

// Get current mute state
export const getMuteState = (): boolean => {
  return isMuted
}

// Get current volume
export const getVolume = (): number => {
  return volume
}
