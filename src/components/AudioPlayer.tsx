import { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css"; // We'll create this file

interface AudioPlayerProps {}

export const AudioPlayer = ({}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(0.3); // Default volume 30%
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Create audio element on component mount
  useEffect(() => {
    const audioUrl = "/song.mp3";
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Start playing immediately
    audio.play().catch((e) => console.error("Audio playback failed:", e));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="audio-controls">
      <button
        onClick={toggleMute}
        className="mute-button"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
        aria-label="Volume"
      />
    </div>
  );
};
