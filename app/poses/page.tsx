"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

export default function PosesPage() {
    const [poses, setPoses] = useState<Pose[]>([]);
    const [filteredPoses, setFilteredPoses] = useState<Pose[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        fetchPoses();
    }, []);

    useEffect(() => {
        filterPoses();
    }, [searchTerm, selectedCategory, poses]);

    const fetchPoses = async () => {
        try {
            const response = await fetch('/api/poses');
            if (response.ok) {
                const data = await response.json();
                setPoses(data.poses);
                setFilteredPoses(data.poses);
            }
        } catch (error) {
            console.error('Failed to fetch poses:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterPoses = () => {
        let filtered = poses;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(pose =>
                pose.english_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pose.sanskrit_name_adapted.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPoses(filtered);
    };

    const categories = [
        { id: "all", name: "All Poses" },
        { id: "standing", name: "Standing" },
        { id: "seated", name: "Seated" },
        { id: "backbend", name: "Backbends" },
        { id: "balance", name: "Balance" },
        { id: "inversion", name: "Inversions" },
    ];

    if (loading) {
        return (
            <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-sage-200 border-t-sage-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sage-600">Loading poses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-sage-50/30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold font-display text-sage-900 mb-4">
                        Yoga Pose Library
                    </h1>
                    <p className="text-xl text-sage-600 max-w-2xl mx-auto">
                        Explore our complete collection of {poses.length} yoga poses with detailed instructions, benefits, and Sanskrit names
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    <Card className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search poses by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-sage-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                                {categories.map((category) => (
                                    <Button
                                        key={category.id}
                                        variant={selectedCategory === category.id ? "primary" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(category.id)}
                                        className="whitespace-nowrap"
                                    >
                                        {category.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Results count */}
                        <div className="mt-4 text-sm text-sage-600">
                            Showing {filteredPoses.length} of {poses.length} poses
                        </div>
                    </Card>
                </motion.div>

                {/* Poses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredPoses.map((pose, index) => (
                        <motion.div
                            key={pose.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link href={`/poses/${pose.id}`}>
                                <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                                    {/* Pose Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-sage-100 to-cream-100 flex items-center justify-center overflow-hidden">
                                        <img
                                            src={pose.url_png}
                                            alt={pose.english_name}
                                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Pose Info */}
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold text-sage-900 mb-1 group-hover:text-sage-700 transition-colors">
                                            {pose.english_name}
                                        </h3>
                                        <p className="text-sm text-sage-600 italic mb-3">
                                            {pose.sanskrit_name_adapted}
                                        </p>
                                        <p className="text-sm text-sage-700 line-clamp-2">
                                            {pose.pose_benefits.split('.')[0]}.
                                        </p>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-sage-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                        <span className="text-white font-semibold">View Details →</span>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* No results */}
                {filteredPoses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16"
                    >
                        <p className="text-xl text-sage-600 mb-4">No poses found matching your search</p>
                        <Button variant="outline" onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("all");
                        }}>
                            Clear Filters
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
