export const MOCK_OTP = "123456";
export const OTP_LENGTH = 6;
export const MPIN_LENGTH = 4;
export const OTP_COUNTDOWN = 30;

export const goldRate = {
  quotedOn: "14/09/2026",
  unit: "1 gram",
  karat: "22K",
  price: 14125.0,
  change: -30,
  /** Normalised 0-1 samples driving the movement sparkline. */
  movement: [0.18, 0.22, 0.34, 0.3, 0.46, 0.58, 0.52, 0.64, 0.79, 0.86, 0.74, 0.68, 0.71],
  options: [
    { id: "1g22", label: "1g 22K", unit: "1 gram", karat: "22K", price: 14125.0, change: -30 },
    { id: "8g22", label: "8g 22K", unit: "8 grams", karat: "22K", price: 113000.0, change: -240 },
    { id: "1g18", label: "1g 18K", unit: "1 gram", karat: "18K", price: 11552.0, change: -24 },
  ],
  footnote: "Indicative demo rate · not for transactions",
};

export const referral = {
  code: "KOCHI24",
  headline: "Invite friends to Thirukochi",
  body: "Share your code with friends and family when they join Thirukochi. Referral benefits are as per store policy.",
  invited: 6,
  joined: 4,
  bonusEarned: 4800,
  bonusPending: 1200,
  history: [
    { name: "Arun Nair", status: "Joined", note: "Scheme started", amount: 1500, date: "12 Sep 2026" },
    { name: "Meera Raj", status: "Joined", note: "Scheme started", amount: 1500, date: "04 Sep 2026" },
    { name: "Vishnu P", status: "Joined", note: "First instalment", amount: 1200, date: "28 Aug 2026" },
    { name: "Anjali S", status: "Joined", note: "First instalment", amount: 600, date: "19 Aug 2026" },
    { name: "Rahul Menon", status: "Pending", note: "Awaiting first instalment", amount: 1200, date: "16 Sep 2026" },
  ],
};

export const promos = [
  {
    id: "bridal",
    eyebrow: "The Bridal Edit",
    title: "Celebrate Every Moment with Gold",
    body: "Heirloom craftsmanship for the days you will always remember.",
    action: "Explore Now",
  },
  {
    id: "temple",
    eyebrow: "Temple Heritage",
    title: "Kerala Craft, Carried Forward",
    body: "Hand-finished temple jewellery from our Kochi atelier.",
    action: "View Collection",
  },
  {
    id: "solitaire",
    eyebrow: "Diamond Circle",
    title: "Solitaires Chosen by Hand",
    body: "Certified stones, set the way our house has always set them.",
    action: "Book a Viewing",
  },
];

export const schemeCallout = {
  eyebrow: "Gold Schemes",
  title: "Begin your gold journey, one instalment at a time.",
  body: "Choose a scheme, set a monthly amount and watch your plan grow towards your next purchase.",
  action: "View schemes",
};

export const schemes = [
  { name: "Kanakadhara", tenure: "11 + 1 months", note: "One month's instalment gifted at maturity", minimum: 2500 },
  { name: "Swarna Nidhi", tenure: "18 months", note: "Rate protection on the day you book", minimum: 5000 },
  { name: "Diamond Circle", tenure: "24 months", note: "Priority access to solitaire collections", minimum: 10000 },
];

export const wallet = {
  goldGrams: 8.85,
  goldValue: 125000,
  scheme: { name: "Kanakadhara", paid: 5, total: 12, monthly: 10000 },
};

export const payments = {
  paidThisYear: 50000,
  nextDue: { amount: 10000, date: "01 Oct 2026", scheme: "Kanakadhara" },
  history: [
    { id: "TKG-2409", scheme: "Kanakadhara", amount: 10000, date: "01 Sep 2026", method: "UPI · HDFC", status: "Paid", grams: 0.708 },
    { id: "TKG-2388", scheme: "Kanakadhara", amount: 10000, date: "01 Aug 2026", method: "UPI · HDFC", status: "Paid", grams: 0.712 },
    { id: "TKG-2351", scheme: "Kanakadhara", amount: 10000, date: "01 Jul 2026", method: "Card · ICICI", status: "Paid", grams: 0.699 },
    { id: "TKG-2312", scheme: "Kanakadhara", amount: 10000, date: "01 Jun 2026", method: "UPI · HDFC", status: "Paid", grams: 0.723 },
    { id: "TKG-2276", scheme: "Kanakadhara", amount: 10000, date: "01 May 2026", method: "Netbanking · SBI", status: "Paid", grams: 0.731 },
  ],
};

export const notifications = [
  { title: "Instalment received", body: "₹10,000 credited to Kanakadhara", time: "2h ago" },
  { title: "Rate alert", body: "22K gold eased by ₹30 per gram", time: "Today" },
  { title: "Referral bonus", body: "₹1,500 added for Arun Nair", time: "Yesterday" },
];

export const joinScheme = {
  tenures: {
    Kanakadhara: "11 + 1 months",
    "Swarna Nidhi": "18 months",
    "Diamond Circle": "24 months",
  } as Record<string, string>,
  presets: [2500, 5000, 10000, 25000],
};

export const admin = {
  totalSubscribers: 19,
  totalStaffUnderSubscribers: 65,
  expiringSoon: [
    { id: "exp-1", name: "Ananthapuri Jewels", company: "Ananthapuri Jewels Pvt Ltd", phone: "98470 12345", date: "30 Sep", daysLeft: 7 },
    { id: "exp-2", name: "Malabar Gold Traders", company: "Malabar Gold Traders", phone: "97460 88213", date: "30 Sep", daysLeft: 7 },
    { id: "exp-3", name: "Fort Kochi Diamonds", company: "Fort Kochi Diamonds LLP", phone: "96330 55142", date: "30 Sep", daysLeft: 7 },
    { id: "exp-4", name: "Marine Drive Boutique", company: "Marine Drive Boutique", phone: "94470 21987", date: "02 Oct", daysLeft: 9 },
    { id: "exp-5", name: "Thrissur Pooram Jewels", company: "Thrissur Pooram Jewels", phone: "98950 66312", date: "02 Oct", daysLeft: 9 },
  ],
  subscribers: [
    { id: "SUB-01", name: "Ananthapuri Jewels", company: "Ananthapuri Jewels Pvt Ltd", contact: "98470 12345", email: "care@ananthapurijewels.in", startDate: "01 Oct 2025", subscription: "30 Sep 2026", status: "Active" as const, statusNote: "7 days left" },
    { id: "SUB-02", name: "Malabar Gold Traders", company: "Malabar Gold Traders", contact: "97460 88213", email: "accounts@malabargold.in", startDate: "01 Oct 2025", subscription: "30 Sep 2026", status: "Active" as const, statusNote: "7 days left" },
    { id: "SUB-03", name: "Fort Kochi Diamonds", company: "Fort Kochi Diamonds LLP", contact: "96330 55142", email: "", startDate: "01 Oct 2025", subscription: "30 Sep 2026", status: "Active" as const, statusNote: "7 days left" },
    { id: "SUB-04", name: "Marine Drive Boutique", company: "Marine Drive Boutique", contact: "94470 21987", email: "hello@marinedrive.co.in", startDate: "03 Oct 2025", subscription: "02 Oct 2026", status: "Active" as const, statusNote: "9 days left" },
    { id: "SUB-05", name: "Kanakadhara Associates", company: "Kanakadhara Associates", contact: "95260 44718", email: "", startDate: "31 Aug 2025", subscription: "30 Aug 2026", status: "Expired" as const, statusNote: "Expired" },
    { id: "SUB-06", name: "RainBow Ornaments", company: "RainBow Ornaments", contact: "99999 99999", email: "desk@rainbowornaments.in", startDate: "01 Jan 2026", subscription: "31 Dec 2026", status: "Active" as const, statusNote: "99 days left" },
    { id: "SUB-07", name: "Thrissur Pooram Jewels", company: "Thrissur Pooram Jewels", contact: "98950 66312", email: "info@pooramjewels.in", startDate: "03 Oct 2025", subscription: "02 Oct 2026", status: "Active" as const, statusNote: "9 days left" },
    { id: "SUB-08", name: "Vaduthala Silver House", company: "Vaduthala Silver House", contact: "94950 31207", email: "", startDate: "15 Nov 2025", subscription: "14 Nov 2026", status: "Active" as const, statusNote: "52 days left" },
    { id: "SUB-09", name: "Alleppey Heritage Gold", company: "Alleppey Heritage Gold", contact: "97440 82256", email: "books@alleppeyheritage.in", startDate: "20 Dec 2025", subscription: "19 Dec 2026", status: "Active" as const, statusNote: "87 days left" },
    { id: "SUB-10", name: "Kollam Temple Crafts", company: "Kollam Temple Crafts", contact: "90480 77451", email: "", startDate: "05 Jul 2025", subscription: "04 Jul 2026", status: "Expired" as const, statusNote: "Expired" },
    { id: "SUB-11", name: "Calicut Bridal Studio", company: "Calicut Bridal Studio", contact: "98460 11928", email: "bridal@calicutstudio.in", startDate: "18 Feb 2026", subscription: "17 Feb 2027", status: "Active" as const, statusNote: "147 days left" },
    { id: "SUB-12", name: "Broadway Bullion", company: "Broadway Bullion Pvt Ltd", contact: "95390 60084", email: "desk@broadwaybullion.in", startDate: "09 Mar 2026", subscription: "08 Mar 2027", status: "Active" as const, statusNote: "166 days left" },
  ],
  permissions: [
    { key: "project", label: "Project Management", hint: "Project tracking and management" },
    { key: "payroll", label: "Payroll", hint: "Employee payroll processing" },
    { key: "asset", label: "Asset Management", hint: "Company asset tracking" },
    { key: "accounts", label: "Accounts", hint: "Financial accounts management" },
    { key: "inventory", label: "Inventory Management", hint: "Stock and inventory tracking" },
  ],
};

/**
 * What a subscriber's own admin sees once they sign in: their leads, their
 * staff, the day's schedules and where the money sits.
 */
export const subscriberConsole = {
  company: "RainBow Ornaments",
  planDaysLeft: 99,
  pendingApprovals: 286,
  alerts: 29,
  stats: {
    totalLeads: { value: 41, pill: "+2", note: "This Month" },
    activeStaff: { value: 18, pill: "0", note: "On Leave Today" },
    todaySchedules: { value: 32, pill: "31", note: "Pending" },
    activeProjects: { value: 12, pill: "0", note: "Completed This Month" },
  },
  staffSchedules: [
    {
      id: "sch-1",
      staff: "Dhanya Menon",
      role: "Goldsmith",
      workLocation: "Marine Drive",
      customer: "Parvathy Nair",
      stage: "Stage 2",
      priority: "Medium" as const,
      scheduledOn: "Aug 17",
      service: "Bridal set polish",
      instruction: "Match the temple finish on the old pair",
      startedDate: "Sep 23",
      startedTime: "11:26 AM",
      elapsed: "0 minutes",
    },
    {
      id: "sch-2",
      staff: "Anakha A S",
      role: "Design desk",
      workLocation: "Workshop",
      customer: "Jacob Mathew",
      stage: "Stage 1",
      priority: "Medium" as const,
      scheduledOn: "Sep 11",
      service: "Tea break",
      instruction: "Resume the chain casting after",
      startedDate: "Sep 11",
      startedTime: "03:35 PM",
      elapsed: "1 week, 4 days",
    },
    {
      id: "sch-3",
      staff: "Ramesh T",
      role: "Valuation",
      workLocation: "Fort Kochi",
      customer: "Meenakshi G",
      stage: "Stage 2",
      priority: "High" as const,
      scheduledOn: "Aug 25",
      service: "Hallmark check",
      instruction: "Certificate copy to the customer",
      startedDate: "Aug 25",
      startedTime: "02:35 PM",
      elapsed: "4 weeks",
    },
    {
      id: "sch-4",
      staff: "Sreelakshmi P",
      role: "Sales",
      workLocation: "Marine Drive",
      customer: "Anil Kurian",
      stage: "Stage 3",
      priority: "Low" as const,
      scheduledOn: "Sep 19",
      service: "Scheme walkthrough",
      instruction: "Carry the 22K rate sheet",
      startedDate: "Sep 22",
      startedTime: "10:05 AM",
      elapsed: "1 day",
    },
  ],
  recentLeads: [
    { id: "lead-1", customer: "Krithika R", phone: "97563 36598", assignedStaff: "Lalu Varghese", stage: "Not Started", status: "Not Started" as const },
    { id: "lead-2", customer: "Sona Thomas", phone: "98413 65466", assignedStaff: "Sumi Joseph", stage: "Stage 3", status: "Pending" as const },
    { id: "lead-3", customer: "Balachandran K", phone: "75697 56975", assignedStaff: "Ammu Raj", stage: "Service", status: "Pending" as const },
    { id: "lead-4", customer: "Siva Prasad", phone: "66666 66667", assignedStaff: "Archana M", stage: "Service", status: "Pending" as const },
    { id: "lead-5", customer: "Yadhav Krishna", phone: "90807 06050", assignedStaff: "Archana M", stage: "Service", status: "Pending" as const },
    { id: "lead-6", customer: "Nithya Suresh", phone: "94470 21987", assignedStaff: "Lalu Varghese", stage: "Stage 1", status: "Completed" as const },
  ],
  overdueSchedules: [
    { id: "ovd-1", customer: "Monisha Pillai", scheduledOn: "Sep 18", staff: "Chithra N", staffRole: "Goldsmith", service: "Service 2", stage: "Stage 2", dueDate: "Sep 18, 2026", overdueBy: "5 days", priority: "High" as const, status: "Not Started" as const },
    { id: "ovd-2", customer: "Monisha Pillai", scheduledOn: "Sep 18", staff: "Chithra N", staffRole: "Goldsmith", service: "Service 2", stage: "Stage 2", dueDate: "Sep 18, 2026", overdueBy: "5 days", priority: "Medium" as const, status: "Not Started" as const },
    { id: "ovd-3", customer: "Rajesh Iyer", scheduledOn: "Sep 19", staff: "Badri S", staffRole: "Polishing", service: "Service 1", stage: "Stage 1", dueDate: "Sep 19, 2026", overdueBy: "4 days", priority: "Medium" as const, status: "Pending" as const },
    { id: "ovd-4", customer: "Fathima Rasheed", scheduledOn: "Sep 20", staff: "Anakha A S", staffRole: "Design desk", service: "Engraving", stage: "Stage 3", dueDate: "Sep 20, 2026", overdueBy: "3 days", priority: "Low" as const, status: "Pending" as const },
  ],
  financials: [
    { id: "fin-1", customer: "Joseph S Kuruvila", phone: "45124 51250", budget: 8525000, agreement: 1030000, billingValue: 1000, opening: 0, billed: 1000, discounts: "No discounts", due: 1029000 },
    { id: "fin-2", customer: "Siva Prasad", phone: "66666 66667", budget: 864000.75, agreement: 1017499.5, billingValue: 1730, opening: 0, billed: 1730, discounts: "No discounts", due: 1015769.5 },
    { id: "fin-3", customer: "Kalyani Menon", phone: "90807 06050", budget: 150000, agreement: 200000, billingValue: 0, opening: 0, billed: 0, discounts: "No discounts", due: 250000 },
    { id: "fin-4", customer: "Anil Kurian", phone: "94470 21987", budget: 189500, agreement: 263005, billingValue: 65205.82, opening: 0, billed: 65205.82, discounts: "No discounts", due: 197799.18 },
  ],
  financialTotals: {
    budget: 9728500.75,
    agreement: 2510504.5,
    billingValue: 67935.82,
    totalDue: 2555909.68,
  },
  dueNote:
    "Due amount is taken from the customer's outstanding value: agreement value minus billing value, plus or minus the opening balance (debit or credit). Open a customer to see the full breakdown.",
};

export const profile = {
  memberSince: "March 2026",
  kyc: "Verified",
  sections: [
    {
      title: "Account",
      items: [
        { key: "details", label: "Personal details", hint: "Name, address, KYC" },
        { key: "invoices", label: "Certificates & invoices", hint: "Download purchase records" },
      ],
    },
    {
      title: "Security",
      items: [
        { key: "mpin", label: "Change MPIN", hint: "Update your 4-digit vault PIN" },
        { key: "alerts", label: "Login alerts", hint: "Notify me on new sign-ins" },
      ],
    },
    {
      title: "Support",
      items: [
        { key: "help", label: "Help centre", hint: "Scheme and payment questions" },
        { key: "boutique", label: "Contact boutique", hint: "Marine Drive, Kochi" },
      ],
    },
  ],
};
