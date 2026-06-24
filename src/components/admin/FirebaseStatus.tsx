"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Badge from "@/components/ui/Badge";
import {
  isFirebaseConfigured,
  isFirebaseEmulator,
  getFirebaseDb,
} from "@/lib/firebase/config";
import { doc, getDoc } from "firebase/firestore";

type Status = "checking" | "connected" | "error" | "not-configured";

export default function FirebaseStatus() {
  const configured = isFirebaseConfigured();
  const emulator = isFirebaseEmulator();
  const db = configured ? getFirebaseDb() : null;

  const [status, setStatus] = useState<Status>(
    !configured ? "not-configured" : db ? "checking" : "error",
  );
  const [message, setMessage] = useState(
    !configured
      ? "Add Firebase credentials to .env.local"
      : !db
        ? "Firestore not initialized — restart dev server"
        : "Checking connection...",
  );

  useEffect(() => {
    if (!db) return;

    getDoc(doc(db, "_health", "ping"))
      .then(() => {
        setStatus("connected");
        setMessage(
          emulator
            ? "Connected to local emulators"
            : "Connected to Firebase cloud",
        );
      })
      .catch((err: Error) => {
        setStatus("error");
        setMessage(err.message);
      });
  }, [db, emulator]);

  const icons = {
    checking: <Loader2 className="h-4 w-4 animate-spin text-muted" />,
    connected: <CheckCircle2 className="h-4 w-4 text-success" />,
    error: <XCircle className="h-4 w-4 text-red-500" />,
    "not-configured": <XCircle className="h-4 w-4 text-orange-500" />,
  };

  const badgeVariant =
    status === "connected" ? "green" : status === "checking" ? "gray" : "blue";

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3">
      {icons[status]}
      <div className="flex-1">
        <p className="text-sm font-medium text-text">Firebase</p>
        <p className="text-xs text-muted">{message}</p>
      </div>
      <Badge variant={badgeVariant}>
        {status === "connected"
          ? emulator
            ? "Emulator"
            : "Live"
          : status}
      </Badge>
    </div>
  );
}
