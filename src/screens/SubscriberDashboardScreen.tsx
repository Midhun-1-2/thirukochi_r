import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BadgeCheck, Building2, LogOut, Phone } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import GlassCard from "../components/GlassCard";
import PremiumBottomSheet from "../components/PremiumBottomSheet";
import ScreenTransition from "../components/ScreenTransition";
import TopBar from "../components/TopBar";
import SubscriberNavList from "../components/SubscriberNav";
import type { SubscriberNavKey } from "../components/SubscriberNav";
import SubscriberConsoleView from "./admin/SubscriberConsoleView";
import { useIsDesktop } from "../hooks/useMediaQuery";
import useScrollIdle from "../hooks/useScrollIdle";
import { useToast } from "../hooks/useToasts";
import { maskPhone } from "../lib/format";
import { ease, rise, stagger } from "../lib/motion";
import { notifications, subscriberConsole } from "../data/mock";

interface SubscriberDashboardScreenProps {
  name: string;
  phone: string;
  onSignOut: () => void;
}

/** What a subscriber lands on after signing in with the Subscriber role. */
export default function SubscriberDashboardScreen({
  name,
  phone,
  onSignOut,
}: SubscriberDashboardScreenProps) {
  const [view, setView] = useState<SubscriberNavKey>("dashboard");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const scroller = useScrollIdle<HTMLDivElement>();
  const toast = useToast();
  const initial = (name.trim()[0] || "S").toUpperCase();

  const openTab = (key: SubscriberNavKey) => {
    if (key === "leads" || key === "schedules") {
      toast({
        title: key === "leads" ? "Leads" : "Schedules",
        detail: "This section is mocked for the demo",
      });
      return;
    }
    setView(key);
  };

  return (
    <ScreenTransition className="lg:grid lg:h-full lg:grid-cols-[272px_1fr]">
      {/* Desktop rail */}
      <aside
        className="hidden border-r border-[rgba(215,175,92,0.12)] px-7 py-11 lg:flex lg:flex-col"
        style={{
          background:
            "linear-gradient(180deg, rgba(20,1,1,0.82) 0%, rgba(34,3,3,0.78) 55%, rgba(14,0,0,0.86) 100%)",
        }}
      >
        {isDesktop && <BrandLogo variant="lockup" width={150} shared />}

        <SubscriberNavList
          active={view}
          onChange={openTab}
          orientation="rail"
          idPrefix="subscriber-rail"
          className="mt-14"
        />

        <button
          type="button"
          onClick={onSignOut}
          className="mt-auto flex items-center gap-3 rounded-2xl border border-[rgba(215,175,92,0.18)] px-4 py-3 text-left text-[11px] tracking-luxe-sm uppercase text-champagne-dim transition-colors hover:text-gold-200"
        >
          <LogOut size={15} strokeWidth={1.5} />
          Sign out
        </button>
      </aside>

      <div className="flex h-full min-h-0 flex-col">
        <TopBar
          initial={initial}
          showLogo={!isDesktop}
          onNotifications={() => setNotificationsOpen(true)}
          onProfile={() => setView("profile")}
        />

        <div
          ref={scroller}
          className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-36 lg:px-12 lg:pb-12"
        >
          <div className="mx-auto max-w-[1080px] pt-2 lg:pt-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.24, ease: ease.luxe }}
              >
                {view === "profile" ? (
                  <motion.div
                    variants={stagger}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6"
                  >
                    <motion.div variants={rise} className="lg:col-span-2">
                      <p className="text-[10.5px] tracking-luxe uppercase text-bronze">Profile</p>
                      <h1 className="mt-2 font-display text-[30px] leading-tight text-champagne lg:text-[38px]">
                        Your <span className="text-metal-shimmer">account</span>
                      </h1>
                    </motion.div>

                    <GlassCard className="px-6 py-6" beamDelay={0}>
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden
                          className="metal-gold flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-[24px] text-wine-950"
                          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" }}
                        >
                          {initial}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-display text-[22px] leading-none text-champagne">
                            {name.trim() || "Guest"}
                          </p>
                          <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-champagne-dim">
                            <Phone size={11} strokeWidth={1.6} className="text-bronze" />
                            {maskPhone(phone)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="flex items-center gap-1.5 rounded-full border border-[rgba(249,223,50,0.28)] px-3 py-1.5 text-gold-200">
                          <BadgeCheck size={12} strokeWidth={1.8} />
                          Subscriber
                        </span>
                        <span className="flex items-center gap-1.5 rounded-full border border-[rgba(215,175,92,0.22)] px-3 py-1.5 text-champagne-soft">
                          <Building2 size={12} strokeWidth={1.6} className="text-bronze" />
                          {subscriberConsole.company}
                        </span>
                        <span className="rounded-full border border-[rgba(215,175,92,0.22)] px-3 py-1.5 text-champagne-soft">
                          {subscriberConsole.planDaysLeft} days left
                        </span>
                      </div>
                    </GlassCard>

                    {/* The rail already carries Sign out from lg up. */}
                    <motion.button
                      variants={rise}
                      type="button"
                      onClick={onSignOut}
                      className="glass flex items-center justify-center gap-2.5 rounded-[var(--radius-card)] px-6 py-4 text-[12px] tracking-luxe-sm uppercase text-champagne-soft transition-colors hover:text-gold-200 lg:hidden"
                    >
                      <LogOut size={14} strokeWidth={1.6} />
                      Sign out
                    </motion.button>
                  </motion.div>
                ) : (
                  <SubscriberConsoleView name={name} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <SubscriberNavList
          active={view}
          onChange={openTab}
          orientation="bar"
          idPrefix="subscriber-bar"
          className="lg:hidden"
        />
      </div>

      <PremiumBottomSheet
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        eyebrow="Recent"
        title="Notifications"
      >
        <ul className="flex flex-col gap-2.5">
          {notifications.map((item) => (
            <li key={item.title} className="rounded-2xl border border-[rgba(215,175,92,0.14)] px-5 py-4">
              <div className="flex items-baseline justify-between">
                <p className="text-[13px] text-champagne">{item.title}</p>
                <p className="text-[10.5px] text-champagne-dim">{item.time}</p>
              </div>
              <p className="mt-1 text-[11.5px] text-champagne-dim">{item.body}</p>
            </li>
          ))}
        </ul>
      </PremiumBottomSheet>
    </ScreenTransition>
  );
}
