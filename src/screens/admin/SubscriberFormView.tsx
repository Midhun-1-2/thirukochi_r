import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Building2, CalendarClock, Check, Eye, EyeOff, LayoutGrid, User } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import GoldButton from "../../components/GoldButton";
import { AdminTextArea, AdminTextField, AdminToggle, FieldLabel, fieldStyle } from "../../components/AdminField";
import { useToast } from "../../hooks/useToasts";
import { rise, stagger } from "../../lib/motion";
import { admin } from "../../data/mock";

interface SubscriberFormViewProps {
  onBackToList: () => void;
}

/** Small gold-lettered heading that opens each block of the form. */
function SectionHeading({ icon, children }: { icon: React.ReactNode; children: string }) {
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <span aria-hidden className="text-gold-300">
        {icon}
      </span>
      <h2 className="font-display text-[17px] leading-none text-champagne">{children}</h2>
    </div>
  );
}

const emptyPermissions = Object.fromEntries(admin.permissions.map((item) => [item.key, false]));

export default function SubscriberFormView({ onBackToList }: SubscriberFormViewProps) {
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [mpin, setMpin] = useState("");
  const [showMpin, setShowMpin] = useState(false);
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [permissions, setPermissions] = useState<Record<string, boolean>>(emptyPermissions);
  const [companyName, setCompanyName] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [gst, setGst] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [logoName, setLogoName] = useState("");
  const [about, setAbout] = useState("");
  const [active, setActive] = useState(true);
  const [whatsapp, setWhatsapp] = useState(false);
  const [sms, setSms] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const errors = {
    firstName: firstName.trim().length < 2 ? "Enter the subscriber's first name." : undefined,
    phone: phone.replace(/\D/g, "").length !== 10 ? "A 10-digit mobile number is required." : undefined,
    mpin: mpin.length !== 4 ? "MPIN must be 4 digits." : undefined,
    startDate: !startDate ? "Choose a start date." : undefined,
    endDate: !endDate ? "Choose an end date." : undefined,
    companyName: companyName.trim().length < 2 ? "Enter the company name." : undefined,
  };
  const ready = !Object.values(errors).some(Boolean);

  const submit = () => {
    setSubmitted(true);
    if (!ready) return;
    toast({ title: `${companyName.trim()} created`, detail: "Mock action for the demo" });
    onBackToList();
  };

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col gap-4 lg:gap-6">
      <motion.div
        variants={rise}
        className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-4"
      >
        <div>
          <p className="text-[10.5px] tracking-luxe uppercase text-bronze">Subscribers</p>
          <h1 className="mt-2 font-display text-[28px] leading-tight text-champagne lg:text-[38px]">
            Add a <span className="text-metal-shimmer">subscriber</span>
          </h1>
          <p className="mt-2 text-[12px] text-champagne-dim">Add a new subscriber to the system.</p>
        </div>

        <button
          type="button"
          onClick={onBackToList}
          className="flex w-fit shrink-0 items-center gap-2 rounded-full border border-[rgba(215,175,92,0.3)] px-4 py-2 text-[10px] tracking-luxe-sm uppercase text-champagne-soft transition-colors hover:text-gold-200"
        >
          <ArrowLeft size={13} strokeWidth={1.8} />
          Back to list
        </button>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
        {/*
          Two independent columns rather than grid cells: the company block
          is far taller than the personal one, and in a two-column grid the
          row stretched to match it, leaving a hole under the short card.
        */}
        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Personal */}
          <GlassCard className="px-6 py-6" beamDelay={0}>
            <SectionHeading icon={<User size={15} strokeWidth={1.6} />}>Personal information</SectionHeading>

            <div className="flex flex-col gap-5">
              <AdminTextField
                label="First name"
                required
                value={firstName}
                onChange={setFirstName}
                placeholder="Enter first name"
                error={submitted ? errors.firstName : undefined}
              />
              <AdminTextField
                label="Phone number (for login)"
                required
                value={phone}
                onChange={(next) => setPhone(next.replace(/[^\d\s+]/g, ""))}
                placeholder="Enter phone number"
                inputMode="tel"
                maxLength={15}
                error={submitted ? errors.phone : undefined}
              />
              <AdminTextField
                label="MPIN"
                required
                value={mpin}
                onChange={(next) => setMpin(next.replace(/\D/g, "").slice(0, 4))}
                placeholder="Enter 4-digit MPIN"
                inputMode="numeric"
                type={showMpin ? "text" : "password"}
                hint="4-digit MPIN for authentication"
                error={submitted ? errors.mpin : undefined}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowMpin((current) => !current)}
                    aria-label={showMpin ? "Hide MPIN" : "Show MPIN"}
                    className="shrink-0 text-champagne-dim transition-colors hover:text-gold-200"
                  >
                    {showMpin ? <EyeOff size={15} strokeWidth={1.6} /> : <Eye size={15} strokeWidth={1.6} />}
                  </button>
                }
              />
              <AdminTextField
                label="Email"
                value={email}
                onChange={setEmail}
                placeholder="Enter email address"
                inputMode="email"
              />
            </div>
          </GlassCard>

          {/* Subscription */}
          <GlassCard className="px-6 py-6" beamDelay={2.6}>
            <SectionHeading icon={<CalendarClock size={15} strokeWidth={1.6} />}>Subscription details</SectionHeading>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <AdminTextField
                label="Subscription start date"
                required
                value={startDate}
                onChange={setStartDate}
                type="date"
                error={submitted ? errors.startDate : undefined}
              />
              <AdminTextField
                label="Subscription end date"
                required
                value={endDate}
                onChange={setEndDate}
                type="date"
                error={submitted ? errors.endDate : undefined}
              />
            </div>

            <div className="mt-7 flex flex-col gap-4">
              <FieldLabel>Status and alerts</FieldLabel>
              <AdminToggle checked={active} onChange={setActive} label="Active" />
              <AdminToggle checked={whatsapp} onChange={setWhatsapp} label="WhatsApp notifications" />
              <AdminToggle checked={sms} onChange={setSms} label="SMS notifications" />
            </div>
          </GlassCard>
        </div>

        <div className="flex flex-col gap-4 lg:gap-6">
          {/* Company */}
          <GlassCard className="px-6 py-6" beamDelay={1.4}>
            <SectionHeading icon={<Building2 size={15} strokeWidth={1.6} />}>Company information</SectionHeading>

            <div className="flex flex-col gap-5">
              <AdminTextField
                label="Company name"
                required
                value={companyName}
                onChange={setCompanyName}
                placeholder="Enter company name"
                error={submitted ? errors.companyName : undefined}
              />

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <AdminTextField
                  label="Founded year"
                  value={foundedYear}
                  onChange={(next) => setFoundedYear(next.replace(/\D/g, "").slice(0, 4))}
                  placeholder="YYYY"
                  inputMode="numeric"
                />
                <AdminTextField
                  label="GST number"
                  value={gst}
                  onChange={(next) => setGst(next.toUpperCase())}
                  placeholder="GST number"
                  maxLength={15}
                />
              </div>

              <AdminTextArea
                label="Company address"
                value={address}
                onChange={setAddress}
                placeholder="Company address"
              />

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <AdminTextField
                  label="Contact number"
                  value={contactNumber}
                  onChange={(next) => setContactNumber(next.replace(/[^\d\s+]/g, ""))}
                  placeholder="Contact number"
                  inputMode="tel"
                />
                <AdminTextField
                  label="Website"
                  value={website}
                  onChange={setWebsite}
                  placeholder="https://example.com"
                  inputMode="url"
                />
              </div>

              <div>
                <FieldLabel>Company logo</FieldLabel>
                <label
                  className="flex h-[54px] cursor-pointer items-center gap-3 rounded-2xl px-4"
                  style={fieldStyle}
                >
                  <span className="metal-gold rounded-full px-3.5 py-1.5 text-[10px] font-medium tracking-luxe-sm uppercase text-wine-950">
                    Choose file
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[12.5px] text-champagne-dim">
                    {logoName || "No file chosen"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    aria-label="Company logo"
                    onChange={(event) => setLogoName(event.target.files?.[0]?.name ?? "")}
                    className="sr-only"
                  />
                </label>
              </div>

              <AdminTextArea
                label="About company"
                value={about}
                onChange={setAbout}
                placeholder="About the company..."
                rows={4}
              />
            </div>
          </GlassCard>

          {/* Permissions */}
          <GlassCard className="px-6 py-6" beamDelay={3.8}>
            <SectionHeading icon={<LayoutGrid size={15} strokeWidth={1.6} />}>Application permissions</SectionHeading>

            <div className="flex flex-col gap-5">
              {admin.permissions.map((permission) => (
                <AdminToggle
                  key={permission.key}
                  checked={permissions[permission.key]}
                  onChange={(next) =>
                    setPermissions((current) => ({ ...current, [permission.key]: next }))
                  }
                  label={permission.label}
                  hint={permission.hint}
                />
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <motion.div
        variants={rise}
        className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-end"
      >
        <button
          type="button"
          onClick={onBackToList}
          className="glass rounded-2xl px-7 py-[18px] text-[13px] tracking-luxe-sm uppercase text-champagne transition-colors hover:text-gold-200 lg:order-1 lg:w-auto"
        >
          Cancel
        </button>
        <div className="lg:order-2 lg:w-[260px]">
          <GoldButton onClick={submit} icon={<Check size={15} strokeWidth={2.2} />}>
            Create subscriber
          </GoldButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
