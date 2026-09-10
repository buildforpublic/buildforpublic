import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  volunteers: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    country: v.string(),
    city: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    portfolio: v.optional(v.string()),

    about: v.string(),
    motivation: v.string(),

    // Legacy generic roles (pre core-team positions). New applications use `positions`.
    roles: v.optional(
      v.array(
        v.union(
          v.literal("builder"),
          v.literal("advocate"),
          v.literal("organizer"),
        ),
      ),
    ),

    // Core-team positions (IDs from convex/positionsData.ts, validated in mutation)
    positions: v.optional(v.array(v.string())),
    positionAnswers: v.optional(
      v.array(
        v.object({
          positionId: v.string(),
          question: v.string(),
          answer: v.string(),
        }),
      ),
    ),
    github: v.optional(v.string()),
    hoursPerWeek: v.optional(v.string()),
    canCommit: v.optional(v.boolean()),

    // Recruitment pipeline
    recruitStatus: v.optional(
      v.union(
        v.literal("applied"),
        v.literal("shortlisted"),
        v.literal("invite_sent"),
        v.literal("interview_scheduled"),
        v.literal("interviewed"),
        v.literal("offered"),
        v.literal("accepted"),
        v.literal("declined"),
        v.literal("not_shortlisted"),
      ),
    ),
    shortlistedPositions: v.optional(v.array(v.string())),
    finalOffer: v.optional(v.string()),
    potential: v.optional(
      v.union(v.literal("low"), v.literal("moderate"), v.literal("high")),
    ),
    interviewer: v.optional(v.string()),
    interviewSlot: v.optional(v.string()),
    meetLink: v.optional(v.string()),
    inviteEmailSentAt: v.optional(v.number()),

    builderLevel: v.optional(v.string()),
    builderIdea: v.optional(
      v.union(
        v.literal("have"),
        v.literal("match"),
        v.literal("either"),
      ),
    ),
    builderProject: v.optional(v.string()),
    builderSkills: v.optional(v.array(v.string())),
    builderGithub: v.optional(v.string()),

    advocateFormats: v.optional(v.array(v.string())),
    advocateLanguages: v.optional(v.array(v.string())),
    advocateSamples: v.optional(v.string()),

    organizerMode: v.optional(
      v.union(
        v.literal("in-person"),
        v.literal("online"),
        v.literal("both"),
      ),
    ),
    organizerCity: v.optional(v.string()),
    organizerExperience: v.optional(v.string()),

    acknowledgesUnpaid: v.optional(v.boolean()),
    referralSource: v.optional(v.string()),
    notes: v.optional(v.string()),

    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("accepted"),
      v.literal("declined"),
    ),
    hidden: v.optional(v.boolean()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"]),

  opportunities: defineTable({
    kind: v.union(
      v.literal("ngo_request"),
      v.literal("project_idea"),
      v.literal("oss_project"),
      v.literal("community_project"),
    ),
    title: v.string(),
    summary: v.string(),
    description: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("published"),
      v.literal("archived"),
    ),
    tags: v.optional(v.array(v.string())),
    link: v.optional(v.string()),
    repoLink: v.optional(v.string()),
    accent: v.optional(
      v.union(
        v.literal("yellow"),
        v.literal("blue"),
        v.literal("mint"),
        v.literal("peach"),
        v.literal("purple"),
        v.literal("orange"),
      ),
    ),
    orgName: v.optional(v.string()),
    skillsNeeded: v.optional(v.array(v.string())),
    difficulty: v.optional(
      v.union(
        v.literal("beginner"),
        v.literal("intermediate"),
        v.literal("advanced"),
      ),
    ),
    featured: v.optional(v.boolean()),
    officialBFP: v.optional(v.boolean()),
    image: v.optional(v.string()),
    creator: v.optional(v.string()),
    stars: v.optional(v.number()),
    submitterName: v.optional(v.string()),
    submitterEmail: v.optional(v.string()),
    submitterRequestId: v.optional(v.string()),
  })
    .index("by_status", ["status"])
    .index("by_status_and_kind", ["status", "kind"]),

  members: defineTable({
    name: v.string(),
    email: v.string(),
    country: v.string(),
    city: v.optional(v.string()),
    bio: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    causes: v.optional(v.array(v.string())),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    twitter: v.optional(v.string()),
    instagram: v.optional(v.string()),
    isPublic: v.optional(v.boolean()),
    imageUrl: v.optional(v.string()),
    clerkId: v.optional(v.string()),
    currentStatus: v.optional(v.union(v.literal("student"), v.literal("working"))),
    university: v.optional(v.string()),
    company: v.optional(v.string()),
    position: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_public", ["isPublic"])
    .index("by_country", ["country"])
    .index("by_clerk_id", ["clerkId"]),

  projectRequests: defineTable({
    contactName: v.string(),
    contactEmail: v.string(),
    orgName: v.string(),
    orgWebsite: v.optional(v.string()),
    orgType: v.optional(
      v.union(
        v.literal("ngo"),
        v.literal("nonprofit"),
        v.literal("public-sector"),
        v.literal("community"),
        v.literal("other"),
      ),
    ),
    country: v.string(),
    problem: v.string(),
    whoItHelps: v.optional(v.string()),
    currentSolution: v.optional(v.string()),
    idealOutcome: v.optional(v.string()),
    timeline: v.optional(v.string()),
    budget: v.optional(v.string()),
    projectType: v.optional(
      v.union(
        v.literal("website"),
        v.literal("custom"),
        v.literal("other"),
      ),
    ),
    materialsLink: v.optional(v.string()),
    instagram: v.optional(v.string()),
    acknowledgesOpenSource: v.optional(v.boolean()),
    referralSource: v.optional(v.string()),
    notes: v.optional(v.string()),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("accepted"),
      v.literal("declined"),
    ),
    hidden: v.optional(v.boolean()),
  })
    .index("by_status", ["status"])
    .index("by_email", ["contactEmail"]),

  profiles: defineTable({
    clerkId: v.string(),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    github: v.optional(v.string()),
    instagram: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    twitter: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    causes: v.optional(v.array(v.string())),
  }).index("by_clerk_id", ["clerkId"]),

  eventRsvps: defineTable({
    eventSlug: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    clerkId: v.optional(v.string()),
  })
    .index("by_event", ["eventSlug"])
    .index("by_email_and_event", ["email", "eventSlug"]),

  // Admin key/value settings (e.g. invite email template, invite defaults)
  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),

  // Per-admin API keys for the outreach HTTP API (one per Clerk admin).
  apiKeys: defineTable({
    key: v.string(),
    clerkId: v.string(), // owner (identity.subject)
    label: v.optional(v.string()), // owner name/email for display
    active: v.boolean(),
    isOwner: v.optional(v.boolean()), // grants access to owner-only APIs (recruitment)
  })
    .index("by_key", ["key"])
    .index("by_clerkId", ["clerkId"])
    .index("by_active", ["active"]),

  // ── Venue outreach ───────────────────────────────────────────────────────
  // Cold-DM tracking for event venues (cafes, coworking/event spaces).
  venueOutreach: defineTable({
    name: v.string(),
    description: v.optional(v.string()), // blurb / why it's a good fit (agent-fillable)
    contactHandle: v.optional(v.string()), // generic contact (name / DM handle)
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    instagram: v.optional(v.string()), // IG profile (handle or URL)
    threads: v.optional(v.string()), // Threads profile (handle or URL)
    website: v.optional(v.string()),
    googleMaps: v.optional(v.string()), // Google Maps link or place name
    platform: v.optional(
      v.union(
        v.literal("instagram"),
        v.literal("threads"),
        v.literal("whatsapp"),
        v.literal("email"),
        v.literal("phone"),
        v.literal("facebook"),
        v.literal("other"),
      ),
    ),
    // Optional logistics / amenities
    wifi: v.optional(v.boolean()),
    plugs: v.optional(v.boolean()),
    projector: v.optional(v.boolean()),
    parking: v.optional(v.boolean()),
    tables: v.optional(v.boolean()),
    maxOccupant: v.optional(v.number()),
    message: v.optional(v.string()), // the message we sent
    eventName: v.optional(v.string()), // which event this venue is for
    status: v.union(
      v.literal("to_contact"),
      v.literal("dm_sent"),
      v.literal("responded"),
      v.literal("negotiating"),
      v.literal("secured"),
      v.literal("no_response"),
      v.literal("declined"),
    ),
    assignedTo: v.optional(v.string()), // collaborator handling this one
    notes: v.optional(v.string()),
    hidden: v.optional(v.boolean()),
  }).index("by_status", ["status"]),

  // ── Non-profit leads (catalog) ───────────────────────────────────────────
  // Imported from the openngo leads list (../openngo/data/leads.csv).
  // Read-only catalog you browse and select from; kept separate from outreach
  // state so re-importing never clobbers progress.
  nonprofitLeads: defineTable({
    leadKey: v.string(), // stable dedupe key (profile_urls | instagram | name)
    name: v.string(),
    websiteStatus: v.optional(v.string()), // none / social / free_builder / dead
    listedWebsite: v.optional(v.string()),
    location: v.optional(v.string()),
    instagram: v.optional(v.string()),
    facebook: v.optional(v.string()),
    twitter: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    tiktok: v.optional(v.string()),
    youtube: v.optional(v.string()),
    nSocials: v.optional(v.number()),
    sources: v.optional(v.string()),
    followers: v.optional(v.number()), // Instagram follower count (for ranking)
    cause: v.optional(v.string()), // primary cause/category
    importedAt: v.number(),
  })
    .index("by_leadKey", ["leadKey"])
    .index("by_followers", ["followers"]),

  // ── Non-profit outreach (state) ──────────────────────────────────────────
  // Created when a lead is selected for cold-DMing. Tracks platform, message,
  // status, and whether we got a requirement doc — collaboratively, so the
  // assignedTo field prevents two people DMing the same org.
  nonprofitOutreach: defineTable({
    leadKey: v.optional(v.string()), // FK to nonprofitLeads (omitted for manual adds)
    orgName: v.string(), // denormalized for display
    description: v.optional(v.string()),
    followers: v.optional(v.number()), // IG follower count, carried from the lead
    cause: v.optional(v.string()), // primary cause/category
    // Contact + presence (copied from the lead on add, editable after)
    instagram: v.optional(v.string()),
    facebook: v.optional(v.string()),
    twitter: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    tiktok: v.optional(v.string()),
    youtube: v.optional(v.string()),
    website: v.optional(v.string()),
    websiteStatus: v.optional(v.string()), // none / social / free_builder / dead
    location: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    platform: v.optional(
      v.union(
        v.literal("instagram"),
        v.literal("facebook"),
        v.literal("whatsapp"),
        v.literal("email"),
        v.literal("linkedin"),
        v.literal("twitter"),
        v.literal("other"),
      ),
    ),
    message: v.optional(v.string()),
    status: v.union(
      v.literal("to_contact"),
      v.literal("dm_sent"),
      v.literal("responded"),
      v.literal("in_discussion"),
      v.literal("requirement_received"),
      v.literal("secured"),
      v.literal("no_response"),
      v.literal("declined"),
    ),
    requirementDocLink: v.optional(v.string()), // link to the requirement doc, if received
    assignedTo: v.optional(v.string()),
    notes: v.optional(v.string()),
    hidden: v.optional(v.boolean()),
  })
    .index("by_status", ["status"])
    .index("by_leadKey", ["leadKey"]),

  // ── Committee / org structure ──────────────────────────────────────────────
  // Dynamic team roster that drives the public /about committee section. Each row
  // is a "slot": a filled member, an open role (with a volunteer CTA), or a
  // mystery placeholder (e.g. Finance kept under wraps). Managed from the admin
  // Committee tab; read publicly (non-hidden) by /about.
  committee: defineTable({
    department: v.string(), // Leadership | Events | Outreach | Content | Finance | Tech
    roleTitle: v.string(), // e.g. "Events Director", "Co-Director", "Officer"
    positionId: v.optional(v.string()), // optional link to positionsData id
    slotType: v.union(
      v.literal("filled"), // a real person — show their card
      v.literal("open"), // open role — show a "this could be you" CTA
      v.literal("mystery"), // intentionally hidden — show a teaser placeholder
    ),
    // Person (for filled slots)
    name: v.optional(v.string()),
    email: v.optional(v.string()), // used to pull the Clerk/Google photo; never exposed publicly
    bio: v.optional(v.string()),
    // Photo precedence on /about: uploaded → manual URL → Clerk/Google default.
    imageStorageId: v.optional(v.id("_storage")), // uploaded + cropped photo
    imageUrl: v.optional(v.string()), // explicit manual URL override
    clerkImageUrl: v.optional(v.string()), // cached Google/Clerk default (from sync)
    location: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    github: v.optional(v.string()),
    twitter: v.optional(v.string()),
    instagram: v.optional(v.string()),
    website: v.optional(v.string()),
    isFounder: v.optional(v.boolean()), // shows a "Founding team" badge
    // Open-slot CTA (defaults applied in the UI if unset)
    ctaLabel: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
    // Ordering: global asc; departments group in first-seen order.
    order: v.number(),
    hidden: v.optional(v.boolean()), // hide from /about (and mark in admin)
  }).index("by_order", ["order"]),

  ngoHelped: defineTable({
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
  }).index("by_order", ["order"]),
});
