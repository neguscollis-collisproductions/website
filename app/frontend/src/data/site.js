export const BRAND = "Lumen & Frame";

export const IMAGES = {
  hero: "/images/AlyssaGrad2.jpg",
  manifesto: "/images/AlyssaGrad1.jpg",
  editorial2: "/images/sports1.jpg",
  editorial3: "/images/retirement1.jpg",
};

export const CATEGORIES = [
  {
    id: "family",
    title: "Family & Portrait",
    blurb: "Heirloom portraiture for the people you cannot imagine life without.",
    packages: [
      { name: "Mini Sessions", price: "$350", duration: "30 Mins", deliverables: "15 Edited High-Res Stills • 1 Location • Online Gallery", popular: false },
      { name: "Full Sessions", price: "$650", duration: "90 Mins", deliverables: "40 Edited High-Res Stills • 2 Locations • Wardrobe Styling Guide", popular: true },
      { name: "Legacy Session", price: "$1,200", duration: "Half-Day", deliverables: "80+ Edited Stills • Full Family Documentary • 10x10 Signature Linen Print Album", popular: false },
    ],
  },
  {
    id: "sports",
    title: "Sports & Athletes",
    blurb: "High-velocity cinematics — sweat, grit, and the fraction of a second that matters.",
    packages: [
      { name: "Athlete Portrait", price: "$450", duration: "45 Mins Studio", deliverables: "20 Dramatic Composite Stills • Custom Lighting • High-Key & Darkroom Styles", popular: false },
      { name: "Game Day Coverage", price: "$850", duration: "Full Game / Event", deliverables: "100+ Live Action Shots • Highlights Gallery • Personal Usage License", popular: true },
      { name: "Team Package", price: "$1,600", duration: "Full Day Squad", deliverables: "Roster Action Shots • Team Poster Composite • High-Res Digital Master Drive", popular: false },
    ],
  },
  {
    id: "events",
    title: "Grad, Engagement & Events",
    blurb: "Milestones deserve more than a phone snapshot. We document the day as it felt.",
    packages: [
      { name: "Milestone Session", price: "$500", duration: "60 Mins", deliverables: "25 Senior/Grad Edited Stills • 2 Outfit Changes • Print Release", popular: false },
      { name: "Small Event Coverage", price: "$1,100", duration: "4 Hours", deliverables: "Comprehensive Event Story • Live Preview • Digital Downloads & Print Rights", popular: true },
      { name: "All-Day Package", price: "$2,400", duration: "Up to 8 Hours", deliverables: "Full Micro-Wedding/Engagement • 2nd Camera Operator • Fine Art Boxed Prints", popular: false },
    ],
  },
];

export const CHAPTERS = [
  { number: "01", title: "Vision & Light", text: "We do not merely take photographs; we translate ambient light into lasting visceral artifacts.", image: "manifesto" },
  { number: "02", title: "Authentic Emotion", text: "Stripping away forced poses to unearth the raw, unfiltered truth of human connection.", image: "editorial2" },
  { number: "03", title: "Timeless Craft", text: "Combining high-resolution medium format precision with darkroom-inspired color chemistry.", image: "editorial3" },
  { number: "04", title: "Uncompromising Detail", text: "From micro-expressions on game day to quiet heirloom family sessions, every frame is curated.", image: "hero" },
];

export const MARQUEE_TEXT =
  "FAMILY & PORTRAIT SESSIONS — ATHLETE CINEMATICS — MILESTONE & GRADUATION COVERAGE — FINE ART PRINTS — LUMEN & FRAME STUDIO — ";

export const GALLERY = [
  { id: "g1", category: "family", src: "https://images.unsplash.com/photo-1658515036355-4a25a6311e1f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHw0fHxmYW1pbHklMjBwb3J0cmFpdCUyMHNlc3Npb24lMjBvdXRkb29yJTIwY2luZW1hdGljJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "Golden Hour, Together", exif: { camera: "GFX 100 II", aperture: "f/2.0", iso: "ISO 200", focal: "63mm" } },
  { id: "g2", category: "sports", src: "/images/sport1.jpg", title: "Run With A Smile", exif: { camera: "Sony ILCE-7M3", aperture: "f/4.9709", iso: "ISO 125", focal: "250 mm" } },
  { id: "g3", category: "events", src: "https://images.unsplash.com/photo-1629751450989-c3aa81267f7a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w8NjA1NzB8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZW5nYWdlbWVudCUyMG1pbGVzdG9uZSUyMGV2ZW50JTIwY2VsZWJyYXRlJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "Vows at Dusk", exif: { camera: "Canon R5", aperture: "f/1.8", iso: "ISO 400", focal: "50mm" } },
  { id: "g4", category: "family", src: "https://images.unsplash.com/photo-1779497055954-7ad47ee23287?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxmYW1pbHklMjBwb3J0cmFpdCUyMHNlc3Npb24lMjBvdXRkb29yJTIwY2luZW1hdGljJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "Sunday Light", exif: { camera: "GFX 100 II", aperture: "f/2.8", iso: "ISO 100", focal: "110mm" } },
  { id: "g5", category: "sports", src: "/images/sport2.jpg", title: "Ready For The Game", exif: { camera: "Sony ILCE-7M3", aperture: "f/5.3107", iso: "ISO 320", focal: "335 mm" } },
  { id: "g6", category: "events", src: "https://images.unsplash.com/photo-1647730346059-c7c75506451e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w8NjA1NzB8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwZW5nYWdlbWVudCUyMG1pbGVzdG9uZSUyMGV2ZW50JTIwY2VsZWJyYXRlJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "The Promise", exif: { camera: "Canon R5", aperture: "f/2.0", iso: "ISO 640", focal: "85mm" } },
  { id: "g7", category: "family", src: "https://images.unsplash.com/photo-1769614351494-5f7d3d6036bf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBwb3J0cmFpdCUyMHNlc3Npb24lMjBvdXRkb29yJTIwY2luZW1hdGljJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "Three Generations", exif: { camera: "Nikon Z9", aperture: "f/4", iso: "ISO 200", focal: "70mm" } },
  { id: "g8", category: "sports", src: "/images/sport3.jpg", title: "Eye Of The Tiger", exif: { camera: "Sony ILCE-7M3", aperture: "f/5.3107", iso: "ISO 500", focal: "600 mm" } },
  { id: "g9", category: "events", src: "https://images.unsplash.com/photo-1604700268022-d9018a9d7108?crop=entropy&cs=srgb&fm=jpg&ixid=M3w8NjA1NzB8MHwxfHNlYXJjaHwzfHx3ZWRkaW5nJTIwZW5nYWdlbWVudCUyMG1pbGVzdG9uZSUyMGV2ZW50JTIwY2VsZWJyYXRlJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "Confetti Hour", exif: { camera: "Canon R6 II", aperture: "f/2.8", iso: "ISO 800", focal: "35mm" } },
  { id: "g10", category: "family", src: "https://images.unsplash.com/photo-1772800391250-1f29de7848b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxmYW1pbHklMjBwb3J0cmFpdCUyMHNlc3Npb24lMjBvdXRkb29yJTIwY2luZW1hdGljJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "Field Notes", exif: { camera: "GFX 100 II", aperture: "f/2.2", iso: "ISO 125", focal: "63mm" } },
  { id: "g11", category: "sports", src: "/images/sport4.jpg", title: "Gridiron Gauntlet", exif: { camera: "Sony ILCE-7M3", aperture: "f/5.3107", iso: "ISO 320", focal: "388 mm" } },
  { id: "g12", category: "events", src: "/images/event1.JPG", title: "Graduation", exif: { camera: "Canon R5", aperture: "f/1.8", iso: "ISO 1250", focal: "50mm" } },
  { id: "g13", category: "sports", src: "/images/sport5.jpg", title: "Batters Up", exif: { camera: "Sony ILCE-7M3", aperture: "f/5.3107", iso: "ISO 200", focal: "374 mm" } },
  { id: "g14", category: "events", src: "https://images.unsplash.com/photo-1625321482369-632c60583b60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w8NjA1NzB8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwZW5nYWdlbWVudCUyMG1pbGVzdG9uZSUyMGV2ZW50JTIwY2VsZWJyYXRlJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "First Dance", exif: { camera: "Canon R5", aperture: "f/1.8", iso: "ISO 1250", focal: "50mm" } },
  { id: "g15", category: "sports", src: "/images/sport6.jpg", title: "Run To First Base", exif: { camera: "Sony ILCE-7M3", aperture: "f/5.3107", iso: "ISO 100", focal: "200 mm" } },
  { id: "g16", category: "events", src: "https://images.unsplash.com/photo-1625321482369-632c60583b60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w8NjA1NzB8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwZW5nYWdlbWVudCUyMG1pbGVzdG9uZSUyMGV2ZW50JTIwY2VsZWJyYXRlJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "First Dance", exif: { camera: "Canon R5", aperture: "f/1.8", iso: "ISO 1250", focal: "50mm" } },
  { id: "g17", category: "sports", src: "/images/sport8.jpg", title: "Free Throw Line", exif: { camera: "Sony ILCE-7M3", aperture: "f/4.9709", iso: "ISO 6400", focal: "200 mm" } },
  { id: "g16", category: "events", src: "https://images.unsplash.com/photo-1625321482369-632c60583b60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w8NjA1NzB8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwZW5nYWdlbWVudCUyMG1pbGVzdG9uZSUyMGV2ZW50JTIwY2VsZWJyYXRlJTIwcGhvdG9ncmFwaHl8ZW58MHx8fHwxNzg4OTA0MzM2fDA&ixlib=rb-4.1.0&q=85", title: "First Dance", exif: { camera: "Canon R5", aperture: "f/1.8", iso: "ISO 1250", focal: "50mm" } },
  { id: "g16", category: "sports", src: "/images/sport9.jpg", title: "Can't Touch This", exif: { camera: "Canon R5", aperture: "f/1.8", iso: "ISO 1250", focal: "50mm" } },
];

export const GALLERY_FILTERS = [
  { id: "all", label: "All Work" },
  { id: "family", label: "Family & Portrait" },
  { id: "sports", label: "Sports & Athletes" },
  { id: "events", label: "Grad & Events" },
];
