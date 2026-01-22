"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const [currency, setCurrency] = useState("USD");
    const [currencySymbol, setCurrencySymbol] = useState("$");

    useEffect(() => {
        // Detect user's country and set currency
        const detectCurrency = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();

                if (data.country_code === "IN") {
                    setCurrency("INR");
                    setCurrencySymbol("₹");
                } else {
                    setCurrency("USD");
                    setCurrencySymbol("$");
                }
            } catch (error) {
                console.error("Failed to detect location:", error);
            }
        };

        detectCurrency();
    }, []);

    const getPrice = (usdPrice: number) => {
        if (currency === "INR") {
            return Math.round(usdPrice * 83); // Approximate conversion rate
        }
        return usdPrice;
    };

    const plans = [
        {
            name: "Starter",
            description: "Perfect for beginners exploring yoga",
            monthlyPrice: 19,
            yearlyPrice: 190,
            features: [
                "Access to 100+ beginner classes",
                "Basic progress tracking",
                "Mobile app access",
                "Community forum access",
                "Email support",
            ],
            popular: false,
            color: "sage",
        },
        {
            name: "Pro",
            description: "For dedicated practitioners",
            monthlyPrice: 39,
            yearlyPrice: 390,
            features: [
                "Access to 500+ classes (all levels)",
                "Advanced progress tracking",
                "Practice streak rewards",
                "1-on-1 session (1 per month)",
                "Downloadable class videos",
                "Priority support",
                "Personalized recommendations",
            ],
            popular: true,
            color: "terracotta",
        },
        {
            name: "Elite",
            description: "Ultimate yoga experience",
            monthlyPrice: 79,
            yearlyPrice: 790,
            features: [
                "Unlimited access to all classes",
                "Premium progress analytics",
                "1-on-1 sessions (4 per month)",
                "Custom practice plans",
                "Early access to new content",
                "Exclusive workshops & events",
                "Dedicated success coach",
                "Offline class downloads",
            ],
            popular: false,
            color: "sage",
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-6xl font-bold font-display mb-4">
                        Choose Your <span className="gradient-text">Plan</span>
                    </h1>
                    <p className="text-xl text-sage-700 max-w-2xl mx-auto mb-8">
                        Start your journey with a 14-day free trial. Cancel anytime.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg">
                        <button
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-6 py-2 rounded-full transition-all ${billingCycle === "monthly"
                                    ? "bg-sage-500 text-white"
                                    : "text-sage-700 hover:text-sage-900"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle("yearly")}
                            className={`px-6 py-2 rounded-full transition-all ${billingCycle === "yearly"
                                    ? "bg-sage-500 text-white"
                                    : "text-sage-700 hover:text-sage-900"
                                }`}
                        >
                            Yearly
                            <span className="ml-2 text-xs bg-terracotta-500 text-white px-2 py-1 rounded-full">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                    <span className="bg-terracotta-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        Most Popular
                                    </span>
                                </div>
                            )}
                            <Card
                                variant={plan.popular ? "glow" : "default"}
                                className={`h-full flex flex-col ${plan.popular ? "border-2 border-terracotta-500 shadow-2xl" : ""
                                    }`}
                            >
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                    <p className="text-sage-600 text-sm mb-4">{plan.description}</p>
                                    <div className="mb-4">
                                        <span className="text-5xl font-bold text-sage-800">
                                            {currencySymbol}
                                            {getPrice(
                                                billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
                                            )}
                                        </span>
                                        <span className="text-sage-600 ml-2">
                                            /{billingCycle === "monthly" ? "month" : "year"}
                                        </span>
                                    </div>
                                    {billingCycle === "yearly" && (
                                        <p className="text-sm text-sage-600">
                                            {currencySymbol}
                                            {(getPrice(plan.yearlyPrice) / 12).toFixed(2)} per month
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <svg
                                                className="w-5 h-5 text-sage-500 mr-2 flex-shrink-0 mt-0.5"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span className="text-sage-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    variant={plan.popular ? "secondary" : "primary"}
                                    size="lg"
                                    className="w-full"
                                >
                                    Start Free Trial
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {[
                            {
                                q: "Can I cancel my subscription anytime?",
                                a: "Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
                            },
                            {
                                q: "What payment methods do you accept?",
                                a: "We accept all major credit cards, debit cards, and digital payment methods through Stripe and Razorpay.",
                            },
                            {
                                q: "Is there a free trial?",
                                a: "Yes! All plans come with a 14-day free trial. No credit card required to start.",
                            },
                            {
                                q: "Can I switch plans later?",
                                a: "Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
                            },
                        ].map((faq, index) => (
                            <Card key={index} variant="glass">
                                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                                <p className="text-sage-700">{faq.a}</p>
                            </Card>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
