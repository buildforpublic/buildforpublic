"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import NGOCard from "@/app/components/ui/NGOCard";

export default function NGOHelpedSection() {
  const ngos = useQuery(api.ngoHelped.list);

  if (!ngos || ngos.length === 0) return null;

  // One badge per country, even when several NGOs share it.
  const flags = Array.from(
    new Map(ngos.map((n) => [n.country, `${n.flag} ${n.country}`])).values(),
  ).join(" · ");

  return (
    <div className="mt-16">
      <h2 className="heading-section mb-2">NGOs we&apos;ve helped ship.</h2>
      <p className="text-sm font-semibold mb-8" style={{ fontFamily: "var(--font-sans)" }}>
        {flags} — building for good across Southeast Asia.
      </p>
      <div className="grid sm:grid-cols-2 gap-8">
        {ngos.map((n) => (
          <NGOCard
            key={n._id}
            name={n.name}
            country={n.country}
            flag={n.flag}
            cause={n.cause}
            tagline={n.tagline}
            description={n.description}
            helpedWith={n.helpedWith}
            whoFor={n.whoFor}
            primaryLink={{ label: "Visit", href: n.website }}
            codeLink={n.codeLink ? { label: n.codeLabel ?? "Code", href: n.codeLink } : null}
            accentBg={n.accentBg}
            image={n.image}
          />
        ))}
      </div>
    </div>
  );
}
