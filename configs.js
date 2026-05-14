// Demo child profiles. In the real platform these come from the admin panel + DB.
// Each profile is the GAME CONFIG that personalizes the shared game templates.
window.KIDSBRAIN_PROFILES = {
  emma: {
    child_name: "Emma",
    age: 7,
    theme: "Dinosaurs",
    tagline: "Roar! Find the matching fossils.",
    colors: {
      primary: "#2D8B4E",
      secondary: "#F4A623",
      background: "#FFF8E7",
      card: "#FFFFFF",
      text: "#1F3A24",
    },
    memory_cards: [
      { name: "T-Rex", emoji: "🦖" },
      { name: "Triceratops", emoji: "🦕" },
      { name: "Volcano", emoji: "🌋" },
      { name: "Fossil", emoji: "🦴" },
      { name: "Egg", emoji: "🥚" },
      { name: "Footprint", emoji: "🐾" },
      { name: "Palm", emoji: "🌴" },
      { name: "Meteor", emoji: "☄️" },
    ],
  },
  liam: {
    child_name: "Liam",
    age: 6,
    theme: "Space",
    tagline: "Blast off and match the stars!",
    colors: {
      primary: "#6C5CE7",
      secondary: "#FFD166",
      background: "#0B1026",
      card: "#1B2148",
      text: "#F1F4FF",
    },
    memory_cards: [
      { name: "Rocket", emoji: "🚀" },
      { name: "Planet", emoji: "🪐" },
      { name: "Star", emoji: "⭐" },
      { name: "Astronaut", emoji: "👨‍🚀" },
      { name: "UFO", emoji: "🛸" },
      { name: "Moon", emoji: "🌙" },
      { name: "Comet", emoji: "☄️" },
      { name: "Satellite", emoji: "🛰️" },
    ],
  },
  maya: {
    child_name: "Maya",
    age: 8,
    theme: "Ocean",
    tagline: "Dive in and find the pairs!",
    colors: {
      primary: "#0EA5E9",
      secondary: "#F472B6",
      background: "#E0F2FE",
      card: "#FFFFFF",
      text: "#0C4A6E",
    },
    memory_cards: [
      { name: "Dolphin", emoji: "🐬" },
      { name: "Shark", emoji: "🦈" },
      { name: "Octopus", emoji: "🐙" },
      { name: "Whale", emoji: "🐳" },
      { name: "Crab", emoji: "🦀" },
      { name: "Fish", emoji: "🐠" },
      { name: "Turtle", emoji: "🐢" },
      { name: "Coral", emoji: "🪸" },
    ],
  },
};

window.KIDSBRAIN_DIFFICULTY = {
  easy: { pairs: 4, label: "Easy" },
  medium: { pairs: 6, label: "Medium" },
  hard: { pairs: 8, label: "Hard" },
};
