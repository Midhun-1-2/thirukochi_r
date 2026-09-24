import { AnimatePresence, MotionConfig } from "framer-motion";
import { useState } from "react";
import AppShell from "./components/AppShell";
import RegistrationScreen from "./screens/RegistrationScreen";
import OtpScreen from "./screens/OtpScreen";
import MpinScreen from "./screens/MpinScreen";
import HomeScreen from "./screens/HomeScreen";
import SubscriberDashboardScreen from "./screens/SubscriberDashboardScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import type { Account, Role, Screen } from "./types";

const emptyAccount: Account = { name: "", phone: "" };

export default function App() {
  const [screen, setScreen] = useState<Screen>("registration");
  const [account, setAccount] = useState<Account>(emptyAccount);
  const [role, setRole] = useState<Role>("customer");

  const reset = () => {
    setScreen("registration");
    setAccount(emptyAccount);
    setRole("customer");
  };

  return (
    <MotionConfig reducedMotion="user">
      <AppShell onReset={reset}>
        {/* No `mode` here: screens overlap briefly so the logo can morph across them. */}
        <AnimatePresence initial={false}>
          {screen === "registration" && (
            <RegistrationScreen
              key="registration"
              onContinue={(next, nextRole) => {
                setAccount(next);
                setRole(nextRole);
                setScreen("otp");
              }}
            />
          )}

          {screen === "otp" && (
            <OtpScreen
              key="otp"
              phone={account.phone}
              onVerified={() => setScreen("mpin")}
              onBack={() => setScreen("registration")}
            />
          )}

          {screen === "mpin" && (
            <MpinScreen key="mpin" onComplete={() => setScreen(role === "customer" ? "home" : role)} />
          )}

          {screen === "home" && <HomeScreen key="home" name={account.name} phone={account.phone} onSignOut={reset} />}

          {screen === "subscriber" && (
            <SubscriberDashboardScreen
              key="subscriber"
              name={account.name}
              phone={account.phone}
              onSignOut={reset}
            />
          )}

          {screen === "admin" && (
            <AdminDashboardScreen key="admin" name={account.name} phone={account.phone} onSignOut={reset} />
          )}
        </AnimatePresence>
      </AppShell>
    </MotionConfig>
  );
}
