import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BadgeCheck, Clock, LogOut, Phone, Settings, UserCog, UserPlus, Users } from "lucide-react";
import BrandLogo from "../components/BrandLogo";
import GlassCard from "../components/GlassCard";
import PremiumBottomSheet from "../components/PremiumBottomSheet";
import ScreenTransition from "../components/ScreenTransition";
import TopBar from "../components/TopBar";
import AdminNavList from "../components/AdminSidebar";
import type { AdminNavKey } from "../components/AdminSidebar";
import StoreFormView from "./admin/StoreFormView";
import SubscriberFormView from "./admin/SubscriberFormView";
import SubscriberListView from "./admin/SubscriberListView";
import { useIsDesktop } from "../hooks/useMediaQuery";
import useScrollIdle from "../hooks/useScrollIdle";
import { useToast } from "../hooks/useToasts";
import { maskPhone } from "../lib/format";
import { ease, rise, stagger } from "../lib/motion";
import { admin, notifications } from "../data/mock";

interface AdminDashboardScreenProps {
  name: string;
  phone: string;
  onSignOut: () => void;
}

const statCards: {
  icon: typeof Users;
  label: string;
  value: string;
  pill: string;
  note: string;
  target?: AdminNavKey;
}[] = [
  { icon: Users, label: "Total Subscribers", value: String(admin.totalSubscribers), pill: "Active", note: "All time" },
  { icon: UserCog, label: "Total Staff Under Subscribers", value: String(admin.totalStaffUnderSubscribers), pill: "Manage", note: "System users" },
  { icon: Settings, label: "Manage Subscribers", value: "All", pill: "View All", note: "Manage all subscribers", target: "subscribers-view" },
  { icon: UserPlus, label: "Create Subscriber", value: "New", pill: "Add New", note: "Quick create", target: "subscribers-add" },
];

/** The dashboard card is a summary, so it pages through the list six at a time. */
const DASHBOARD_PAGE_SIZE = 6;

export default function AdminDashboardScreen({ name, phone, onSignOut }: AdminDashboardScreenProps) {
  const [view, setView] = useState<AdminNavKey>("dashboard");
  const [subscriberPage, setSubscriberPage] = useState(1);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const scroller = useScrollIdle<HTMLDivElement>();
  const toast = useToast();
  const initial = (name.trim()[0] || "T").toUpperCase();

  const subscriberPageCount = Math.ceil(admin.subscribers.length / DASHBOARD_PAGE_SIZE);
  const subscriberStart = (subscriberPage - 1) * DASHBOARD_PAGE_SIZE;
  const pagedSubscribers = admin.subscribers.slice(
    subscriberStart,
    subscriberStart + DASHBOARD_PAGE_SIZE,
  );

  const openTab = (key: AdminNavKey) => {
    if (key === "logs") {
      toast({ title: "Logs", detail: "This section is mocked for the demo" });
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

        <AdminNavList active={view} onChange={openTab} orientation="rail" idPrefix="admin-rail" className="mt-14" />

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
                {view === "stores-add" ? (
                  <StoreFormView />
                ) : view === "subscribers-view" ? (
                  <SubscriberListView onAdd={() => setView("subscribers-add")} />
                ) : view === "subscribers-add" ? (
                  <SubscriberFormView onBackToList={() => setView("subscribers-view")} />
                ) : view === "profile" ? (
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
                          Super Admin
                        </span>
                        <span className="rounded-full border border-[rgba(215,175,92,0.22)] px-3 py-1.5 text-champagne-soft">
                          {admin.totalSubscribers} subscribers managed
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
            <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col gap-4 lg:gap-6">
              <motion.div variants={rise}>
                <p className="text-[10.5px] tracking-luxe uppercase text-bronze">Super Admin Console</p>
                <h1 className="mt-2 font-display text-[28px] leading-tight text-champagne lg:text-[38px]">
                  Subscriber <span className="text-metal-shimmer">operations</span>
                </h1>
              </motion.div>

              <motion.div variants={rise} className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {statCards.map((card, i) => {
                  const target = card.target;
                  return (
                  <GlassCard
                    key={card.label}
                    className="px-5 py-5 lg:px-6 lg:py-6"
                    beamDelay={i * 0.9}
                    label={target ? card.label : undefined}
                    onClick={target ? () => setView(target) : undefined}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 flex-1 text-[9.5px] leading-[1.5] tracking-[0.14em] uppercase text-bronze lg:max-w-[14ch] lg:text-[10px] lg:tracking-luxe">
                        {card.label}
                      </p>
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: "linear-gradient(158deg, rgba(145,100,15,0.42), rgba(30,4,4,0.5))",
                          border: "1px solid rgba(215,175,92,0.26)",
                        }}
                      >
                        <card.icon size={15} strokeWidth={1.6} className="text-gold-200" />
                      </span>
                    </div>
                    <p className="mt-3 font-display text-[28px] leading-none text-metal-gold lg:text-[30px]">
                      {card.value}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[10.5px]">
                      <span className="rounded-full border border-[rgba(249,223,50,0.3)] px-2.5 py-1 text-gold-200">
                        {card.pill}
                      </span>
                      <span className="text-champagne-dim">{card.note}</span>
                    </div>
                  </GlassCard>
                  );
                })}
              </motion.div>

              <motion.div variants={rise} className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.3fr] lg:items-start lg:gap-6">
                {/* Expiring soon */}
                <GlassCard className="px-6 py-6" beamDelay={2}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={14} strokeWidth={1.5} className="text-gold-300" />
                      <p className="font-display text-[17px] leading-none text-champagne">Expiring Soon</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toast({ title: "All expiring subscribers", detail: "Mock action for the demo" })}
                      className="text-[10px] tracking-luxe-sm uppercase text-gold-300 underline decoration-[rgba(179,135,28,0.5)] underline-offset-4"
                    >
                      View All
                    </button>
                  </div>
                  <p className="mt-1 text-[10.5px] text-champagne-dim">Within 10 days</p>

                  <ul className="no-scrollbar mt-4 flex max-h-[360px] flex-col gap-3 overflow-y-auto">
                    {admin.expiringSoon.map((item) => (
                      <li
                        key={item.id}
                        className="rounded-2xl border border-[rgba(215,175,92,0.16)] px-4 py-3.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span
                              aria-hidden
                              className="metal-gold-soft flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[13px] text-wine-950"
                            >
                              {item.name[0]}
                            </span>
                            <div className="min-w-0">
                              <p className="truncate text-[13px] text-champagne">{item.name}</p>
                              <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-champagne-dim">
                                <Phone size={10} strokeWidth={1.6} className="text-bronze" />
                                {item.phone}
                              </p>
                            </div>
                          </div>
                          <span className="shrink-0 rounded-full border border-[rgba(251,113,133,0.4)] px-2.5 py-1 text-[10px] text-rose-300/90">
                            {item.daysLeft} days
                          </span>
                        </div>
                        <p className="mt-2 truncate text-[11px] text-champagne-dim">{item.company}</p>
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {/* All subscribers */}
                <GlassCard className="px-6 py-6" beamDelay={3.4}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-[17px] leading-none text-champagne">All Subscribers</p>
                    <button
                      type="button"
                      onClick={() => toast({ title: "New subscriber", detail: "Mock action for the demo" })}
                      className="metal-gold flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium tracking-luxe-sm uppercase text-wine-950"
                    >
                      <UserPlus size={13} strokeWidth={2} />
                      New Subscriber
                    </button>
                  </div>

                  {isDesktop ? (
                    <div className="no-scrollbar mt-4 overflow-x-auto">
                      <table className="w-full min-w-[640px] border-collapse text-left">
                        <thead>
                          <tr className="border-b border-[rgba(215,175,92,0.2)] text-[10px] tracking-luxe uppercase text-bronze">
                            <th className="py-2.5 pr-3 font-normal">#</th>
                            <th className="py-2.5 pr-3 font-normal">Subscriber</th>
                            <th className="py-2.5 pr-3 font-normal">Company</th>
                            <th className="py-2.5 pr-3 font-normal">Contact</th>
                            <th className="py-2.5 pr-3 font-normal">Subscription</th>
                            <th className="py-2.5 pr-3 font-normal">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pagedSubscribers.map((row, i) => (
                            <tr key={row.id} className="border-b border-[rgba(215,175,92,0.1)] text-[12.5px] last:border-b-0">
                              <td className="py-3 pr-3 text-champagne-dim">{subscriberStart + i + 1}</td>
                              <td className="py-3 pr-3">
                                <span className="flex items-center gap-2.5">
                                  <span
                                    aria-hidden
                                    className="metal-gold-soft flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-[11px] text-wine-950"
                                  >
                                    {row.name[0]}
                                  </span>
                                  <span className="text-champagne">{row.name}</span>
                                </span>
                              </td>
                              <td className="py-3 pr-3 text-champagne-soft/85">{row.company}</td>
                              <td className="py-3 pr-3 text-champagne-dim">{row.contact}</td>
                              <td className="py-3 pr-3 text-champagne-dim">
                                {row.subscription}
                                <span
                                  className={`ml-2 text-[10px] ${
                                    row.status === "Expired" ? "text-rose-300/85" : "text-bronze"
                                  }`}
                                >
                                  {row.statusNote}
                                </span>
                              </td>
                              <td className="py-3 pr-3">
                                <span
                                  className={`rounded-full border px-2.5 py-1 text-[10px] tracking-luxe-sm uppercase ${
                                    row.status === "Active"
                                      ? "border-[rgba(52,211,153,0.4)] text-emerald-300/90"
                                      : "border-[rgba(251,113,133,0.4)] text-rose-300/90"
                                  }`}
                                >
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <ul className="mt-4 flex flex-col">
                      {pagedSubscribers.map((row) => (
                        <li
                          key={row.id}
                          className="flex items-center gap-3 border-b border-[rgba(215,175,92,0.12)] py-3.5 last:border-b-0"
                        >
                          <span
                            aria-hidden
                            className="metal-gold-soft flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[12px] text-wine-950"
                          >
                            {row.name[0]}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] text-champagne">{row.name}</span>
                            <span className="block truncate text-[11px] text-champagne-dim">
                              {row.company} · {row.contact}
                            </span>
                          </span>
                          <span className="shrink-0 text-right">
                            <span
                              className={`block rounded-full border px-2.5 py-1 text-[9.5px] tracking-luxe-sm uppercase ${
                                row.status === "Active"
                                  ? "border-[rgba(52,211,153,0.4)] text-emerald-300/90"
                                  : "border-[rgba(251,113,133,0.4)] text-rose-300/90"
                              }`}
                            >
                              {row.status}
                            </span>
                            <span className="mt-1 block text-[10px] text-champagne-dim">{row.statusNote}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[11px] text-champagne-dim">
                      Showing {subscriberStart + 1} to {subscriberStart + pagedSubscribers.length} of{" "}
                      {admin.subscribers.length} entries
                    </p>

                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: subscriberPageCount }).map((_, index) => {
                        const value = index + 1;
                        const isActive = value === subscriberPage;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setSubscriberPage(value)}
                            aria-current={isActive ? "page" : undefined}
                            className={`h-8 min-w-8 rounded-full px-3 text-[11px] transition-colors ${
                              isActive
                                ? "metal-gold font-medium text-wine-950"
                                : "border border-[rgba(215,175,92,0.24)] text-champagne-dim hover:text-gold-200"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() =>
                          setSubscriberPage((value) => Math.min(value + 1, subscriberPageCount))
                        }
                        disabled={subscriberPage === subscriberPageCount}
                        className="h-8 rounded-full border border-[rgba(215,175,92,0.24)] px-3.5 text-[10px] tracking-luxe-sm uppercase text-champagne-dim transition-colors hover:text-gold-200 disabled:opacity-35"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <AdminNavList
          active={view}
          onChange={openTab}
          orientation="bar"
          idPrefix="admin-bar"
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
