import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/app/components/sections/Hero";
import TheMoment from "@/app/components/sections/TheMoment";
import TheSolution from "@/app/components/sections/TheSolution";
import WhoShowsUp from "@/app/components/sections/WhoShowsUp";
import WhatWeDo from "@/app/components/sections/WhatWeDo";
import WhatWeBelieve from "@/app/components/sections/WhatWeBelieve";
import Projects from "@/app/components/sections/Projects";
import WeLove from "@/app/components/sections/WeLove";
import Invitation from "@/app/components/sections/Invitation";
import Events from "@/app/components/sections/Events";
import MeetupRecap from "@/app/components/sections/MeetupRecap";
import LandingFooter from "@/app/components/sections/LandingFooter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Build for Public",
  description:
    "A digital-volunteering movement shipping tech for non-profits and the public good. We support changemakers and builders to ship public-interest tech together, starting in Southeast Asia.",
  alternates: { canonical: "https://buildforpublic.com" },
  openGraph: {
    title: "Build for Public",
    description: "A digital-volunteering movement shipping tech for non-profits and the public good.",
    url: "https://buildforpublic.com",
  },
};

export default function Home() {
  return (
    <main>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
      >
        Skip to content
      </a>
      <Navbar />
      <section id="main-content" className="pt-16">
        <Hero />
      </section>
      <TheMoment />
      <TheSolution />
      <WhoShowsUp />
      <Events />
      <MeetupRecap />
      <WhatWeDo />
      <WhatWeBelieve />
      <Projects />
      <WeLove />
      <Invitation />
      <LandingFooter />
    </main>
  );
}
