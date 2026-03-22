import type { ButtonHTMLAttributes, ReactNode } from "react";


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
};

export const Button = ({
    children,
    className = "",
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};