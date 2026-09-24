import { motion } from "framer-motion";
import { useState } from "react";
import { Building2, Check, MapPin, Store } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import GoldButton from "../../components/GoldButton";
import { AdminSelect, AdminTextField } from "../../components/AdminField";
import { useToast } from "../../hooks/useToasts";
import { rise, stagger } from "../../lib/motion";
import { admin } from "../../data/mock";

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

const subscriberOptions = admin.subscribers.map((row) => ({ value: row.id, label: row.company }));

export default function StoreFormView() {
  const [subscriber, setSubscriber] = useState("");
  const [country, setCountry] = useState("India");
  const [pin, setPin] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const subscriberError = !subscriber ? "Choose the subscriber this store belongs to." : undefined;
  const contactError =
    contactNumber.replace(/\D/g, "").length !== 10 ? "A 10-digit contact number is required." : undefined;
  const ready = !subscriberError && !contactError;

  const submit = () => {
    setSubmitted(true);
    if (!ready) return;
    toast({ title: "Store added", detail: "Mock action for the demo" });
  };

  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col gap-4 lg:gap-6">
      <motion.div variants={rise}>
        <p className="text-[10.5px] tracking-luxe uppercase text-bronze">Stores</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-champagne lg:text-[38px]">
          Add a <span className="text-metal-shimmer">store</span>
        </h1>
        <p className="mt-2 text-[12px] text-champagne-dim">Add a new store to the network.</p>
      </motion.div>

      <motion.div variants={rise}>
        <GlassCard className="px-6 py-6" beamDelay={0}>
          <SectionHeading icon={<Building2 size={15} strokeWidth={1.6} />}>Subscriber</SectionHeading>

          <div className="lg:max-w-[460px]">
            <AdminSelect
              label="Subscriber"
              required
              value={subscriber}
              onChange={setSubscriber}
              options={subscriberOptions}
              placeholder="Select a subscriber"
              error={submitted ? subscriberError : undefined}
              hint={submitted && subscriberError ? undefined : "The store is listed under this subscriber."}
            />
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Location */}
        <GlassCard className="px-6 py-6" beamDelay={1.2}>
          <SectionHeading icon={<MapPin size={15} strokeWidth={1.6} />}>Location</SectionHeading>

          <div className="flex flex-col gap-5">
            <AdminTextField label="Country" value={country} onChange={setCountry} placeholder="Country" />
            <AdminTextField
              label="PIN"
              value={pin}
              onChange={(next) => setPin(next.replace(/\D/g, "").slice(0, 6))}
              placeholder="PIN"
              inputMode="numeric"
            />
            <AdminTextField
              label="Google Map Link"
              value={mapLink}
              onChange={setMapLink}
              placeholder="Location"
              inputMode="url"
            />
          </div>
        </GlassCard>

        {/* Contact and hours */}
        <GlassCard className="px-6 py-6" beamDelay={2.4}>
          <SectionHeading icon={<Store size={15} strokeWidth={1.6} />}>Store details</SectionHeading>

          <div className="flex flex-col gap-5">
            <AdminTextField
              label="Working Hours"
              value={workingHours}
              onChange={setWorkingHours}
              placeholder="Working hours"
            />
            <AdminTextField
              label="Contact Number"
              required
              value={contactNumber}
              onChange={(next) => setContactNumber(next.replace(/[^\d\s+]/g, ""))}
              placeholder="Contact number"
              inputMode="tel"
              maxLength={15}
              error={submitted ? contactError : undefined}
            />
            <AdminTextField
              label="Alternate Number"
              value={alternateNumber}
              onChange={(next) => setAlternateNumber(next.replace(/[^\d\s+]/g, ""))}
              placeholder="Alternate number"
              inputMode="tel"
              maxLength={15}
            />
          </div>
        </GlassCard>
      </div>

      <motion.div variants={rise} className="lg:ml-auto lg:w-[260px]">
        <GoldButton onClick={submit} icon={<Check size={15} strokeWidth={2.2} />}>
          Add
        </GoldButton>
      </motion.div>
    </motion.div>
  );
}
