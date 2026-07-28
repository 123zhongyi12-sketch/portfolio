"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-dark-border">
      <div className="relative aspect-video bg-dark-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[current]}
          alt={`${title} - ${current + 1}`}
          className="h-full w-full object-contain"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-dark-bg/80 p-1.5 text-text-primary transition-colors hover:bg-dark-border"
              aria-label="上一张"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrent((p) => (p === images.length - 1 ? 0 : p + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-dark-bg/80 p-1.5 text-text-primary transition-colors hover:bg-dark-border"
              aria-label="下一张"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 border-t border-dark-border py-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === current ? "bg-accent" : "bg-dark-border"
              }`}
              aria-label={`图片 ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
