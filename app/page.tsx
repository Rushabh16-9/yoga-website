"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
    const featuredClasses = [
        {
            id: 1,
            title: "Morning Flow",
            instructor: "Sarah Chen",
            duration: "45 min",
            level: "Beginner",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
        },
        {
            id: 2,
            title: "Power Vinyasa",
            instructor: "Michael Rodriguez",
            duration: "60 min",
            level: "Intermediate",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        },
        {
            id: 3,
            title: "Restorative Evening",
            instructor: "Emma Thompson",
            duration: "30 min",
            level: "All Levels",
            image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&q=80",
        },
    ];

    const benefits = [
        {
            icon: "🧘",
            title: "Expert Instructors",
            description: "Learn from certified yoga teachers with years of experience",
        },
        {
            icon: "📊",
            title: "Track Progress",
            description: "Monitor your practice streaks and total meditation minutes",
        },
        {
            icon: "🎯",
            title: "Personalized Plans",
            description: "Get customized yoga routines tailored to your goals",
        },
        {
            icon: "🌍",
            title: "Practice Anywhere",
            description: "Access classes on any device, anytime, anywhere",
        },
    ];

    const testimonials = [
        {
            name: "Jessica Williams",
            role: "Yoga Enthusiast",
            content: "Yofit transformed my practice. The instructors are amazing and the platform is so easy to use!",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
        },
        {
            name: "David Park",
            role: "Beginner Yogi",
            content: "As a complete beginner, I felt welcomed and supported. The progress tracking keeps me motivated!",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
        },
        {
            name: "Maria Garcia",
            role: "Advanced Practitioner",
            content: "The variety of classes and skilled instructors make Yofit my go-to platform for daily practice.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
        },
    ];

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-cream-100 to-terracotta-50 -z-10" />

                {/* Floating Elements */}
                <motion.div
                    className="absolute top-20 right-10 w-72 h-72 bg-sage-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-10 w-72 h-72 bg-terracotta-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
                    animate={{
                        y: [0, 20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 leading-tight">
                            Transform Your Practice,{" "}
                            <span className="gradient-text">Elevate Your Life</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-sage-700 mb-8 max-w-3xl mx-auto">
                            Join thousands of yogis on their journey to wellness. Access world-class
                            instructors, personalized tracking, and a supportive community.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/sign-up">
                                <Button variant="primary" size="xl">
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/classes">
                                <Button variant="outline" size="xl">
                                    Explore Classes
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        {[
                            { value: "10K+", label: "Active Students" },
                            { value: "500+", label: "Classes" },
                            { value: "50+", label: "Expert Instructors" },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-sage-600">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-sage-700 mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Classes */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                            Featured Classes
                        </h2>
                        <p className="text-xl text-sage-700">
                            Start your journey with our most popular sessions
                        </p>
                    </motion.div>

                    <div className="bento-grid">
                        {featuredClasses.map((classItem, index) => (
                            <motion.div
                                key={classItem.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="glow" className="overflow-hidden h-full">
                                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                                        <img
                                            src={classItem.image}
                                            alt={classItem.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-sage-500 text-white px-3 py-1 rounded-full text-sm">
                                            {classItem.level}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-2">{classItem.title}</h3>
                                    <p className="text-sage-600 mb-4">with {classItem.instructor}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sage-700">⏱ {classItem.duration}</span>
                                        <Button variant="primary" size="sm">
                                            Start Class
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/classes">
                            <Button variant="outline" size="lg">
                                View All Classes
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-sage-50 to-cream-100">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                            Why Choose Yofit?
                        </h2>
                        <p className="text-xl text-sage-700">
                            Everything you need for a transformative yoga journey
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="glass" className="text-center h-full">
                                    <div className="text-5xl mb-4">{benefit.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                                    <p className="text-sage-700">{benefit.description}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
                            What Our Students Say
                        </h2>
                        <p className="text-xl text-sage-700">
                            Join our community of happy yogis
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card variant="default" className="h-full">
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover mr-4"
                                        />
                                        <div>
                                            <div className="font-semibold">{testimonial.name}</div>
                                            <div className="text-sm text-sage-600">{testimonial.role}</div>
                                        </div>
                                    </div>
                                    <p className="text-sage-700 italic">"{testimonial.content}"</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-sage-500 to-sage-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
                            Ready to Begin Your Journey?
                        </h2>
                        <p className="text-xl mb-8 opacity-90">
                            Start your 14-day free trial today. No credit card required.
                        </p>
                        <Link href="/sign-up">
                            <Button variant="secondary" size="xl">
                                Get Started Free
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Mobile-First Fixed Bottom CTA - Only visible on mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-white via-white to-transparent backdrop-blur-md border-t border-sage-200">
                <Link href="/onboarding">
                    <Button
                        variant="primary"
                        size="lg"
                        className="w-full shadow-2xl bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700"
                    >
                        Start Practice →
                    </Button>
                </Link>
            </div>
        </div>
    );
}
