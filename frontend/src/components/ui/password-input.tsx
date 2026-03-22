import { useState, type InputHTMLAttributes } from "react";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = ({
    className = "",
    ...props
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-12 text-sm outline-none transition focus:border-gray-500 ${className}`}
                {...props}
            />

            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? "Hide" : "Show"}
            </button>
        </div>
    );
};