import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
    children: React.ReactNode;
    variant?: "default" | "glass" | "glow";
    hover?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ children, className = "", variant = "default", hover = true, ...props }, ref) => {
        const baseClasses = "rounded-2xl p-6 transition-all duration-300";

        const variantClasses = {
            default: "bg-white shadow-lg",
            glass: "glass",
            glow: "bg-white shadow-lg card-glow",
        };

        const hoverClasses = hover
            ? "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
            : "";

        return (
            <motion.div
                ref={ref}
                className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = "Card";

export { Card };
