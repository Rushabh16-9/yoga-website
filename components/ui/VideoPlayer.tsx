"use client";

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface VideoPlayerProps {
    videoUrl: string;
    isPremium: boolean;
    thumbnailUrl?: string;
    className?: string;
    autoPlay?: boolean;
}

export default function VideoPlayer({
    videoUrl,
    isPremium,
    thumbnailUrl,
    className = "",
    autoPlay = false,
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPaywall, setShowPaywall] = useState(!isPremium);
    const [progress, setProgress] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !isPremium) return;

        // Check if HLS is supported
        if (Hls.isSupported() && videoUrl.endsWith('.m3u8')) {
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hls.loadSource(videoUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (autoPlay) {
                    video.play();
                }
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    console.error('HLS Error:', data);
                }
            });

            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            video.src = videoUrl;
            if (autoPlay) {
                video.play();
            }
        } else {
            // Fallback to regular video
            video.src = videoUrl;
            if (autoPlay) {
                video.play();
            }
        }
    }, [videoUrl, isPremium, autoPlay]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            const progress = (video.currentTime / video.duration) * 100;
            setProgress(progress);
            setCurrentTime(video.currentTime);
        };

        const updateDuration = () => {
            setDuration(video.duration);
        };

        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', updateDuration);

        return () => {
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video || !isPremium) {
            setShowPaywall(true);
            return;
        }

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (!document.fullscreenElement) {
            video.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        if (!video || !isPremium) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        video.currentTime = percentage * video.duration;
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster={thumbnailUrl}
                playsInline
                onClick={togglePlay}
            />

            {/* Paywall Overlay */}
            <AnimatePresence>
                {showPaywall && !isPremium && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 flex items-center justify-center backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-center px-6 py-8 max-w-md"
                        >
                            <div className="text-6xl mb-4">🔒</div>
                            <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-3">
                                Premium Content
                            </h3>
                            <p className="text-white/90 mb-6 leading-relaxed">
                                Unlock this class and 100+ more with a premium membership.
                                Start your 14-day free trial today!
                            </p>
                            <Link href="/pricing">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 shadow-xl"
                                >
                                    Start Free Trial →
                                </Button>
                            </Link>
                            <p className="text-white/60 text-sm mt-4">
                                No credit card required
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Controls */}
            {isPremium && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    {/* Progress Bar */}
                    <div
                        className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3 group"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="h-full bg-sage-500 rounded-full relative transition-all group-hover:h-1.5"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-4">
                            {/* Play/Pause Button */}
                            <button
                                onClick={togglePlay}
                                className="hover:scale-110 transition-transform"
                            >
                                {isPlaying ? (
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>

                            {/* Time Display */}
                            <span className="text-sm font-medium">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        {/* Fullscreen Button */}
                        <button
                            onClick={toggleFullscreen}
                            className="hover:scale-110 transition-transform"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
