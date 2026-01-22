import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, helperText, className = "", ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-sage-800 mb-2">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            w-full px-4 py-3 rounded-lg border-2 
            transition-all duration-300
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${error
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : "border-sage-200 focus:border-sage-500 focus:ring-sage-500"
                        }
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1 text-sm text-sage-600">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
