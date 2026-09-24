import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp, LayoutGrid, ScrollText, Store, User, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ease, spring } from "../lib/motion";

export type AdminNavKey =
  | "dashboard"
  | "subscribers-add"
  | "subscribers-view"
  | "stores-add"
  | "logs"
  | "profile";

interface AdminNavItem {
  key: AdminNavKey;
  label: string;
  /** Fits the phone dock, where the cells share the width. */
  short: string;
  icon: LucideIcon;
}

/**
 * The rail groups the two subscriber pages; the dock lands on the list and
 * carries it as the raised gold action in the middle cell, the way the
 * customer dock carries Join Scheme.
 */
const items: AdminNavItem[] = [
  { key: "dashboard", label: "Dashboard", short: "Home", icon: LayoutGrid },
  { key: "stores-add", label: "Add store", short: "Store", icon: Store },
  { key: "subscribers-view", label: "Subscribers", short: "Subs", icon: Users },
  { key: "logs", label: "Logs", short: "Logs", icon: ScrollText },
  { key: "profile", label: "Profile", short: "Profile", icon: User },
];

const subscriberPages: { key: AdminNavKey; label: string }[] = [
  { key: "subscribers-add", label: "Add subscriber" },
  { key: "subscribers-view", label: "View subscribers" },
];

const isSubscriberPage = (key: AdminNavKey) => key.startsWith("subscribers");

interface AdminNavListProps {
  active: AdminNavKey;
  onChange: (key: AdminNavKey) => void;
  /** `bar` is the phone dock, `rail` is the desktop sidebar column. */
  orientation?: "bar" | "rail";
  /** Both instances can be mounted at once, so shared ids must not collide. */
  idPrefix?: string;
  className?: string;
}

export default function AdminNavList({
  active,
  onChange,
  orientation = "bar",
  idPrefix = "admin",
  className = "",
}: AdminNavListProps) {
  const rail = orientation === "rail";
  const reduced = useReducedMotion();
  const [subscribersOpen, setSubscribersOpen] = useState(() => isSubscriberPage(active));

  // Landing on a subscriber page from anywhere else opens the group with it.
  useEffect(() => {
    if (isSubscriberPage(active)) setSubscribersOpen(true);
  }, [active]);

  const entry = (key: AdminNavKey, label: string, short: string, Icon: LucideIcon) => {
    const isActive = key === active;

    if (key === "subscribers-view" && !rail) {
      return (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-current={isActive ? "page" : undefined}
          aria-label={label}
          className="relative flex flex-1 flex-col items-center"
        >
          <motion.span
            aria-hidden
            whileTap={reduced ? undefined : { scale: 0.92 }}
            transition={spring.press}
            className="metal-gold -mt-8 flex h-14 w-14 items-center justify-center rounded-full text-wine-950"
            style={{
              boxShadow: isActive
                ? "0 18px 38px -14px rgba(249,223,50,0.75), inset 0 1px 0 rgba(255,255,255,0.55)"
                : "0 14px 32px -16px rgba(249,223,50,0.55), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            <Icon size={24} strokeWidth={2} />
          </motion.span>
          <span
            className={`mt-1.5 text-[9.5px] tracking-luxe-sm uppercase transition-colors duration-500 ${
              isActive ? "text-gold-200" : "text-champagne-dim"
            }`}
          >
            {short}
          </span>
        </button>
      );
    }

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
        aria-label="Super Admin"
        className={`glass absolute inset-x-0 bottom-0 z-30 flex items-end rounded-t-[26px] px-2 pt-2.5 pb-[calc(env(safe-area-inset-bottom)+12px)] ${className}`}
      >
        {items.map(({ key, label, short, icon: Icon }) => entry(key, label, short, Icon))}
      </nav>
    );
  }

  return (
    <nav aria-label="Super Admin" className={`flex flex-col gap-1.5 ${className}`}>
      {entry("dashboard", "Dashboard", "Home", LayoutGrid)}

      <div>
        <button
          type="button"
          onClick={() => setSubscribersOpen((open) => !open)}
          aria-expanded={subscribersOpen}
          className="flex w-full items-center gap-3.5 rounded-2xl px-4 py-3 text-left"
        >
          <Users
            size={17}
            strokeWidth={1.4}
            className={`transition-colors duration-500 ${
              isSubscriberPage(active) ? "text-gold-300" : "text-champagne-dim"
            }`}
          />
          <span
            className={`flex-1 text-[11px] tracking-luxe-sm uppercase transition-colors duration-500 ${
              isSubscriberPage(active) ? "text-gold-200" : "text-champagne-dim/70"
            }`}
          >
            Subscribers
          </span>
          <motion.span
            aria-hidden
            animate={{ rotate: subscribersOpen ? 0 : 180 }}
            transition={spring.soft}
            className="text-champagne-dim"
          >
            <ChevronUp size={14} strokeWidth={1.6} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {subscribersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: ease.luxe }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-1 pl-5 pt-1">
                {subscriberPages.map(({ key, label }) => {
                  const isActive = key === active;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onChange(key)}
                      aria-current={isActive ? "page" : undefined}
                      className="relative flex items-center gap-3 rounded-2xl px-4 py-2.5 text-left"
                    >
                      {isActive && (
                        <motion.span
                          layoutId={`${idPrefix}-indicator`}
                          aria-hidden
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background:
                              "linear-gradient(120deg, rgba(145,100,15,0.26) 0%, rgba(40,6,6,0.2) 100%)",
                            boxShadow: "inset 0 1px 0 rgba(251,241,201,0.12)",
                          }}
                          transition={spring.soft}
                        />
                      )}
                      <span
                        aria-hidden
                        className={`relative z-10 h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                          isActive ? "metal-gold-soft" : "bg-[rgba(215,175,92,0.35)]"
                        }`}
                      />
                      <span
                        className={`relative z-10 text-[10.5px] tracking-luxe-sm uppercase transition-colors duration-500 ${
                          isActive ? "text-gold-200" : "text-champagne-dim/70"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {entry("stores-add", "Add store", "Store", Store)}
      {entry("logs", "Logs", "Logs", ScrollText)}
      {entry("profile", "Profile", "Profile", User)}
    </nav>
  );
}
