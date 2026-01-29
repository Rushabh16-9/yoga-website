"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import Link from "next/link";

interface Pose {
    id: number;
    english_name: string;
    sanskrit_name_adapted: string;
    sanskrit_name: string;
    translation_name: string;
    pose_description: string;
    pose_benefits: string;
    url_svg: string;
    url_png: string;
}

export default function PoseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [pose, setPose] = useState<Pose | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPose();
    }, [params.id]);

    const fetchPose = async () => {
        try {
            const response = await fetch(`/api/poses/${params.id}`);

            if (!response.ok) {
                throw new Error('Pose not found');
            }

            const data = await response.json();
            setPose(data.pose);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-sage-200 border-t-sage-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sage-600">Loading pose...</p>
                </div>
            </div>
        );
    }

    if (error || !pose) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <Card className="p-8 text-center max-w-md">
                    <h2 className="text-2xl font-bold text-sage-900 mb-4">Pose Not Found</h2>
                    <p className="text-sage-600 mb-6">{error || 'This pose could not be found.'}</p>
                    <Link href="/poses">
                        <Button variant="primary">Browse All Poses</Button>
                    </Link>
                </Card>
            </div>
        );
    }

    const benefits = pose.pose_benefits.split('.').filter(b => b.trim().length > 0);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-sage-50/30">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Link href="/poses">
                    <Button variant="ghost" size="sm" className="mb-6">
                        <ArrowLeft size={16} className="mr-2" />
                        Back to Poses
                    </Button>
                </Link>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Card className="p-8 sticky top-24">
                            <div className="relative h-96 bg-gradient-to-br from-sage-100 to-cream-100 rounded-lg flex items-center justify-center mb-6">
                                <img
                                    src={pose.url_png}
                                    alt={pose.english_name}
                                    className="w-full h-full object-contain p-8"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Heart size={16} className="mr-2" />
                                    Save
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Share2 size={16} className="mr-2" />
                                    Share
                                </Button>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Right Column - Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl font-bold font-display text-sage-900 mb-2">
                                {pose.english_name}
                            </h1>
                            <p className="text-2xl text-sage-600 italic mb-2">
                                {pose.sanskrit_name_adapted}
                            </p>
                            <p className="text-sm text-sage-500">
                                Sanskrit: {pose.sanskrit_name}
                            </p>
                            <p className="text-sm text-sage-500 mt-1">
                                Translation: {pose.translation_name}
                            </p>
                        </div>

                        {/* Description */}
                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-sage-900 mb-4">
                                How to Practice
                            </h2>
                            <p className="text-sage-700 leading-relaxed">
                                {pose.pose_description}
                            </p>
                        </Card>

                        {/* Benefits */}
                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-sage-900 mb-4">
                                Benefits
                            </h2>
                            <ul className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-sage-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sage-700">{benefit.trim()}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Tips Card */}
                        <Card className="p-6 bg-gradient-to-br from-terracotta-50 to-cream-50 border-terracotta-200">
                            <h3 className="text-lg font-bold text-terracotta-900 mb-3">
                                💡 Practice Tips
                            </h3>
                            <ul className="space-y-2 text-sm text-terracotta-800">
                                <li>• Always warm up before attempting this pose</li>
                                <li>• Listen to your body and don't force the stretch</li>
                                <li>• Use props like blocks or straps if needed</li>
                                <li>• Breathe deeply and hold for 5-10 breaths</li>
                                <li>• Consult a teacher if you're unsure about alignment</li>
                            </ul>
                        </Card>

                        {/* CTA */}
                        <Card className="p-6 bg-gradient-to-br from-sage-900 to-sage-800 text-white">
                            <h3 className="text-xl font-bold mb-2">
                                Ready to Practice?
                            </h3>
                            <p className="text-sage-200 mb-4">
                                Join our classes to learn this pose with expert guidance
                            </p>
                            <Link href="/classes">
                                <Button variant="primary" size="lg" className="w-full bg-white text-sage-900 hover:bg-cream-100">
                                    Browse Classes
                                </Button>
                            </Link>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
