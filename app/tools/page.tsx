"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MicroButton from "@/components/MicroButton";
import MicroCard from "@/components/MicroCard";
import HiddenSkeleton from "@/components/HiddenSkeleton";

const sceneLocations = [
  "A haunted DMV",
  "The world's saddest birthday party",
  "A submarine with a leak",
  "An escape room for babies",
  "A funeral for a pet rock",
  "A grocery store at 3am",
  "A time traveler's support group",
  "An elevator stuck between floors",
  "A yoga class in a prison",
  "A silent disco on a train",
];

const relationships = [
  "Divorced clowns",
  "Rival magicians",
  "Estranged father and robot son",
  "Ex-best friends at a reunion",
  "Boss and employee who are secretly twins",
  "Ghost and reluctant roommate",
  "Former superhero and their nemesis",
  "Two people who peaked in high school",
  "Long-lost pen pals",
  "Competitive neighbors",
];

const conflicts = [
  "One of them has a secret they can't reveal",
  "They both want the last piece of cake",
  "They're trapped together and need to escape",
  "One owes the other a huge favor",
  "They're competing for the same promotion",
  "One is hiding a supernatural ability",
  "They remember the past completely differently",
  "Neither wants to admit they were wrong",
  "One is leaving forever in 5 minutes",
  "They both think the other is an imposter",
];

const firstNames = [
  "Bartholomew",
  "Danger",
  "Cinnamon",
  "Professor",
  "Grandpa",
  "Tiny",
  "Sir",
  "Doctor",
  "Captain",
  "Chad",
  "Moonbeam",
  "Justice",
];

const lastNames = [
  "Thunderpants",
  "Skellington",
  "von Fluffernutter",
  "McScreamface",
  "Bonkowitz",
  "Spaghettiarms",
  "Mysterio Jr.",
  "O'Problemo",
  "Wafflestein",
  "Doomwhisper",
  "Bananagrabber",
  "Cactushead",
];

const improvPrompts = [
  "The scene takes place entirely in slow motion",
  "Everyone speaks in rhymes",
  "Emotions are the opposite of what they should be",
  "Someone has to incorporate a famous movie quote",
  "The scene must include an unexpected dance break",
  "Characters can only speak in questions",
  "There's an invisible third character everyone reacts to",
  "The stakes keep escalating every 30 seconds",
  "Someone discovers a mysterious object",
  "One character knows something the others don't",
  "The scene is a musical now",
  "Everyone is allergic to a common word",
];

const wordAssociationStarters = [
  "Banana",
  "Thunder",
  "Whisper",
  "Castle",
  "Pickle",
  "Dragon",
  "Pancake",
  "Mystery",
  "Tornado",
  "Penguin",
  "Lasagna",
  "Spaceship",
];

const writingTools = [
  {
    id: "joterie",
    name: "Joterie",
    tagline: "Think Fast",
    description: "Rapid brainstorming with timed sprints. Capture raw ideas before they escape, then curate the best ones.",
    features: ["Timed Sprints", "Curation", "Archives"],
    href: "/writing-tools/Joterie.html",
    color: "#fae84f",
    icon: "⚡",
  },
  {
    id: "synax",
    name: "Synax",
    tagline: "Creative Engine",
    description: "AI-powered prompt generation. Discover unexpected word combinations to spark new creative directions.",
    features: ["Random Prompts", "Rhyme Finder", "Context Mode"],
    href: "/writing-tools/Synax.html",
    color: "#da70d6",
    icon: "✨",
  },
  {
    id: "beathive",
    name: "BeatHive",
    tagline: "Story Architect",
    description: "Map your narrative on an infinite hexagonal canvas. Visualize story beats and their connections.",
    features: ["Hex Canvas", "Beat Types", "Cloud Sync"],
    href: "/writing-tools/BeatHive.html",
    color: "#fd19c8",
    icon: "⬡",
  },
  {
    id: "wribbon",
    name: "Wribbon",
    tagline: "Flow State Writing",
    description: "Minimalist, distraction-free drafting. Zen mode hides the UI while you write, keeping focus on the words.",
    features: ["Zen Mode", "Word Goals", "Timer"],
    href: "/writing-tools/Wribbon.html",
    color: "#fd19c8",
    icon: "✎",
  },
  {
    id: "courius",
    name: "Courius",
    tagline: "Screenwriter",
    description: "Professional screenplay formatting. Industry-standard elements with automatic styling and FDX export.",
    features: ["FDX Export", "Auto Format", "Title Pages"],
    href: "/writing-tools/Courius.html",
    color: "#fae84f",
    icon: "🎬",
  },
  {
    id: "flowstate",
    name: "FlowState",
    tagline: "Writing Game",
    description: "Gamified writing sessions with flow mechanics. Build combos, earn sparks, and maintain your writing momentum.",
    features: ["Flow Meter", "Combos", "Sparks"],
    href: "/writing-tools/FlowState.html",
    color: "#fd19c8",
    icon: "🔥",
  },
  {
    id: "withernaught",
    name: "WitherNaught",
    tagline: "Cultivate Your Mind",
    description: "A gamified writing garden where your words bloom into a living ecosystem. Keep writing or watch your garden freeze.",
    features: ["Frost System", "Zone Progression", "Ambient Audio"],
    href: "/writing-tools/WitherNaught.html",
    color: "#da70d6",
    icon: "🌱",
  },
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function ToolsPage() {
  const [scene, setScene] = useState<{
    location: string;
    relationship: string;
    conflict: string;
  } | null>(null);
  const [characterName, setCharacterName] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [word, setWord] = useState<string | null>(null);

  const generateScene = () => {
    setScene({
      location: randomItem(sceneLocations),
      relationship: randomItem(relationships),
      conflict: randomItem(conflicts),
    });
  };

  const generateName = () => {
    setCharacterName(`${randomItem(firstNames)} ${randomItem(lastNames)}`);
  };

  const generatePrompt = () => {
    setPrompt(randomItem(improvPrompts));
  };

  const generateWord = () => {
    setWord(randomItem(wordAssociationStarters));
  };

  const cards = [
    {
      id: "scene",
      title: "Scene Generator",
      description: "Generate random scene elements for improv or sketch writing.",
      buttonText: "Generate Scene",
      onClick: generateScene,
      content: scene && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-3"
        >
          <p>
            <span className="font-semibold text-yellow">Location:</span>{" "}
            {scene.location}
          </p>
          <p>
            <span className="font-semibold text-yellow">Relationship:</span>{" "}
            {scene.relationship}
          </p>
          <p>
            <span className="font-semibold text-yellow">Conflict:</span>{" "}
            {scene.conflict}
          </p>
        </motion.div>
      ),
      hasSkeleton: true,
    },
    {
      id: "name",
      title: "Character Name Generator",
      description: "Create absurd character names for your sketches.",
      buttonText: "Generate Name",
      onClick: generateName,
      content: characterName && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6"
        >
          <p className="text-2xl font-bold text-yellow">{characterName}</p>
        </motion.div>
      ),
    },
    {
      id: "prompt",
      title: "Prompt Spinner",
      description: "Get random improv prompts and suggestions.",
      buttonText: "Spin Prompt",
      onClick: generatePrompt,
      content: prompt && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-6"
        >
          <p className="text-lg text-pink font-semibold">{prompt}</p>
        </motion.div>
      ),
    },
    {
      id: "word",
      title: "Word Association",
      description: "Quick-fire word game - say the first thing that comes to mind!",
      buttonText: "New Word",
      onClick: generateWord,
      content: word && (
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          className="mt-6"
        >
          <p className="text-3xl font-bold text-yellow">{word}</p>
        </motion.div>
      ),
    },
  ];

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-5xl font-bold tracking-tight"
      >
        Comedy Tools
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12 text-lg text-foreground/70"
      >
        Interactive generators to spark creativity for your improv and sketch writing.
      </motion.p>

      <div className="grid gap-8 md:grid-cols-2">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <MicroCard className="p-6 relative">
              <h2 className="text-2xl font-bold mb-4">{card.title}</h2>
              <p className="text-foreground/70 mb-4">{card.description}</p>
              <MicroButton onClick={card.onClick}>{card.buttonText}</MicroButton>
              {card.content}
              {/* Hidden Skeleton #8 - Behind the Scene Generator card */}
              {card.hasSkeleton && (
                <HiddenSkeleton id={8} className="absolute top-2 right-2" size={14} />
              )}
            </MicroCard>
          </motion.div>
        ))}
      </div>

      {/* Writing Tools Section */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 mb-4 text-4xl font-bold tracking-tight"
      >
        Writing Tools
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mb-12 text-lg text-foreground/70"
      >
        A complete writer&apos;s toolkit for brainstorming, structuring, drafting, and formatting your creative work.
      </motion.p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {writingTools.map((tool, index) => (
          <motion.a
            key={tool.id}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="block"
          >
            <MicroCard className="p-6 h-full hover:border-pink transition-colors">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white text-xl"
                style={{ backgroundColor: tool.color }}
              >
                {tool.icon}
              </div>
              <h3 className="text-2xl font-bold mb-1">{tool.name}</h3>
              <p className="text-pink italic mb-3">{tool.tagline}</p>
              <p className="text-foreground/70 mb-4">{tool.description}</p>
              <div className="flex flex-wrap gap-2">
                {tool.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-foreground/10 text-foreground/60"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </MicroCard>
          </motion.a>
        ))}
      </div>
    </main>
  );
}
