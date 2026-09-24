import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  AlertCircle,
  Briefcase,
  CalendarCheck,
  CalendarClock,
  ClipboardCheck,
  Clock,
  IndianRupee,
  MapPin,
  Phone,
  UserCheck,
  Users,
} from "lucide-react";
import GlassCard from "../../components/GlassCard";
import { useIsDesktop } from "../../hooks/useMediaQuery";
import { useToast } from "../../hooks/useToasts";
import { formatRupeesExact } from "../../lib/format";
import { rise, stagger } from "../../lib/motion";
import { subscriberConsole } from "../../data/mock";

interface SubscriberConsoleViewProps {
  name: string;
}

type Priority = "High" | "Medium" | "Low";
type Status = "Not Started" | "Pending" | "Completed";

const priorityTone: Record<Priority, string> = {
  High: "border-[rgba(251,113,133,0.42)] text-rose-300/90",
  Medium: "border-[rgba(249,223,50,0.34)] text-gold-200",
  Low: "border-[rgba(215,175,92,0.26)] text-champagne-dim",
};

const statusTone: Record<Status, string> = {
  "Not Started": "border-[rgba(215,175,92,0.26)] text-champagne-dim",
  Pending: "border-[rgba(249,223,50,0.34)] text-gold-200",
  Completed: "border-[rgba(52,211,153,0.4)] text-emerald-300/90",
};

function Chip({ tone, children }: { tone: string; children: ReactNode }) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-[10px] tracking-luxe-sm uppercase ${tone}`}>
      {children}
    </span>
  );
}

/** Gold initial disc, used wherever a person is named. */
function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  return (
    <span
      aria-hidden
      className="metal-gold-soft flex shrink-0 items-center justify-center rounded-full font-display text-wine-950"
      style={{ height: size, width: size, fontSize: size * 0.36 }}
    >
      {name[0]}
    </span>
  );
}

function CardHeading({
  icon,
  title,
  note,
  onViewAll,
}: {
  icon: ReactNode;
  title: string;
  note?: string;
  onViewAll?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-gold-300">
            {icon}
          </span>
          <p className="font-display text-[17px] leading-none text-champagne">{title}</p>
        </div>
        {note && <p className="mt-1.5 text-[10.5px] text-champagne-dim">{note}</p>}
      </div>

      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="text-[10px] tracking-luxe-sm uppercase text-gold-300 underline decoration-[rgba(179,135,28,0.5)] underline-offset-4"
        >
          View All
        </button>
      )}
    </div>
  );
}

const headRow = "border-b border-[rgba(215,175,92,0.2)] text-[10px] tracking-luxe uppercase text-bronze";
const bodyRow = "border-b border-[rgba(215,175,92,0.1)] text-[12.5px] last:border-b-0";
const cell = "py-3 pr-3 align-top";

export default function SubscriberConsoleView({ name }: SubscriberConsoleViewProps) {
  const isDesktop = useIsDesktop();
  const toast = useToast();

  const mock = (title: string) => toast({ title, detail: "Mock action for the demo" });
  const firstName = name.trim().split(" ")[0] || subscriberConsole.company;

  const stats = [
    { icon: Users, label: "Total Leads", stat: subscriberConsole.stats.totalLeads },
    { icon: UserCheck, label: "Active Staff", stat: subscriberConsole.stats.activeStaff },
    { icon: CalendarCheck, label: "Today's Schedules", stat: subscriberConsole.stats.todaySchedules },
    { icon: Briefcase, label: "Active Projects", stat: subscriberConsole.stats.activeProjects },
  ];

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col gap-4 lg:gap-6">
      {/* Welcome, the plan countdown and the two queues */}
      <motion.div variants={rise} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10.5px] tracking-luxe uppercase text-bronze">Subscriber console</p>
          <h1 className="mt-2 font-display text-[28px] leading-tight text-champagne lg:text-[38px]">
            Welcome <span className="text-metal-shimmer">{firstName}</span>
          </h1>
          <p className="mt-2 text-[12px] text-champagne-dim">
            Manage your leads and staff schedules efficiently.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="rounded-full border border-[rgba(215,175,92,0.26)] px-4 py-2 text-[10px] tracking-luxe-sm uppercase text-champagne-dim">
            {subscriberConsole.planDaysLeft} days left
          </span>

          <button
            type="button"
            onClick={() => mock("Pending approvals")}
            className="metal-gold flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium tracking-luxe-sm uppercase text-wine-950"
          >
            <ClipboardCheck size={13} strokeWidth={2} />
            Pending Approvals
            <span className="rounded-full bg-wine-950/20 px-2 py-0.5 tabular-nums">
              {subscriberConsole.pendingApprovals}
            </span>
          </button>

          <button
            type="button"
            onClick={() => mock("Alerts")}
            aria-label="Alerts"
            className="flex items-center gap-2 rounded-full border border-[rgba(251,113,133,0.4)] px-4 py-2 text-[10px] tracking-luxe-sm uppercase text-rose-300/90"
          >
            <AlertCircle size={13} strokeWidth={1.8} />
            <span className="tabular-nums">{subscriberConsole.alerts}</span>
          </button>
        </div>
      </motion.div>

      {/* Counters */}
      <motion.div variants={rise} className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {stats.map((card, i) => (
          <GlassCard key={card.label} className="px-5 py-5 lg:px-6 lg:py-6" beamDelay={i * 0.9}>
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
              {card.stat.value}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[10.5px]">
              <span className="rounded-full border border-[rgba(249,223,50,0.3)] px-2.5 py-1 tabular-nums text-gold-200">
                {card.stat.pill}
              </span>
              <span className="text-champagne-dim">{card.stat.note}</span>
            </div>
          </GlassCard>
        ))}
      </motion.div>

      <motion.div variants={rise} className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-6">
        {/* Today's Staff Schedules */}
        <GlassCard className="px-6 py-6" beamDelay={2}>
          <CardHeading
            icon={<CalendarCheck size={14} strokeWidth={1.5} />}
            title="Today's Staff Schedules"
            onViewAll={() => mock("All staff schedules")}
          />

          {isDesktop ? (
            <div className="no-scrollbar mt-4 overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left">
                <thead>
                  <tr className={headRow}>
                    <th className="py-2.5 pr-3 font-normal">Staff</th>
                    <th className="py-2.5 pr-3 font-normal">Customer / Stage / Priority</th>
                    <th className="py-2.5 pr-3 font-normal">Service &amp; Instructions</th>
                    <th className="py-2.5 pr-3 font-normal">Started At</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriberConsole.staffSchedules.map((row) => (
                    <tr key={row.id} className={bodyRow}>
                      <td className={cell}>
                        <span className="flex items-center gap-2.5">
                          <Avatar name={row.staff} />
                          <span className="min-w-0">
                            <span className="block text-champagne">{row.staff}</span>
                            <span className="block text-[10.5px] text-champagne-dim">{row.role}</span>
                            <span className="mt-0.5 flex items-center gap-1 text-[10.5px] text-bronze">
                              <MapPin size={10} strokeWidth={1.6} />
                              {row.workLocation}
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="block text-champagne">{row.customer}</span>
                        <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          <Chip tone="border-[rgba(215,175,92,0.26)] text-champagne-soft/85">{row.stage}</Chip>
                          <Chip tone={priorityTone[row.priority]}>{row.priority}</Chip>
                        </span>
                        <span className="mt-1.5 block text-[10.5px] text-champagne-dim">
                          Scheduled: {row.scheduledOn}
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="block text-champagne-soft/85">{row.service}</span>
                        <span className="mt-1 block max-w-[30ch] text-[11px] text-champagne-dim">
                          {row.instruction}
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="block text-champagne-soft/85">{row.startedDate}</span>
                        <span className="block text-[11px] text-champagne-dim">{row.startedTime}</span>
                        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-[rgba(215,175,92,0.26)] px-2.5 py-1 text-[10px] text-champagne-dim">
                          <Clock size={10} strokeWidth={1.6} />
                          {row.elapsed}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col">
              {subscriberConsole.staffSchedules.map((row) => (
                <li key={row.id} className="border-b border-[rgba(215,175,92,0.12)] py-4 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.staff} size={36} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] text-champagne">{row.staff}</span>
                      <span className="block truncate text-[11px] text-champagne-dim">
                        {row.role} · {row.workLocation}
                      </span>
                    </span>
                    <Chip tone={priorityTone[row.priority]}>{row.priority}</Chip>
                  </div>
                  <p className="mt-2.5 text-[12px] text-champagne-soft/85">
                    {row.customer} · {row.stage}
                  </p>
                  <p className="mt-1 text-[11px] text-champagne-dim">
                    {row.service} — {row.instruction}
                  </p>
                  <p className="mt-1.5 text-[11px] text-bronze">
                    Scheduled: {row.scheduledOn} · Started {row.startedDate} {row.startedTime} · {row.elapsed}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        {/* Recent Leads */}
        <GlassCard className="px-6 py-6" beamDelay={3.2}>
          <CardHeading
            icon={<Users size={14} strokeWidth={1.5} />}
            title="Recent Leads"
            onViewAll={() => mock("All leads")}
          />

          {isDesktop ? (
            <div className="no-scrollbar mt-4 overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left">
                <thead>
                  <tr className={headRow}>
                    <th className="py-2.5 pr-3 font-normal">Customer</th>
                    <th className="py-2.5 pr-3 font-normal">Assigned Staff</th>
                    <th className="py-2.5 pr-3 font-normal">Current Stage</th>
                    <th className="py-2.5 pr-3 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriberConsole.recentLeads.map((row) => (
                    <tr key={row.id} className={bodyRow}>
                      <td className={cell}>
                        <span className="block text-champagne">{row.customer}</span>
                        <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-champagne-dim">
                          <Phone size={10} strokeWidth={1.6} className="text-bronze" />
                          {row.phone}
                        </span>
                      </td>
                      <td className={`${cell} text-champagne-soft/85`}>{row.assignedStaff}</td>
                      <td className={`${cell} text-champagne-dim`}>{row.stage}</td>
                      <td className={cell}>
                        <Chip tone={statusTone[row.status]}>{row.status}</Chip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col">
              {subscriberConsole.recentLeads.map((row) => (
                <li key={row.id} className="border-b border-[rgba(215,175,92,0.12)] py-3.5 last:border-b-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] text-champagne">{row.customer}</span>
                      <span className="block truncate text-[11px] text-champagne-dim">{row.phone}</span>
                    </span>
                    <Chip tone={statusTone[row.status]}>{row.status}</Chip>
                  </div>
                  <p className="mt-2 text-[11px] text-champagne-dim">
                    {row.assignedStaff} · {row.stage}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </motion.div>

      {/* Overdue Schedules */}
      <motion.div variants={rise}>
        <GlassCard className="px-6 py-6" beamDelay={4.4}>
          <CardHeading
            icon={<CalendarClock size={14} strokeWidth={1.5} />}
            title="Overdue Schedules"
            note="Last 5 days"
            onViewAll={() => mock("All overdue schedules")}
          />

          {isDesktop ? (
            <div className="no-scrollbar mt-4 overflow-x-auto">
              <table className="w-full min-w-[780px] border-collapse text-left">
                <thead>
                  <tr className={headRow}>
                    <th className="py-2.5 pr-3 font-normal">Customer</th>
                    <th className="py-2.5 pr-3 font-normal">Assigned Staff</th>
                    <th className="py-2.5 pr-3 font-normal">Service &amp; Stage</th>
                    <th className="py-2.5 pr-3 font-normal">Due Date</th>
                    <th className="py-2.5 pr-3 font-normal">Priority &amp; Status</th>
                    <th className="py-2.5 pr-3 font-normal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriberConsole.overdueSchedules.map((row) => (
                    <tr key={row.id} className={bodyRow}>
                      <td className={cell}>
                        <span className="block text-champagne">{row.customer}</span>
                        <span className="mt-0.5 block text-[10.5px] text-champagne-dim">
                          Scheduled: {row.scheduledOn}
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="flex items-center gap-2.5">
                          <Avatar name={row.staff} />
                          <span>
                            <span className="block text-champagne-soft/85">{row.staff}</span>
                            <span className="block text-[10.5px] text-champagne-dim">{row.staffRole}</span>
                          </span>
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="flex flex-wrap items-center gap-1.5">
                          <Chip tone="border-[rgba(215,175,92,0.26)] text-champagne-soft/85">{row.service}</Chip>
                          <Chip tone="border-[rgba(215,175,92,0.26)] text-champagne-dim">{row.stage}</Chip>
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="block text-champagne-soft/85">{row.dueDate}</span>
                        <span className="mt-1.5 inline-block rounded-full border border-[rgba(251,113,133,0.4)] px-2.5 py-1 text-[10px] text-rose-300/90">
                          {row.overdueBy}
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="flex flex-wrap items-center gap-1.5">
                          <Chip tone={priorityTone[row.priority]}>{row.priority}</Chip>
                          <Chip tone={statusTone[row.status]}>{row.status}</Chip>
                        </span>
                      </td>
                      <td className={cell}>
                        <button
                          type="button"
                          onClick={() => mock(`${row.customer} schedule`)}
                          className="rounded-full border border-[rgba(215,175,92,0.26)] px-3.5 py-1.5 text-[10px] tracking-luxe-sm uppercase text-champagne-dim transition-colors hover:text-gold-200"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col">
              {subscriberConsole.overdueSchedules.map((row) => (
                <li key={row.id} className="border-b border-[rgba(215,175,92,0.12)] py-4 last:border-b-0">
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block truncate text-[13px] text-champagne">{row.customer}</span>
                      <span className="block truncate text-[11px] text-champagne-dim">
                        {row.staff} · {row.staffRole}
                      </span>
                    </span>
                    <Chip tone={priorityTone[row.priority]}>{row.priority}</Chip>
                  </div>
                  <p className="mt-2 text-[11px] text-champagne-dim">
                    {row.service} · {row.stage} · Due {row.dueDate}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5">
                      <Chip tone="border-[rgba(251,113,133,0.4)] text-rose-300/90">{row.overdueBy}</Chip>
                      <Chip tone={statusTone[row.status]}>{row.status}</Chip>
                    </span>
                    <button
                      type="button"
                      onClick={() => mock(`${row.customer} schedule`)}
                      className="rounded-full border border-[rgba(215,175,92,0.26)] px-3.5 py-1.5 text-[10px] tracking-luxe-sm uppercase text-champagne-dim"
                    >
                      Details
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>
      </motion.div>

      {/* Customer Financial Overview */}
      <motion.div variants={rise}>
        <GlassCard className="px-6 py-6" beamDelay={5.6}>
          <CardHeading icon={<IndianRupee size={14} strokeWidth={1.5} />} title="Customer Financial Overview" />

          {isDesktop ? (
            <div className="no-scrollbar mt-4 overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left">
                <thead>
                  <tr className={headRow}>
                    <th className="py-2.5 pr-3 font-normal">Customer Details</th>
                    <th className="py-2.5 pr-3 font-normal">Financial Values</th>
                    <th className="py-2.5 pr-3 font-normal">Billed &amp; Discounts</th>
                    <th className="py-2.5 pr-3 font-normal">Remaining &amp; Due</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriberConsole.financials.map((row) => (
                    <tr key={row.id} className={bodyRow}>
                      <td className={cell}>
                        <button
                          type="button"
                          onClick={() => mock(row.customer)}
                          className="block text-left text-champagne transition-colors hover:text-gold-200"
                        >
                          {row.customer}
                        </button>
                        <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-champagne-dim">
                          <Phone size={10} strokeWidth={1.6} className="text-bronze" />
                          {row.phone}
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="flex flex-col gap-1 text-[11.5px] text-champagne-dim">
                          <span>
                            Budget:{" "}
                            <span className="tabular-nums text-champagne-soft/85">
                              {formatRupeesExact(row.budget)}
                            </span>
                          </span>
                          <span>
                            Agreement:{" "}
                            <span className="tabular-nums text-champagne-soft/85">
                              {formatRupeesExact(row.agreement)}
                            </span>
                          </span>
                          <span>
                            Billing Val:{" "}
                            <span className="tabular-nums text-champagne-soft/85">
                              {formatRupeesExact(row.billingValue)}
                            </span>
                          </span>
                          <span>
                            Opening:{" "}
                            <span className="tabular-nums text-champagne-soft/85">
                              {formatRupeesExact(row.opening)} Db
                            </span>
                          </span>
                        </span>
                      </td>
                      <td className={cell}>
                        <span className="block tabular-nums text-emerald-300/85">
                          Billed: {formatRupeesExact(row.billed)}
                        </span>
                        <span className="mt-1 block text-[11px] text-champagne-dim">{row.discounts}</span>
                      </td>
                      <td className={cell}>
                        <span className="block tabular-nums text-gold-200">
                          Due: {formatRupeesExact(row.due)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ul className="mt-4 flex flex-col">
              {subscriberConsole.financials.map((row) => (
                <li key={row.id} className="border-b border-[rgba(215,175,92,0.12)] py-4 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => mock(row.customer)}
                    className="block text-left text-[13px] text-champagne"
                  >
                    {row.customer}
                  </button>
                  <p className="text-[11px] text-champagne-dim">{row.phone}</p>
                  <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-champagne-dim">
                    <span>Budget</span>
                    <span className="text-right tabular-nums text-champagne-soft/85">
                      {formatRupeesExact(row.budget)}
                    </span>
                    <span>Agreement</span>
                    <span className="text-right tabular-nums text-champagne-soft/85">
                      {formatRupeesExact(row.agreement)}
                    </span>
                    <span>Billing Val</span>
                    <span className="text-right tabular-nums text-champagne-soft/85">
                      {formatRupeesExact(row.billingValue)}
                    </span>
                    <span>Opening</span>
                    <span className="text-right tabular-nums text-champagne-soft/85">
                      {formatRupeesExact(row.opening)} Db
                    </span>
                    <span>Billed</span>
                    <span className="text-right tabular-nums text-emerald-300/85">
                      {formatRupeesExact(row.billed)}
                    </span>
                    <span>Due</span>
                    <span className="text-right tabular-nums text-gold-200">{formatRupeesExact(row.due)}</span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-champagne-dim">{row.discounts}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Totals */}
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[rgba(215,175,92,0.2)] pt-4 text-[11.5px]">
            <span className="text-[10px] tracking-luxe uppercase text-bronze">Totals</span>
            <span className="text-champagne-dim">
              Budget:{" "}
              <span className="tabular-nums text-champagne-soft/85">
                {formatRupeesExact(subscriberConsole.financialTotals.budget)}
              </span>
            </span>
            <span className="text-champagne-dim">
              Agreement:{" "}
              <span className="tabular-nums text-champagne-soft/85">
                {formatRupeesExact(subscriberConsole.financialTotals.agreement)}
              </span>
            </span>
            <span className="text-champagne-dim">
              Billing Val:{" "}
              <span className="tabular-nums text-champagne-soft/85">
                {formatRupeesExact(subscriberConsole.financialTotals.billingValue)}
              </span>
            </span>
            <span className="text-champagne-dim">
              Total Due:{" "}
              <span className="tabular-nums text-gold-200">
                {formatRupeesExact(subscriberConsole.financialTotals.totalDue)}
              </span>
            </span>
          </div>

          <p className="mt-3 text-[11px] leading-relaxed text-champagne-dim">
            <span className="text-bronze">Due amount calculation: </span>
            {subscriberConsole.dueNote}
          </p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
