import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";
import { ProgressiveBlur } from "@/components/progressive-blur";

function ShowcaseCard({ title, image }: { title: string, image: string }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className="relative aspect-50/71 overflow-hidden rounded-lg bg-[#33333d] p-1.5 inset-shadow-[0_1px_theme(--color-white/20%)]"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-md object-cover"
      />
      <ProgressiveBlur
        className="pointer-events-none absolute bottom-1.5 left-1.5 h-[75%] w-[calc(100%-12px)] rounded-md"
        blurIntensity={0.75}
        animate={isHover ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        blurLayers={4}
      />
      <motion.div
        className="absolute bottom-0 left-0"
        animate={isHover ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
          <p className="text-sm font-medium text-primary-foreground p-5">{title}</p>
      </motion.div>
    </div>
  );
}

export function Showcase() {
  return (
      <main className="flex w-full flex-col mx-auto max-w-2xl items-start gap-8 px-4 py-20">
      <Link to="/" className="flex items-center text-sm text-muted-foreground gap-1">
        <HugeiconsIcon icon={ArrowLeft02Icon} className="size-4" /> Go Back Home
      </Link>
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h1>Showcase</h1>
        </div>
        <p>Examples of invoices built with React Invoice.</p>
      </section>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      </section>
    </main>
  );
}
