"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

export default function AboutPage() {
    const instructors = [
        {
            name: "Sarah Chen",
            role: "Lead Vinyasa Instructor",
            bio: "With over 15 years of experience, Sarah brings mindfulness and flow to every practice.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
            specialties: ["Vinyasa", "Meditation", "Pranayama"],
        },
        {
            name: "Michael Rodriguez",
            role: "Power Yoga Specialist",
            bio: "Michael combines athletic training with yoga philosophy for transformative sessions.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
            specialties: ["Power Yoga", "Strength Building", "Alignment"],
        },
        {
            name: "Emma Thompson",
            role: "Restorative & Yin Expert",
            bio: "Emma's gentle approach helps students find deep relaxation and healing.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
            specialties: ["Restorative", "Yin", "Therapeutic Yoga"],
        },
        {
            name: "Raj Patel",
            role: "Ashtanga Master",
            bio: "Trained in Mysore, Raj brings authentic Ashtanga practice to modern students.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
            specialties: ["Ashtanga", "Traditional Yoga", "Philosophy"],
        },
    ];

    const values = [
        {
            icon: "🌱",
            title: "Authentic Practice",
            description: "We honor traditional yoga while making it accessible to modern practitioners.",
        },
        {
            icon: "💚",
            title: "Community First",
            description: "Building a supportive community where everyone feels welcome and valued.",
        },
        {
            icon: "🎯",
            title: "Personal Growth",
            description: "Empowering students to discover their potential on and off the mat.",
        },
        {
            icon: "🌟",
            title: "Excellence",
            description: "Committed to providing the highest quality instruction and experience.",
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold font-display mb-6">
                        About <span className="gradient-text">Yofit</span>
                    </h1>
                    <p className="text-xl text-sage-700 max-w-3xl mx-auto leading-relaxed">
                        We're on a mission to make yoga accessible to everyone, everywhere. Founded in 2020,
                        Yofit has grown into a global community of over 10,000 practitioners united by a
                        shared passion for wellness and transformation.
                    </p>
                </motion.div>

                {/* Story Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <Card variant="glass" className="p-8 md:p-12">
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <div className="space-y-4 text-sage-700 leading-relaxed">
                            <p>
                                Yofit was born from a simple belief: yoga should be accessible to everyone,
                                regardless of location, schedule, or experience level. Our founders, experienced
                                yoga practitioners themselves, saw how traditional studio models limited access
                                for many people who could benefit from yoga's transformative power.
                            </p>
                            <p>
                                Today, we've built a platform that combines the best of traditional yoga wisdom
                                with modern technology. Our world-class instructors bring decades of combined
                                experience, offering everything from gentle restorative sessions to challenging
                                power flows.
                            </p>
                            <p>
                                But we're more than just a platform—we're a community. Every day, thousands of
                                students from around the world roll out their mats, connect with their breath,
                                and discover what's possible when they commit to their practice.
                            </p>
                        </div>
                    </Card>
                </motion.div>

                {/* Values */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="default" className="text-center h-full">
                                    <div className="text-5xl mb-4">{value.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                    <p className="text-sage-700">{value.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Instructors */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    id="instructors"
                >
                    <h2 className="text-4xl font-bold text-center mb-12">Meet Our Instructors</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {instructors.map((instructor, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="glow" className="overflow-hidden">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <img
                                            src={instructor.image}
                                            alt={instructor.name}
                                            className="w-full md:w-32 h-48 md:h-32 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-semibold mb-1">{instructor.name}</h3>
                                            <p className="text-terracotta-600 font-medium mb-3">{instructor.role}</p>
                                            <p className="text-sage-700 mb-4">{instructor.bio}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {instructor.specialties.map((specialty, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm"
                                                    >
                                                        {specialty}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
