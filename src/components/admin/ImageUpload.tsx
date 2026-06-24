"use client";

import { useCallback, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Upload, X, ImageIcon } from "lucide-react";
import { storage, isFirebaseConfigured } from "@/lib/firebase/config";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

interface ImageUploadProps {
  laptopId: string;
  onUploadComplete: (url: string) => void;
  currentImage?: string;
}

export default function ImageUpload({
  laptopId,
  onUploadComplete,
  currentImage,
}: ImageUploadProps) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Only JPG, PNG, and WebP files are allowed.");
        return;
      }

      if (file.size > MAX_SIZE) {
        setError("File must be under 5MB.");
        return;
      }

      if (!isFirebaseConfigured() || !storage) {
        setError("Firebase Storage is not configured.");
        return;
      }

      setPreview(URL.createObjectURL(file));
      setUploading(true);
      setProgress(0);

      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const storageRef = ref(storage, `laptops/${laptopId}/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.round(pct));
        },
        (err) => {
          setError(err.message);
          setUploading(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          onUploadComplete(url);
          setUploading(false);
          setProgress(100);
        },
      );
    },
    [laptopId, onUploadComplete],
  );

  return (
    <div className="rounded-xl border border-dashed border-border bg-surface/50 p-6 dark:bg-surface/80">
      {preview ? (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Preview" className="h-full w-full object-contain p-4" />
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute right-2 top-2 rounded-full bg-card p-1.5 shadow-sm dark:bg-surface"
          >
            <X className="h-4 w-4 text-muted" />
          </button>
        </div>
      ) : (
        <div className="mb-4 flex aspect-video flex-col items-center justify-center rounded-lg bg-card">
          <ImageIcon className="h-10 w-10 text-muted/50" />
          <p className="mt-2 text-sm text-muted">No image uploaded</p>
        </div>
      )}

      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-border bg-card px-4 py-6 transition-colors hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10">
        <Upload className="h-5 w-5 text-primary" />
        <span className="text-sm font-medium text-text">
          {uploading ? `Uploading… ${progress}%` : "Choose image (JPG, PNG, WebP)"}
        </span>
        <span className="text-xs text-muted">Max 5MB</span>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </label>

      {uploading && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {!isFirebaseConfigured() && (
        <p className="mt-3 text-sm text-muted">
          Add Firebase credentials to <code className="text-xs">.env.local</code> to enable uploads.
        </p>
      )}
    </div>
  );
}
