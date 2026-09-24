import { motion } from "framer-motion";
import { CalendarCheck, LayoutGrid, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { spring } from "../lib/motion";

export type SubscriberNavKey = "dashboard" | "leads" | "schedules" | "profile";

interface SubscriberNavItem {
  key: SubscriberNavKey;
  label: string;
  /** Fits the phone dock, where the cells share the width. */
  short: string;
  icon: LucideIcon;
}

const items: SubscriberNavItem[] = [
  { key: "dashboard", label: "Dashboard", short: "Home", icon: LayoutGrid },
  { key: "leads", label: "Leads", short: "Leads", icon: Users },
  { key: "schedules", label: "Schedules", short: "Plans", icon: CalendarCheck },
  { key: "profile", label: "Profile", short: "Profile", icon: User },
];

interface SubscriberNavListProps {
  active: SubscriberNavKey;
  onChange: (key: SubscriberNavKey) => void;
  /** `bar` is the phone dock, `rail` is the desktop sidebar column. */
  orientation?: "bar" | "rail";
  /** Both instances can be mounted at once, so shared ids must not collide. */
  idPrefix?: string;
  className?: string;
}

export default function SubscriberNavList({
  active,
  onChange,
  orientation = "bar",
  idPrefix = "subscriber",
  className = "",
}: SubscriberNavListProps) {
  const rail = orientation === "rail";

  const entry = ({ key, label, short, icon: Icon }: SubscriberNavItem) => {
    const isActive = key === active;

    return (
      <button
        key={key}
        type="button"
        onClick={() => onChange(key)}
        aria-current={isActive ? "page" : undefined}
        aria-label={label}
        className={
          rail
            ? "relative flex items-center gap-3.5 rounded-2xl px-4 py-3 text-left"
            : "relative flex flex-1 flex-col items-center gap-1.5 rounded-2xl py-2"
        }
      >
        {isActive && (
          <motion.span
            layoutId={`${idPrefix}-indicator`}
            aria-hidden
            className={rail ? "absolute inset-0 rounded-2xl" : "absolute inset-x-2 inset-y-0 rounded-2xl"}
            style={{
              background: rail
                ? "linear-gradient(120deg, rgba(145,100,15,0.26) 0%, rgba(40,6,6,0.2) 100%)"
                : "radial-gradient(70% 60% at 50% 34%, rgba(249,223,50,0.18) 0%, rgba(249,223,50,0) 72%)",
              boxShadow: "inset 0 1px 0 rgba(251,241,201,0.12)",
            }}
            transition={spring.soft}
          />
        )}

        <Icon
          size={rail ? 17 : 19}
          strokeWidth={1.4}
          className={`relative z-10 transition-colors duration-500 ${
            isActive ? "text-gold-300" : "text-champagne-dim"
          }`}
        />
        <span
          className={`relative z-10 tracking-luxe-sm uppercase transition-colors duration-500 ${
            rail ? "text-[11px]" : "text-[9.5px]"
          } ${isActive ? "text-gold-200" : "text-champagne-dim/70"}`}
        >
          {rail ? label : short}
        </span>

        {isActive && (
          <motion.span
            layoutId={`${idPrefix}-underline`}
            aria-hidden
            className={
              rail
                ? "metal-gold-soft absolute left-0 top-1/2 h-7 w-px -translate-y-1/2 rounded-full"
                : "metal-gold-soft absolute -bottom-0.5 h-px w-7 rounded-full"
            }
            transition={spring.soft}
          />
        )}
      </button>
    );
  };

  if (!rail) {
    return (
      <nav
        aria-label="Subscriber"
        className={`glass absolute inset-x-0 bottom-0 z-30 flex items-end rounded-t-[26px] px-2 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+12px)] ${className}`}
      >
        {items.map(entry)}
      </nav>
    );
  }

  return (
    <nav aria-label="Subscriber" className={`flex flex-col gap-1.5 ${className}`}>
      {items.map(entry)}
    </nav>
  );
}
