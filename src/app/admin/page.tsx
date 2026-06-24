"use client";

import { useState } from "react";
import { Loader2, LogOut, Shield } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import FirebaseStatus from "@/components/admin/FirebaseStatus";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/firebase/AuthProvider";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export default function AdminPage() {
  const { user, loading, isAdmin } = useAuth();
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);

  async function handleSignIn() {
    setSigningIn(true);
    try {
      await signInWithGoogle();
    } catch {
      // User cancelled or error
    } finally {
      setSigningIn(false);
    }
  }

  if (!isFirebaseConfigured()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <SectionHeader
          title="Admin Panel"
          subtitle="Firebase is not configured. Add your credentials to .env.local to enable the admin panel."
          align="center"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-text">Admin Sign In</h1>
        <p className="mt-3 text-muted">
          Sign in with your admin Google account to manage laptops, deals, and
          reviews.
        </p>
        <Button
          size="lg"
          className="mt-8"
          onClick={handleSignIn}
          disabled={signingIn}
        >
          {signingIn ? "Signing in..." : "Sign in with Google"}
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text">Access Denied</h1>
        <p className="mt-3 text-muted">
          Your account ({user.email}) is not authorized as an admin.
        </p>
        <Button variant="secondary" className="mt-6" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="mb-8 flex items-center justify-between">
        <SectionHeader
          eyebrow="ADMIN"
          title="Dashboard"
          subtitle={`Signed in as ${user.email}`}
        />
        <Button variant="ghost" size="sm" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6">
        <FirebaseStatus />

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-text">
            Upload Laptop Image
          </h2>
          <ImageUpload
            laptopId="new-laptop"
            onUploadComplete={(url) => setUploadedUrl(url)}
            currentImage={uploadedUrl ?? undefined}
          />
          {uploadedUrl && (
            <p className="mt-4 break-all text-xs text-muted">
              URL: {uploadedUrl}
            </p>
          )}
        </Card>

        <Card>
          <h2 className="mb-2 text-lg font-semibold text-text">
            Firestore Collections
          </h2>
          <p className="text-sm text-muted">
            Manage laptops, deals, and reviews via Firebase Console or extend
            this panel with CRUD forms. Security rules are in{" "}
            <code className="rounded bg-surface px-1.5 py-0.5 text-xs dark:bg-surface/80">
              src/lib/firebase/firestore.rules
            </code>
            .
          </p>
        </Card>
      </div>
    </div>
  );
}
