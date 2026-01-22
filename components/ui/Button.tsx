import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-hover-lift",
    {
        variants: {
            variant: {
                primary:
                    "bg-sage-500 text-white hover:bg-sage-600 focus:ring-sage-500 shadow-lg hover:shadow-xl",
                secondary:
                    "bg-terracotta-500 text-white hover:bg-terracotta-600 focus:ring-terracotta-500 shadow-lg hover:shadow-xl",
                outline:
                    "border-2 border-sage-500 text-sage-700 hover:bg-sage-50 focus:ring-sage-500",
                ghost:
                    "text-sage-700 hover:bg-sage-100 focus:ring-sage-500",
                glass:
                    "glass text-sage-800 hover:bg-white/30 focus:ring-sage-500",
            },
            size: {
                sm: "px-4 py-2 text-sm",
                md: "px-6 py-3 text-base",
                lg: "px-8 py-4 text-lg",
                xl: "px-10 py-5 text-xl",
            },
        },
        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, children, disabled, ...props }, ref) => {
        return (
            <button
                className={buttonVariants({ variant, size, className })}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        Loading...
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
