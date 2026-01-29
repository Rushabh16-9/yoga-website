"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Clock, Users, ArrowRight, Play, Heart, Sun, Moon } from "lucide-react";

export default function HomePage() {
    const quickPractices = [
        {
            title: "Morning Energizer",
            duration: "10 min",
            level: "All Levels",
            color: "bg-orange-100 text-orange-700",
            icon: <Sun size={20} />,
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"
        },
        {
            title: "Stress Relief",
            duration: "15 min",
            level: "Beginner",
            color: "bg-blue-100 text-blue-700",
            icon: <Moon size={20} />,
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80"
        },
        {
            title: "Core Power",
            duration: "20 min",
            level: "Intermediate",
            color: "bg-red-100 text-red-700",
            icon: <Play size={20} />,
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
        }
    ];

    const popularPoses = [
        { name: "Downward Dog", sanskrit: "Adho Mukha Svanasana", id: "15", image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483081/yoga-api/15_vkviqn.png" },
        { name: "Warrior II", sanskrit: "Virabhadrasana II", id: "45", image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483096/yoga-api/45_ehimr1.png" },
        { name: "Tree Pose", sanskrit: "Vrksasana", id: "41", image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483094/yoga-api/41_veknug.png" },
        { name: "Crow Pose", sanskrit: "Bakasana", id: "13", image: "https://res.cloudinary.com/dko1be2jy/image/upload/fl_sanitize/v1676483083/yoga-api/13_hdjxuz.png" },
    ];

    const featuredClasses = [
        {
            id: 1,
            title: "Vinyasa Flow for Strength",
            instructor: "Sarah Chen",
            duration: "45 min",
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1599447421405-0c1746341d1a?w=800&q=80",
            tags: ["Strength", "Mobility"]
        },
        {
            id: 2,
            title: "Deep Stretch & Relax",
            instructor: "Emma Thompson",
            duration: "60 min",
            level: "All Levels",
            image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
            tags: ["Flexibility", "Mindfulness"]
        },
        {
            id: 3,
            title: "Morning Sun Salutations",
            instructor: "Michael Rodriguez",
            duration: "30 min",
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80",
            tags: ["Energy", "Flow"]
        },
    ];

    return (
        <div className="overflow-hidden bg-sage-50/30">
            {/* Hero Section Upgrade */}
            <section className="relative min-h-[90vh] flex items-center pt-20 px-4">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sage-200/20 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
                    <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-terracotta-200/20 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
                </div>

                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-2 bg-sage-100 text-sage-800 rounded-full text-sm font-semibold mb-6">
                            ✨ New: 14-Day Wellness Challenge
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-display text-sage-900 mb-6 leading-[1.1]">
                            Find Your <span className="text-terracotta-600">Flow</span>,<br />
                            at Your Own Pace.
                        </h1>
                        <p className="text-xl text-sage-600 mb-8 leading-relaxed max-w-lg">
                            Can't touch your toes? Mind racing? We've got you.
                            Explore personalized yoga practices for every body, mood, and goal.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/sign-up">
                                <Button variant="primary" size="xl" className="shadow-lg shadow-sage-200">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/poses">
                                <Button variant="outline" size="xl">
                                    Explore Poses
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-sage-600 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Users size={20} />
                                10k+ Yogis
                            </div>
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-sage-100">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80"
                                alt="Yoga Hero"
                                className="w-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-xl shadow-xl max-w-xs card-glow">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                                    🔥
                                </div>
                                <div>
                                    <div className="font-bold text-sage-900">Daily Streak</div>
                                    <div className="text-sm text-sage-500">Keep it up!</div>
                                </div>
                            </div>
                            <div className="w-full bg-sage-100 h-2 rounded-full overflow-hidden">
                                <div className="bg-orange-500 h-full w-3/4 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Practices Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-display text-sage-900 mb-2">
                                Short on Time?
                            </h2>
                            <p className="text-sage-600 text-lg">Quick practices to fit your busy schedule</p>
                        </div>
                        <Link href="/classes" className="text-sage-700 hover:text-sage-900 font-medium flex items-center gap-1 group">
                            View all <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {quickPractices.map((practice, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="glass" className="group cursor-pointer hover:bg-white/80 transition-all">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`p-3 rounded-xl ${practice.color}`}>
                                            {practice.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-sage-900 mb-1">{practice.title}</h3>
                                            <div className="text-sm text-sage-600">{practice.level}</div>
                                        </div>
                                    </div>
                                    <div className="h-32 rounded-lg overflow-hidden mb-4 relative">
                                        <img
                                            src={practice.image}
                                            alt={practice.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                                <Play size={20} className="ml-1 text-sage-900" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm font-medium text-sage-500">
                                        <Clock size={16} className="mr-1.5" />
                                        {practice.duration}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Poses - Connected to API */}
            <section className="py-20 px-4 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-cream-100 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-sage-900 mb-4">
                            Master the Basics
                        </h2>
                        <p className="text-sage-600 text-lg max-w-2xl mx-auto">
                            Explore our comprehensive library of 48+ poses with detailed instructions and benefits.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {popularPoses.map((pose, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/poses/${pose.id}`}>
                                    <Card hover className="h-full text-center group border border-transparent hover:border-sage-200">
                                        <div className="h-32 mb-4 p-4 flex items-center justify-center bg-sage-50 rounded-xl group-hover:bg-white transition-colors">
                                            <img
                                                src={pose.image}
                                                alt={pose.name}
                                                className="h-full w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                                            />
                                        </div>
                                        <h3 className="font-bold text-sage-900 mb-1">{pose.name}</h3>
                                        <p className="text-xs text-sage-500 font-medium italic">{pose.sanskrit}</p>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/poses">
                            <Button variant="outline" size="lg" className="border-2">
                                Browse All Poses
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Classes */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-sage-900 mb-2">
                            Featured Classes
                        </h2>
                        <p className="text-sage-600 text-lg">Curated sessions for every goal</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredClasses.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/classes`}>
                                    <div className="group rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-sage-800">
                                                {item.level}
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                                                <div className="text-white font-medium">Start Class</div>
                                                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                                                    <Play size={20} fill="white" className="text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex gap-2 mb-3">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="text-xs font-semibold bg-sage-50 text-sage-600 px-2 py-1 rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <h3 className="text-xl font-bold text-sage-900 mb-2 leading-tight group-hover:text-sage-700 transition-colors">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center justify-between text-sm text-sage-500 mt-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-sage-200 overflow-hidden">
                                                        <img src={`https://i.pravatar.cc/100?u=${item.instructor}`} alt={item.instructor} />
                                                    </div>
                                                    {item.instructor}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {item.duration}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Wellness & Lifestyle Section */}
            <section className="py-20 px-4 bg-terracotta-50/50">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-sage-900 mb-6">
                            More Than Just Movement
                        </h2>
                        <div className="space-y-6">
                            <Card className="flex gap-4 p-5 hover:bg-white/80 transition-colors cursor-pointer">
                                <div className="p-3 bg-sage-100 rounded-xl h-fit">
                                    <Sun size={24} className="text-sage-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-sage-900 mb-1">Morning Mindfulness</h3>
                                    <p className="text-sage-600 text-sm">Start your day with guided meditations and intention setting.</p>
                                </div>
                            </Card>
                            <Card className="flex gap-4 p-5 hover:bg-white/80 transition-colors cursor-pointer">
                                <div className="p-3 bg-terracotta-100 rounded-xl h-fit">
                                    <Heart size={24} className="text-terracotta-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-sage-900 mb-1">Holistic Wellness</h3>
                                    <p className="text-sage-600 text-sm">Nutrition tips, sleep guides, and stress management tools.</p>
                                </div>
                            </Card>
                        </div>
                        <div className="mt-8">
                            <Link href="/blog">
                                <Button variant="primary" size="lg">Read Our Blog</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80"
                                alt="Wellness"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cream-100 rounded-full -z-10" />
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-sage-100 rounded-full -z-10" />
                    </div>
                </div>
            </section>
        </div>
    );
}
