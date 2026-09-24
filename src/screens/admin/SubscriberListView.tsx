import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Pencil, Search, Trash2, UserPlus, Users } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import { fieldStyle } from "../../components/AdminField";
import { useIsDesktop } from "../../hooks/useMediaQuery";
import { useToast } from "../../hooks/useToasts";
import { rise, stagger } from "../../lib/motion";
import { admin } from "../../data/mock";

interface SubscriberListViewProps {
  onAdd: () => void;
}

const PAGE_SIZE = 10;

function StatusChip({ status }: { status: "Active" | "Expired" }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[10px] tracking-luxe-sm uppercase ${
        status === "Active"
          ? "border-[rgba(52,211,153,0.4)] text-emerald-300/90"
          : "border-[rgba(251,113,133,0.4)] text-rose-300/90"
      }`}
    >
      {status}
    </span>
  );
}

export default function SubscriberListView({ onAdd }: SubscriberListViewProps) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const isDesktop = useIsDesktop();
  const toast = useToast();

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return admin.subscribers;
    return admin.subscribers.filter((row) =>
      [row.name, row.company, row.contact, row.email].join(" ").toLowerCase().includes(needle),
    );
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PAGE_SIZE;
  const rows = matches.slice(start, start + PAGE_SIZE);

  const edit = (name: string) => toast({ title: `Edit ${name}`, detail: "Mock action for the demo" });
  const remove = (name: string) => toast({ title: `Remove ${name}`, detail: "Mock action for the demo" });

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col gap-4 lg:gap-6">
      <motion.div variants={rise} className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10.5px] tracking-luxe uppercase text-bronze">Subscribers</p>
          <h1 className="mt-2 font-display text-[28px] leading-tight text-champagne lg:text-[38px]">
            Manage <span className="text-metal-shimmer">subscribers</span>
          </h1>
          <p className="mt-2 text-[12px] text-champagne-dim">View and manage all subscribers.</p>
        </div>

        <div className="flex w-full items-center gap-3 rounded-2xl border border-[rgba(215,175,92,0.22)] px-4 py-3 lg:w-auto">
          <Users size={15} strokeWidth={1.5} className="text-gold-300" />
          <span className="font-display text-[19px] leading-none text-champagne">
            {admin.subscribers.length}
          </span>
          <span className="text-[10px] tracking-luxe uppercase text-bronze">Subscribers</span>
          <button
            type="button"
            onClick={onAdd}
            className="metal-gold ml-auto flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-medium tracking-luxe-sm uppercase text-wine-950 lg:ml-1"
          >
            <UserPlus size={13} strokeWidth={2} />
            Add
          </button>
        </div>
      </motion.div>

      <GlassCard className="px-6 py-6" beamDelay={0}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-[17px] leading-none text-champagne">Subscribers list</p>

          <label
            className="flex h-[44px] w-full items-center gap-2.5 rounded-2xl px-4 lg:w-auto"
            style={fieldStyle}
          >
            <Search size={14} strokeWidth={1.6} className="text-bronze" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              aria-label="Search subscribers"
              className="w-full bg-transparent text-[13px] text-champagne caret-gold-300 placeholder:text-champagne-dim lg:w-[220px]"
            />
          </label>
        </div>

        {isDesktop ? (
          <div className="no-scrollbar mt-5 overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[rgba(215,175,92,0.2)] text-[10px] tracking-luxe uppercase text-bronze">
                  <th className="py-2.5 pr-3 font-normal">#</th>
                  <th className="py-2.5 pr-3 font-normal">Actions</th>
                  <th className="py-2.5 pr-3 font-normal">Subscriber</th>
                  <th className="py-2.5 pr-3 font-normal">Company</th>
                  <th className="py-2.5 pr-3 font-normal">Phone number</th>
                  <th className="py-2.5 pr-3 font-normal">Email</th>
                  <th className="py-2.5 pr-3 font-normal">Status</th>
                  <th className="py-2.5 pr-3 font-normal">Start date</th>
                  <th className="py-2.5 pr-3 font-normal">Expiry date</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b border-[rgba(215,175,92,0.1)] text-[12.5px] last:border-b-0"
                  >
                    <td className="py-3 pr-3 text-champagne-dim">{start + index + 1}</td>
                    <td className="py-3 pr-3">
                      <span className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => edit(row.name)}
                          aria-label={`Edit ${row.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-champagne-dim transition-colors hover:text-gold-200"
                        >
                          <Pencil size={13} strokeWidth={1.6} />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(row.name)}
                          aria-label={`Remove ${row.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-champagne-dim transition-colors hover:text-rose-300"
                        >
                          <Trash2 size={13} strokeWidth={1.6} />
                        </button>
                      </span>
                    </td>
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
                    <td className="py-3 pr-3">
                      <span className="block text-champagne-soft/85">{row.company}</span>
                      <span className="block text-[10.5px] text-champagne-dim">
                        Expires: {row.subscription}
                      </span>
                    </td>
                    <td className="py-3 pr-3 text-champagne-dim">{row.contact}</td>
                    <td className="py-3 pr-3 text-champagne-dim">{row.email || "—"}</td>
                    <td className="py-3 pr-3">
                      <StatusChip status={row.status} />
                    </td>
                    <td className="py-3 pr-3 text-champagne-dim">{row.startDate}</td>
                    <td className="py-3 pr-3">
                      <span className="block text-champagne-soft/85">{row.subscription}</span>
                      <span
                        className={`block text-[10.5px] ${
                          row.status === "Expired" ? "text-rose-300/85" : "text-bronze"
                        }`}
                      >
                        {row.statusNote}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ul className="mt-5 flex flex-col">
            {rows.map((row) => (
              <li key={row.id} className="border-b border-[rgba(215,175,92,0.12)] py-4 last:border-b-0">
                <div className="flex items-center gap-3">
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
                  <StatusChip status={row.status} />
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-champagne-dim">
                    {row.startDate} — {row.subscription} · {row.statusNote}
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => edit(row.name)}
                      aria-label={`Edit ${row.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-champagne-dim transition-colors hover:text-gold-200"
                    >
                      <Pencil size={14} strokeWidth={1.6} />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(row.name)}
                      aria-label={`Remove ${row.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-champagne-dim transition-colors hover:text-rose-300"
                    >
                      <Trash2 size={14} strokeWidth={1.6} />
                    </button>
                  </span>
                </div>
              </li>
            ))}

            {rows.length === 0 && (
              <li className="py-6 text-center text-[12px] text-champagne-dim">No subscribers match that search.</li>
            )}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-champagne-dim">
            Showing {matches.length === 0 ? 0 : start + 1} to {start + rows.length} of {matches.length} entries
          </p>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: pageCount }).map((_, index) => {
              const value = index + 1;
              const isActive = value === current;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setPage(value)}
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
              onClick={() => setPage((value) => Math.min(value + 1, pageCount))}
              disabled={current === pageCount}
              className="h-8 rounded-full border border-[rgba(215,175,92,0.24)] px-3.5 text-[10px] tracking-luxe-sm uppercase text-champagne-dim transition-colors hover:text-gold-200 disabled:opacity-35"
            >
              Next
            </button>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
