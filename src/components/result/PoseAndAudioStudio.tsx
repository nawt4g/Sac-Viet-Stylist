"use client";
/**
 * components/result/PoseAndAudioStudio.tsx
 * ==========================================
 * Studio Dáng Pose (2 pose cards SVG vector) + Audio mini-player Neo-Ca Trù.
 * Audio: dùng Web Audio API tạo mock tone (không cần file thật).
 * Phase 5: thay AudioContext bằng URL file thật từ CDN/S3.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music2 } from "lucide-react";

/* ── Pose SVG illustrations ── */
function PoseSvg({ variant }: { variant: "formal" | "street" }) {
  if (variant === "formal") {
    return (
      <svg viewBox="0 0 120 200" className="h-full w-full" aria-hidden="true">
        {/* Body */}
        <ellipse cx="60" cy="30" rx="18" ry="20" fill="#FAF8F5" stroke="#1E3A5F" strokeWidth="2"/>
        {/* Neck */}
        <rect x="55" y="48" width="10" height="12" fill="#FAF8F5" stroke="#1E3A5F" strokeWidth="1.5"/>
        {/* Áo Ngũ Thân body */}
        <path d="M30 60 L40 160 L80 160 L90 60 Q75 55 60 58 Q45 55 30 60Z"
          fill="#1E3A5F" stroke="#0F2A45" strokeWidth="1.5"/>
        {/* Collar detail — 5 vạt */}
        <path d="M50 60 L60 80 L70 60" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
        <line x1="40" y1="65" x2="80" y2="65" stroke="#D4AF37" strokeWidth="1" opacity="0.5"/>
        {/* Sleeves (narrow — tay chẽn) */}
        <path d="M30 60 L15 110 L25 115 L38 75" fill="#1E3A5F" stroke="#0F2A45" strokeWidth="1.5"/>
        <path d="M90 60 L105 110 L95 115 L82 75" fill="#1E3A5F" stroke="#0F2A45" strokeWidth="1.5"/>
        {/* Quần âu */}
        <path d="M40 160 L38 200 L55 200 L60 175 L65 200 L82 200 L80 160Z"
          fill="#1A1A1A" stroke="#0A0A0A" strokeWidth="1.5"/>
        {/* Shoes */}
        <ellipse cx="46" cy="200" rx="10" ry="4" fill="#1A1A1A"/>
        <ellipse cx="74" cy="200" rx="10" ry="4" fill="#1A1A1A"/>
        {/* Gold button detail */}
        <circle cx="60" cy="70" r="2" fill="#D4AF37"/>
        <circle cx="60" cy="85" r="2" fill="#D4AF37"/>
        <circle cx="60" cy="100" r="2" fill="#D4AF37"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 200" className="h-full w-full" aria-hidden="true">
      {/* Head */}
      <ellipse cx="60" cy="28" rx="18" ry="20" fill="#FAF8F5" stroke="#1E3A5F" strokeWidth="2"/>
      {/* Neck */}
      <rect x="55" y="46" width="10" height="12" fill="#FAF8F5" stroke="#1E3A5F" strokeWidth="1.5"/>
      {/* Áo Tấc — shorter, casual lean */}
      <path d="M32 58 L42 130 L78 130 L88 58 Q73 53 60 56 Q47 53 32 58Z"
        fill="#4A7856" stroke="#3A6046" strokeWidth="1.5"/>
      {/* Collar */}
      <path d="M50 58 L60 75 L70 58" fill="none" stroke="#D4AF37" strokeWidth="1.5"/>
      {/* Sleeves — slightly wider, relaxed */}
      <path d="M32 58 L12 105 L24 110 L40 72" fill="#4A7856" stroke="#3A6046" strokeWidth="1.5"/>
      <path d="M88 58 L108 105 L96 110 L80 72" fill="#4A7856" stroke="#3A6046" strokeWidth="1.5"/>
      {/* Casual stance — slight angle */}
      <path d="M42 130 L38 200 L56 200 L60 168 L64 200 L82 200 L78 130Z"
        fill="#FAF8F5" stroke="#C0B8A8" strokeWidth="1.5"/>
      {/* Sandal */}
      <path d="M36 200 L56 200 L54 196 L38 196Z" fill="#7B5E3A"/>
      <path d="M64 200 L84 200 L82 196 L66 196Z" fill="#7B5E3A"/>
      {/* Bag strap hint */}
      <path d="M24 110 Q15 140 20 160" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3,2"/>
      {/* Kính râm on head */}
      <path d="M44 18 Q52 14 60 15 Q68 14 76 18" fill="none" stroke="#1A1A1A" strokeWidth="2.5"/>
    </svg>
  );
}

/* ── Audio mini-player with Web Audio mock ── */
function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const MOCK_DURATION = 30; // seconds mock

  const stopAudio = useCallback(() => {
    oscillatorRef.current?.stop();
    oscillatorRef.current?.disconnect();
    oscillatorRef.current = null;
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPlaying(false);
  }, []);

  const startAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;

    // Neo-Ca Trù mock: drone tone at 220Hz (A3) with tremolo
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const tremolo = ctx.createOscillator();
    const tremoloGain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 220; // A3 — pentatonic root
    tremolo.type = "sine";
    tremolo.frequency.value = 5.5; // vibrato ~85 BPM feel
    tremoloGain.gain.value = 0.15;

    tremolo.connect(tremoloGain);
    tremoloGain.connect(gain.gain);
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = muted ? 0 : 0.12;

    osc.start();
    tremolo.start();
    oscillatorRef.current = osc;
    setPlaying(true);

    // Progress tick
    let elapsed = (progress / 100) * MOCK_DURATION;
    intervalRef.current = setInterval(() => {
      elapsed += 0.1;
      if (elapsed >= MOCK_DURATION) {
        stopAudio();
        setProgress(0);
      } else {
        setProgress((elapsed / MOCK_DURATION) * 100);
      }
    }, 100);
  }, [muted, progress, stopAudio]);

  useEffect(() => () => stopAudio(), [stopAudio]);

  const handlePlayPause = () => {
    if (playing) stopAudio();
    else startAudio();
  };

  const handleMute = () => {
    setMuted((m) => !m);
    if (audioCtxRef.current) {
      // Toggle gain
    }
  };

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#1E3A5F] to-[#0F2A45] p-5 shadow-xl"
      aria-label="Mini player — Neo-Ca Trù Chill Beat"
      role="region"
    >
      {/* Track info */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/20">
          <Music2 className="h-5 w-5 text-[#D4AF37]" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-bold text-white">Neo-Ca Trù Chill Beat</p>
          <p className="text-xs text-white/50">85 BPM · Sắc Việt Original Demo</p>
        </div>
        {/* Phase 5 API hook note */}
        <span className="ml-auto rounded-full bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] text-[#D4AF37]">
          DEMO
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-1 w-full cursor-pointer overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Tiến độ phát: ${Math.round(progress)}%`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E8CC6E] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button
          id="audio-play-pause"
          type="button"
          onClick={handlePlayPause}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-[#1E3A5F] shadow-md transition-all hover:bg-[#E8CC6E] hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          aria-label={playing ? "Tạm dừng" : "Phát"}
        >
          {playing ? (
            <Pause className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <div className="flex-1">
          <p className="text-[10px] text-white/40">
            {playing ? "🎵 Đang phát…" : "Nhấn phát để nghe demo"}
          </p>
        </div>

        {/* Mute */}
        <button
          type="button"
          onClick={handleMute}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-[#D4AF37]"
          aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>

      <p className="text-center text-[10px] text-white/30">
        {/* API hook label */}
        Phase 5: Thay bằng URL audio từ CDN sau khi tích hợp Neo-Ca Trù library
      </p>
    </div>
  );
}

/* ── Main Component ── */
export function PoseAndAudioStudio() {
  const POSES = [
    {
      id: "pose-formal",
      variant: "formal" as const,
      label: "Trang Nghiêm",
      desc: "Đứng thẳng, hai tay thả tự nhiên dọc thân. Phù hợp tại Văn Miếu, lễ hội, chụp ảnh kỷ yếu.",
      context: "Văn Miếu · Lễ hội · Kỷ yếu",
      accent: "#1E3A5F",
    },
    {
      id: "pose-street",
      variant: "street" as const,
      label: "Dạo Phố",
      desc: "Dáng đứng thoải mái, hơi nghiêng, tay có thể cầm túi tote. Phù hợp chụp ảnh đường phố.",
      context: "Đường phố · Cafe · Chụp ảnh NT",
      accent: "#4A7856",
    },
  ];

  return (
    <section aria-labelledby="pose-studio-heading">
      <div className="mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
        <h3 id="pose-studio-heading" className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
          ✦ Studio Dáng Pose &amp; Âm Nhạc
        </h3>
        <div className="h-px flex-1 bg-[#E5DECE]" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Pose cards */}
        {POSES.map((pose) => (
          <div
            key={pose.id}
            id={pose.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5DECE] bg-white transition-shadow duration-300 hover:shadow-xl"
          >
            {/* SVG illustration */}
            <div
              className="relative flex h-52 items-end justify-center overflow-hidden"
              style={{ background: `linear-gradient(180deg, ${pose.accent}10 0%, ${pose.accent}05 100%)` }}
              aria-hidden="true"
            >
              <div className="h-44 w-28">
                <PoseSvg variant={pose.variant} />
              </div>
              {/* Floor shadow */}
              <div
                className="absolute bottom-0 h-4 w-28 rounded-full blur-md opacity-20"
                style={{ backgroundColor: pose.accent }}
              />
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col gap-2 p-4">
              <span
                className="inline-self-start rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
                style={{ backgroundColor: pose.accent }}
              >
                {pose.label}
              </span>
              <p className="text-xs leading-relaxed text-[#4A6A8F]">{pose.desc}</p>
              <p className="mt-auto text-[10px] text-[#C0B8A8]">{pose.context}</p>
            </div>
          </div>
        ))}

        {/* Audio player column */}
        <div className="flex flex-col justify-center gap-3">
          <AudioPlayer />
          <p className="text-center text-[11px] leading-relaxed text-[#6B7280]">
            Ca Trù — loại hình âm nhạc truyền thống Bắc Bộ được{" "}
            <strong>UNESCO vinh danh Di sản Văn hóa Phi vật thể</strong> năm 2009.
          </p>
        </div>
      </div>
    </section>
  );
}
