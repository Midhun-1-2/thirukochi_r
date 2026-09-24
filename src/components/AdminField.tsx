import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { spring } from "../lib/motion";

/** Shared plate for every admin input, matching the join-scheme fields. */
export const fieldStyle = {
  borderWidth: 1,
  borderStyle: "solid" as const,
  borderColor: "rgba(215,175,92,0.34)",
  background: "linear-gradient(158deg, rgba(52,8,8,0.86) 0%, rgba(18,1,1,0.92) 100%)",
};

export const errorBorder = "rgba(251,113,133,0.6)";

export function FieldLabel({ children, required }: { children: string; required?: boolean }) {
  return (
    <span className="mb-2.5 block text-[10px] tracking-luxe uppercase text-bronze">
      {children}
      {required && <span className="ml-1 text-gold-300">*</span>}
    </span>
  );
}

interface AdminTextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  inputMode?: "text" | "tel" | "numeric" | "email" | "url";
  type?: "text" | "password" | "date";
  maxLength?: number;
  trailing?: ReactNode;
}

export function AdminTextField({
  label,
  value,
  onChange,
  placeholder,
  required,
  error,
  hint,
  inputMode = "text",
  type = "text",
  maxLength,
  trailing,
}: AdminTextFieldProps) {
  return (
    <label className="block">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div
        className="flex h-[54px] items-center gap-2 rounded-2xl px-4"
        style={{ ...fieldStyle, borderColor: error ? errorBorder : fieldStyle.borderColor }}
      >
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          type={type}
          maxLength={maxLength}
          aria-label={label}
          aria-invalid={Boolean(error)}
          className="w-full bg-transparent text-[14px] text-champagne caret-gold-300 placeholder:text-champagne-dim [color-scheme:dark]"
        />
        {trailing}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-[11.5px] text-rose-300/90">
          {error}
        </p>
      ) : (
        hint && <p className="mt-2 text-[11px] text-champagne-dim">{hint}</p>
      )}
    </label>
  );
}

interface AdminSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

/**
 * Native select on the same plate as the text fields. The list itself is the
 * platform's, so the options carry their own dark colours.
 */
export function AdminSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
  required,
  error,
  hint,
}: AdminSelectProps) {
  return (
    <label className="block">
      <FieldLabel required={required}>{label}</FieldLabel>
      <div
        className="relative flex h-[54px] items-center rounded-2xl px-4"
        style={{ ...fieldStyle, borderColor: error ? errorBorder : fieldStyle.borderColor }}
      >
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          aria-invalid={Boolean(error)}
          className={`w-full appearance-none bg-transparent pr-6 text-[14px] [color-scheme:dark] ${
            value ? "text-champagne" : "text-champagne-dim"
          }`}
        >
          <option value="" style={{ backgroundColor: "#1a0202" }}>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} style={{ backgroundColor: "#1a0202" }}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          size={15}
          strokeWidth={1.6}
          className="pointer-events-none absolute right-4 text-bronze"
        />
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-[11.5px] text-rose-300/90">
          {error}
        </p>
      ) : (
        hint && <p className="mt-2 text-[11px] text-champagne-dim">{hint}</p>
      )}
    </label>
  );
}

interface AdminTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function AdminTextArea({ label, value, onChange, placeholder, rows = 3 }: AdminTextAreaProps) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        aria-label={label}
        className="w-full resize-none rounded-2xl px-4 py-3 text-[13.5px] text-champagne caret-gold-300 placeholder:text-champagne-dim"
        style={fieldStyle}
      />
    </label>
  );
}

interface AdminToggleProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  hint?: string;
}

/** Gold rail switch: the metal fills as it turns on. */
export function AdminToggle({ checked, onChange, label, hint }: AdminToggleProps) {
  const reduced = useReducedMotion();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-start gap-3 text-left"
    >
      <motion.span
        aria-hidden
        animate={{ borderColor: checked ? "rgba(249,223,50,0.75)" : "rgba(215,175,92,0.3)" }}
        transition={spring.press}
        className={`mt-0.5 flex h-[22px] w-[38px] shrink-0 items-center rounded-full px-[3px] ${
          checked ? "metal-gold" : ""
        }`}
        style={{
          borderWidth: 1,
          borderStyle: "solid",
          background: checked ? undefined : "linear-gradient(158deg, rgba(52,8,8,0.8), rgba(18,1,1,0.9))",
        }}
      >
        <motion.span
          className="h-[15px] w-[15px] rounded-full"
          animate={{
            x: checked ? 15 : 0,
            backgroundColor: checked ? "#120000" : "rgba(240,227,202,0.5)",
          }}
          transition={reduced ? { duration: 0 } : spring.press}
        />
      </motion.span>

      <span className="min-w-0">
        <span className="block text-[12.5px] text-champagne-soft">{label}</span>
        {hint && <span className="mt-0.5 block text-[11px] text-champagne-dim">{hint}</span>}
      </span>
    </button>
  );
}
