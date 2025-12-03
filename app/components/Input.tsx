import { InputHTMLAttributes, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, id, ...props }: InputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="space-y-1">
      {/* Label */}
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      {/* Input Field */}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3 rounded-lg border transition 
          bg-white placeholder-gray-400
          ${error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-[#1453A0] focus:border-[#1453A0]"
          }
          focus:ring-2 focus:outline-none
          disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-500
        `}
        {...props}
      />

      {/* Error Message */}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
