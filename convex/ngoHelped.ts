import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("ngoHelped")
      .withIndex("by_order")
      .order("asc")
      .take(100);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    country: v.string(),
    flag: v.string(),
    cause: v.string(),
    tagline: v.string(),
    description: v.string(),
    helpedWith: v.string(),
    whoFor: v.string(),
    website: v.string(),
    codeLink: v.optional(v.string()),
    codeLabel: v.optional(v.string()),
    accentBg: v.string(),
    image: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ngoHelped", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("ngoHelped"),
    name: v.optional(v.string()),
    country: v.optional(v.string()),
    flag: v.optional(v.string()),
    cause: v.optional(v.string()),
    tagline: v.optional(v.string()),
    description: v.optional(v.string()),
    helpedWith: v.optional(v.string()),
    whoFor: v.optional(v.string()),
    website: v.optional(v.string()),
    codeLink: v.optional(v.string()),
    codeLabel: v.optional(v.string()),
    accentBg: v.optional(v.string()),
    image: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("ngoHelped") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});

export const seedNgoHelped = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("ngoHelped").take(1);
    if (existing.length > 0) {
      console.log("NGO helped already seeded — skipping.");
      return { skipped: true };
    }

    const ngos = [
      {
        name: "Pocket of Pink",
        country: "Malaysia",
        flag: "🇲🇾",
        cause: "Gender equality & youth",
        tagline: "Gender empowerment for young people through art and education.",
        description:
          "Founded by Ain Husniza after her viral campaign against school rape culture, Pocket of Pink uses art, advocacy, and Comprehensive Sexuality Education to empower youth and challenge harmful gender norms. We helped them ship their site in a day using AI.",
        helpedWith: "Website design and development",
        whoFor: "Youth and advocates across Malaysia",
        website: "https://www.pocketofpink.com",
        codeLink: "https://github.com/mfrashad/pocketofpink",
        accentBg: "#ffc0a1",
        order: 1,
      },
      {
        name: "ISTAID Center",
        country: "Indonesia",
        flag: "🇮🇩",
        cause: "Islamic education & da'wah",
        tagline: "30 years of Islamic education and outreach across Sumatera.",
        description:
          "Founded in 1993 in Medan, North Sumatra, ISTAID Center has spent over 30 years building generations of Muslim scholars through Quran memorization programs, youth camps, and a weekly bulletin distributed to 60+ mosques. We helped them bring their mission online.",
        helpedWith: "Website design and development",
        whoFor: "Muslim communities across Sumatera Utara and Aceh",
        website: "https://www.istaidcenter.com",
        codeLink: "https://github.com/mfrashad/istaid-website",
        accentBg: "#bbf7d0",
        order: 2,
      },
    ];

    for (const ngo of ngos) {
      await ctx.db.insert("ngoHelped", ngo);
    }

    console.log(`Seeded ${ngos.length} NGOs.`);
    return { seeded: ngos.length };
  },
});

/**
 * Second batch of NGOs we've helped ship — Jom Jelas, TitikLab (built at the
 * first KL meetup), and MYResearchGuide. Idempotent: skips any whose name
 * already exists, so it's safe to re-run on dev and prod.
 */
export const seedNgoHelpedBatch2 = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("ngoHelped").collect();
    const names = new Set(existing.map((n) => n.name));

    const ngos = [
      {
        name: "Jom Jelas",
        country: "Malaysia",
        flag: "🇲🇾",
        cause: "Civic media & youth democracy",
        tagline: "Making Malaysian politics legible for first-time voters.",
        description:
          "Jom Jelas is a youth-driven media and civic initiative built around one line — Negara Sedang Dibina, Kitalah Arkiteknya. It turns policy into conversation with explainers, interviews, and a GE16 youth manifesto young Malaysians can read, sign, and build on. We helped them ship the site in English and Bahasa Malaysia.",
        helpedWith: "Website design and development, bilingual build",
        whoFor: "Young Malaysians, especially first-time voters",
        website: "https://www.jomjelas.com/en",
        codeLink: "https://github.com/mfrashad/jomjelas",
        accentBg: "#6ff5b6",
        image: "/projects/jomjelas.webp",
        order: 3,
      },
      {
        name: "TitikLab",
        country: "Malaysia",
        flag: "🇲🇾",
        cause: "Cultural heritage & education",
        tagline: "Digitising the kulintangan rhythms of the Bajau of Semporna.",
        description:
          "Tagungguk is the traditional kulintangan music of the Bajau community in Semporna, Sabah — taught by ear and at risk of being lost. TitikLab documents the five core titik with tutorials, video, and open learning materials, working with researcher Cikgu Rosley and the music group Sulimbag Jawtee. Built from scratch in a single afternoon at our first KL meetup.",
        helpedWith: "Built at our first meetup — domain, site, and hosting in one day",
        whoFor: "Bajau youth in Sabah, students, and anyone learning Tagungguk",
        website: "https://www.titiklab.org",
        codeLink: "https://github.com/buildforpublic/titiklab",
        accentBg: "#ffc0a1",
        image: "/projects/titiklab.webp",
        order: 4,
      },
      {
        name: "MYResearchGuide",
        country: "Malaysia",
        flag: "🇲🇾",
        cause: "Science education & access",
        tagline: "A free guide to science research, by Malaysians for Malaysians.",
        description:
          "MYResearchGuide is a free, beginner-friendly platform helping Malaysian students start in science research — professor outreach, publication, and everything in between — built with Malaysian researchers around the world. We also helped ship MYSSP, its flagship 8-week mentorship programme pairing pre-university students with research mentors.",
        helpedWith: "Website development for MYResearchGuide and the MYSSP programme site",
        whoFor: "Malaysian students getting into science research",
        website: "https://www.myresearchguide.org",
        codeLink: "https://myssp.myresearchguide.org",
        codeLabel: "MYSSP 2026",
        accentBg: "#94e8ff",
        image: "/projects/myresearchguide.webp",
        order: 5,
      },
    ];

    let count = 0;
    for (const ngo of ngos) {
      if (names.has(ngo.name)) {
        console.log(`Skip existing: ${ngo.name}`);
        continue;
      }
      await ctx.db.insert("ngoHelped", ngo);
      count++;
    }

    console.log(`Seeded ${count} additional NGOs.`);
    return { seeded: count };
  },
});
