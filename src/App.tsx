import React, { useState, useEffect } from 'react';
import './App.css';

import bg1 from '../BG1.jpg';
import bg2 from '../BG2.jpg';
import bg3 from '../BG3.jpg';
import bg4 from '../BG4.jpg';
import bg5 from '../BG5.jpg';

import telebirrLogo from './assets/payment/telebirr-logo.png';
import cbeLogo from './assets/payment/cbe-logo.png';
import abyssiniaLogo from './assets/payment/abyssinia-logo.png';

// Payment QR codes — used inside the checkout Payment Modal
import telebirrQr from './assets/telebirr-qr.png';
import cbeQr from './assets/cbe-qr.png';
import abyssiniaQr from './assets/abyssinia-qr.png';

// Full-bleed background images for the "Our Story" and "How It Works"
// footer pages.
import ourStoryBg from './assets/ourstory.jpg';
import howItWorksBg from './assets/howitworks.jpg';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  images?: string[];
  description?: string;
}

interface Review {
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Elegant Traditional Habesha Kemis",
    category: "Cultural Clothes & Crafts",
    price: 17500,
    rating: 5,
    image: "Cultural Clothes & Crafts/C1.jpg"
  },
  {
    id: 2,
    name: "Modern Embroidered Habesha Dress",
    category: "Cultural Clothes & Crafts",
    price: 15000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C2.jpg"
  },
  {
    id: 3,
    name: "Royal Bridal Habesha Kemis",
    category: "Cultural Clothes & Crafts",
    price: 20000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C3.jpg"
  },
  {
    id: 4,
    name: "Men's Modern Cultural Shirt",
    category: "Cultural Clothes & Crafts",
    price: 4000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C4.jpg"
  },
  {
    id: 5,
    name: "Traditional Ethiopian Couple Attire",
    category: "Cultural Clothes & Crafts",
    price: 35000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C5.jpg"
  },
  {
    id: 6,
    name: "Traditional Wooden Krar Instrument",
    category: "Cultural Clothes & Crafts",
    price: 4500,
    rating: 5,
    image: "Cultural Clothes & Crafts/C6.jpg"
  },
  {
    id: 7,
    name: "Authentic Cultural Moseb & Crafts Set",
    category: "Cultural Clothes & Crafts",
    price: 3500,
    rating: 5,
    image: "Cultural Clothes & Crafts/C7.jpg"
  },
  {
    id: 8,
    name: "Modern Short Habesha Dress",
    category: "Cultural Clothes & Crafts",
    price: 12000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C8.jpg"
  },
  {
    id: 9,
    name: "Premium Wedding Couple Set",
    category: "Cultural Clothes & Crafts",
    price: 18000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C9.jpg"
  },
  {
    id: 10,
    name: "Classic White Habesha Kemis",
    category: "Cultural Clothes & Crafts",
    price: 30000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C10.jpg"
  },
  {
    id: 11,
    name: "Handcrafted Cultural and Gold Jewelry Set",
    category: "Cultural Clothes & Crafts",
    price: 120000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C11.jpg"
  },
  {
    id: 12,
    name: "Luxury Designer Habesha Kemis",
    category: "Cultural Clothes & Crafts",
    price: 22000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C12.jpg"
  },
  {
    id: 13,
    name: "Authentic Handwoven Netela / Scarf",
    category: "Cultural Clothes & Crafts",
    price: 12000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C13.jpg"
  },
  {
    id: 14,
    name: "Traditional Woven Baskets & Mesob",
    category: "Cultural Clothes & Crafts",
    price: 50000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C14.jpg"
  },
  {
    id: 15,
    name: "Royal Gold-Toned Habesha Dress",
    category: "Cultural Clothes & Crafts",
    price: 20000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C15.jpg"
  },
  {
    id: 16,
    name: "Modern Chic Habesha Outfit",
    category: "Cultural Clothes & Crafts",
    price: 45000,
    rating: 4,
    image: "Cultural Clothes & Crafts/C16.jpg"
  },
  {
    id: 17,
    name: "Premium Luxury Royal Habesha Kemis",
    category: "Cultural Clothes & Crafts",
    price: 25000,
    rating: 5,
    image: "Cultural Clothes & Crafts/C17.jpg"
  },
  {
    id: 18,
    name: "Men's Casual Cultural Top",
    category: "Cultural Clothes & Crafts",
    price: 7500,
    rating: 5,
    image: "Cultural Clothes & Crafts/C18.jpg"
  },
  {
    id: 19,
    name: "Authentic Ethiopian Gold-Plated Jewelry",
    category: "Cultural Clothes & Crafts",
    price: 15000,
    rating: 4,
    image: "Cultural Clothes & Crafts/C19.jpg"
  },
  {
    id: 20,
    name: "Traditional Ethiopian Coffee Ceremony Set",
    category: "Cultural Clothes & Crafts",
    price: 5000,
    rating: 4,
    image: "Cultural Clothes & Crafts/C20.jpg"
  },
  {
    id: 21,
    name: "Apple iPhone 18 Pro Max",
    category: "Electronics",
    price: 160000,
    rating: 5,
    image: "Electronics/E1.jpg"
  },
  {
    id: 22,
    name: "Samsung Galaxy S26 Ultra",
    category: "Electronics",
    price: 170000,
    rating: 4,
    image: "Electronics/E2.jpg"
  },
  {
    id: 23,
    name: "Samsung Galaxy Z Fold 7",
    category: "Electronics",
    price: 250000,
    rating: 4,
    image: "Electronics/E3.jpg"
  },
  {
    id: 24,
    name: "Google Pixel 10 Pro",
    category: "Electronics",
    price: 135000,
    rating: 4,
    image: "Electronics/E4.jpg"
  },
  {
    id: 25,
    name: "Xiaomi 15 Ultra",
    category: "Electronics",
    price: 150000,
    rating: 4,
    image: "Electronics/E5.jpg"
  },
  {
    id: 26,
    name: "Sony Xperia 1 VI Premium",
    category: "Electronics",
    price: 185000,
    rating: 4,
    image: "Electronics/E6.jpg"
  },
  {
    id: 27,
    name: "Porsche Design Huawei Mate 70 RS",
    category: "Electronics",
    price: 280000,
    rating: 4,
    image: "Electronics/E7.jpg"
  },
  {
    id: 28,
    name: "Apple MacBook Pro 16\" (M4 Pro / Max)",
    category: "Electronics",
    price: 350000,
    rating: 4,
    image: "Electronics/E8.jpg"
  },
  {
    id: 29,
    name: "Dell XPS 16 OLED",
    category: "Electronics",
    price: 260000,
    rating: 4,
    image: "Electronics/E9.jpg"
  },
  {
    id: 30,
    name: "Lenovo ThinkPad X1 Carbon Gen 12",
    category: "Electronics",
    price: 225000,
    rating: 4,
    image: "Electronics/E10.jpg"
  },
  {
    id: 31,
    name: "ASUS ROG Zephyrus G16",
    category: "Electronics",
    price: 270000,
    rating: 4,
    image: "Electronics/E11.jpg"
  },
  {
    id: 32,
    name: "Apple iMac 24\" Apple Silicon",
    category: "Electronics",
    price: 180000,
    rating: 4,
    image: "Electronics/E12.jpg"
  },
  {
    id: 33,
    name: "Apple AirPods Pro (2nd / 3rd Gen)",
    category: "Electronics",
    price: 32000,
    rating: 4,
    image: "Electronics/E13.jpg"
  },
  {
    id: 34,
    name: "Sony WF-1000XM5 Wireless Earbuds",
    category: "Electronics",
    price: 38000,
    rating: 4,
    image: "Electronics/E14.jpg"
  },
  {
    id: 35,
    name: "Bose QuietComfort Ultra Earbuds",
    category: "Electronics",
    price: 38000,
    rating: 4,
    image: "Electronics/E15.jpg"
  },
  {
    id: 36,
    name: "Samsung Galaxy Buds3 Pro",
    category: "Electronics",
    price: 32000,
    rating: 4,
    image: "Electronics/E16.jpg"
  },
  {
    id: 37,
    name: "Apple Watch Ultra 2",
    category: "Electronics",
    price: 100000,
    rating: 4,
    image: "Electronics/E17.jpg"
  },
  {
    id: 38,
    name: "Samsung Galaxy Watch 7 Ultra",
    category: "Electronics",
    price: 82000,
    rating: 4,
    image: "Electronics/E18.jpg"
  },
  {
    id: 39,
    name: "Anker Soundcore Motion X600 Speaker",
    category: "Electronics",
    price: 25000,
    rating: 4,
    image: "Electronics/E19.jpg"
  },
  {
    id: 40,
    name: "Anker Prime 20,000mAh Power Bank (200W)",
    category: "Electronics",
    price: 16000,
    rating: 4,
    image: "Electronics/E20.jpg"
  },
  {
    id: 41,
    name: "Shiny Black Cropped Puffer Jacket",
    category: "Modern Fashion",
    price: 11000,
    rating: 4,
    image: "Modern Fashion/F1.jpg"
  },
  {
    id: 42,
    name: "Nike Tech Fleece Tracksuit Set (Beige / Oatmeal)",
    category: "Modern Fashion",
    price: 30000,
    rating: 4,
    image: "Modern Fashion/F2.jpg"
  },
  {
    id: 43,
    name: "Nike Tech Fleece Full-Zip Tracksuit (Grey / Black)",
    category: "Modern Fashion",
    price: 30000,
    rating: 4,
    image: "Modern Fashion/F3.jpg"
  },
  {
    id: 44,
    name: "Low-Rise Washed Flare Jeans (Y2K Style)",
    category: "Modern Fashion",
    price: 7000,
    rating: 4,
    image: "Modern Fashion/F4.jpg"
  },
  {
    id: 45,
    name: "DC Shoes Court Graffik Y2K Chunky Sneakers (Black/Pink)",
    category: "Modern Fashion",
    price: 10000,
    rating: 4,
    image: "Modern Fashion/F5.jpg"
  },
  {
    id: 46,
    name: "Air Jordan 4 Retro \"Black Canvas\" / \"Thunder\"",
    category: "Modern Fashion",
    price: 30000,
    rating: 4,
    image: "Modern Fashion/F6.jpg"
  },
  {
    id: 47,
    name: "Air Jordan 5 Retro \"Top 3\" / \"Metallic Black\"",
    category: "Modern Fashion",
    price: 28000,
    rating: 4,
    image: "Modern Fashion/F7.jpg"
  },
  {
    id: 48,
    name: "Nike Tech Fleece Full-Zip Hoodie (Baby Blue)",
    category: "Modern Fashion",
    price: 18000,
    rating: 4,
    image: "Modern Fashion/F8.jpg"
  },
  {
    id: 49,
    name: "Air Jordan 11 Retro \"Cool Grey\"",
    category: "Modern Fashion",
    price: 32000,
    rating: 4,
    image: "Modern Fashion/F9.jpg"
  },
  {
    id: 50,
    name: "Stacked Heavyweight Distressed Black Jeans",
    category: "Modern Fashion",
    price: 10000,
    rating: 4,
    image: "Modern Fashion/F10.jpg"
  },
  {
    id: 51,
    name: "Travis Scott x Air Jordan 4 Retro \"Cactus Jack\"",
    category: "Modern Fashion",
    price: 65000,
    rating: 4,
    image: "Modern Fashion/F11.jpg"
  },
  {
    id: 52,
    name: "Trapstar Hyperdrive Hooded Puffer Jacket (Black)",
    category: "Modern Fashion",
    price: 38000,
    rating: 4,
    image: "Modern Fashion/F12.jpg"
  },
  {
    id: 53,
    name: "Iced-Out Santos De Cartier Diamond Watch",
    category: "Modern Fashion",
    price: 25000,
    rating: 4,
    image: "Modern Fashion/F13.jpg"
  },
  {
    id: 54,
    name: "Purple Bandana Patchwork Slim Fit Jeans",
    category: "Modern Fashion",
    price: 9500,
    rating: 4,
    image: "Modern Fashion/F14.jpg"
  },
  {
    id: 55,
    name: "White Open-Toe High Heel Mules",
    category: "Modern Fashion",
    price: 11000,
    rating: 4,
    image: "Modern Fashion/F15.jpg"
  },
  {
    id: 56,
    name: "Light Wash Distressed Biker Slim Jeans",
    category: "Modern Fashion",
    price: 8500,
    rating: 4,
    image: "Modern Fashion/F16.jpg"
  },
  {
    id: 57,
    name: 'Air Jordan 6 Retro "UNC" (University Blue)',
    category: "Modern Fashion",
    price: 29000,
    rating: 4,
    image: "Modern Fashion/F17.jpg"
  },
  {
    id: 58,
    name: "Heavy Iced-Out Miami Cuban Link Chain",
    category: "Modern Fashion",
    price: 14000,
    rating: 4,
    image: "Modern Fashion/F18.jpg"
  },
  {
    id: 59,
    name: "Air Jordan 1 High OG \"University Blue\" (UNC)",
    category: "Modern Fashion",
    price: 27000,
    rating: 4,
    image: "Modern Fashion/F19.jpg"
  },
  {
    id: 60,
    name: "Two-Tone Datejust Rolex Iced-Out Diamond Watch",
    category: "Modern Fashion",
    price: 24000,
    rating: 4,
    image: "Modern Fashion/F20.jpg"
  },
  {
    id: 61,
    name: "Organic Harar Coffee Beans (1KG)",
    category: "Spices & Coffee",
    price: 1400,
    rating: 5,
    image: "Spice & Coffee/S1.jpg"
  },
 {
    id: 62,
    name: "Premium Sidama Arabica Medium Roast (1KG)",
    category: "Spices & Coffee",
    price: 1300,
    rating: 5,
    image: "Spice & Coffee/S2.jpg"
  },
   {
    id: 63,
    name: "Organic Harar Roasted Coffee Beans (1KG)",
    category: "Spices & Coffee",
    price: 1200,
    rating: 5,
    image: "Spice & Coffee/S3.jpg"
  },
   {
    id: 64,
    name: "Traditional Roasted Ground Coffee / የተፈጨ የሐበሻ ቡና (500g)",
    category: "Spices & Coffee",
    price: 650,
    rating: 5,
    image: "Spice & Coffee/S4.jpg"
  },
   {
    id: 65,
    name: "Raw Green Coffee Beans / የእርጥብ ቡና እህል (1KG)",
    category: "Spices & Coffee",
    price: 900,
    rating: 5,
    image: "Spice & Coffee/S5.jpg"
  },
   {
    id: 66,
    name: "Authentic Ethiopian Berbere / ድልህ/መረቅ በርበሬ (1KG)",
    category: "Spices & Coffee",
    price: 850,
    rating: 5,
    image: "Spice & Coffee/S6.jpg"
  },
   {
    id: 67,
    name: "Special Shiro Powder / ሚጥን ሽሮ (1KG)",
    category: "Spices & Coffee",
    price: 550,
    rating: 5,
    image: "Spice & Coffee/S7.jpg"
  },
   {
    id: 68,
    name: "Pure Ethiopian Mitmita / ነጭ/ቀይ ሚጥሚጣ (500g)",
    category: "Spices & Coffee",
    price: 450,
    rating: 5,
    image: "Spice & Coffee/S8.jpg"
  },
   {
    id: 69,
    name: "Butter Spice Blend / የቅቤ ቅመም (Mekelesha Set - 250g)",
    category: "Spices & Coffee",
    price: 350,
    rating: 5,
    image: "Spice & Coffee/S9.jpg"
  },
   {
    id: 70,
    name: "Korerima Powder / ኮረሪማ (250g)",
    category: "Spices & Coffee",
    price: 400,
    rating: 5,
    image: "Spice & Coffee/S10.jpg"
  },
   {
    id: 71,
    name: "Besobela Dried Leaves / በሶብላ (150g)",
    category: "Spices & Coffee",
    price: 200,
    rating: 5,
    image: "Spice & Coffee/S11.jpg"
  },
   {
    id: 72,
    name: "Mekelesha All-Purpose Spice Mix / መከለሻ ቅመም (200g)",
    category: "Spices & Coffee",
    price: 300,
    rating: 5,
    image: "Spice & Coffee/S12.jpg"
  },
   {
    id: 73,
    name: "Black Seed Powder / የተፈጨ ጥቁር አዝሙድ (250g)",
    category: "Spices & Coffee",
    price: 250,
    rating: 5,
    image: "Spice & Coffee/S13.jpg"
  },
   {
    id: 74,
    name: "White Cumin Powder / ነጭ አዝሙድ (250g)",
    category: "Spices & Coffee",
    price: 220,
    rating: 5,
    image: "Spice & Coffee/S14.jpg"
  },
   {
    id: 75,
    name: "Organic Teff Flour / ንጹህ የጤፍ ዱቄት (100KG)",
    category: "Spices & Coffee",
    price: 16500,
    rating: 5,
    image: "Spice & Coffee/S15.jpg"
  },
   {
    id: 76,
    name: "Pure Ethiopian Forest Honey / ንጹህ የጫካ ማር (1KG)",
    category: "Spices & Coffee",
    price: 1100,
    rating: 5,
    image: "Spice & Coffee/S16.jpg"
  },
   {
    id: 77,
    name: "Traditional Niter Kibbeh / የተቀመመ የሀበሻ ለስላሳ ቅቤ (500g)",
    category: "Spices & Coffee",
    price: 1250,
    rating: 5,
    image: "Spice & Coffee/S17.jpg"
  },
   {
    id: 78,
    name: "Gesho Powder / የጌሾ ዱቄት (For Tella & Tej - 500g)",
    category: "Spices & Coffee",
    price: 300,
    rating: 5,
    image: "Spice & Coffee/S18.jpg"
  },
   {
    id: 79,
    name: "Roasted Barley / ቆሎ (Habesha Kolo - 1KG)",
    category: "Spices & Coffee",
    price: 600,
    rating: 5,
    image: "Spice & Coffee/S19.jpg"
  },
   {
    id: 80,
    name: "Tenadam Herbal Tea Blend / የጤናዳም ሻይ ቅጠል (100g)",
    category: "Spices & Coffee",
    price: 180,
    rating: 5,
    image: "Spice & Coffee/S20.jpg"
  },


];

const HERO_IMAGES = [bg1, bg2, bg3, bg4, bg5];

// Returns the full gallery for a product. If the product data provides an
// explicit `images` array, that's used as-is. Otherwise the gallery is built
// dynamically from the base `image` path by generating the AliExpress-style
// sibling variants (e.g. "Modern Fashion/F1.jpg" -> also
// "Modern Fashion/F1_1.jpg" and "Modern Fashion/F1_2.jpg") so every product
// gets a multi-image gallery without having to hand-list each file.
const getProductImages = (product: Product): string[] => {
  if (product.images && product.images.length > 0) return product.images;

  const lastDot = product.image.lastIndexOf(".");
  if (lastDot === -1) return [product.image];

  const base = product.image.slice(0, lastDot);
  const ext = product.image.slice(lastDot);

  return [product.image, `${base}_1${ext}`, `${base}_2${ext}`];
};

const DESCRIPTION_TEMPLATES: Record<string, string[]> = {
  "Cultural Clothes & Crafts": [
    "Handcrafted by skilled Ethiopian artisans, the {name} blends time-honored weaving techniques with premium materials, making it a standout piece for weddings, holidays, and cultural celebrations.",
    "The {name} carries the spirit of Ethiopian heritage in every stitch. Made with soft, breathable fabric and finished with fine detailing, it's built to be treasured for years.",
    "Celebrate tradition in style with the {name}. Each piece is carefully finished with authentic patterns, offering a perfect balance of cultural pride and modern comfort."
  ],
  "Electronics": [
    "The {name} delivers flagship-level performance with a sleek, modern design. Whether for work or play, it's built to keep up with your everyday demands.",
    "Experience next-level speed and reliability with the {name}. Packed with the latest technology, it's designed for people who expect the best from their devices.",
    "The {name} pairs premium build quality with powerful performance, giving you a dependable device that's ready for anything you throw at it."
  ],
  "Modern Fashion": [
    "The {name} is a statement piece built for the streets. Premium materials and a sharp silhouette make it an easy standout in any rotation.",
    "Stay ahead of the trend with the {name}. Designed with comfort and street-ready style in mind, it's a versatile addition to any modern wardrobe.",
    "The {name} brings bold style and everyday comfort together, crafted with quality materials that hold up to daily wear."
  ],
  "Spices & Coffee": [
    "Sourced from Ethiopia's finest growing regions, the {name} brings authentic, rich flavor straight to your kitchen — a true taste of home.",
    "The {name} is carefully processed to preserve its natural aroma and flavor, perfect for anyone who appreciates genuine Ethiopian quality.",
    "Bring the authentic taste of Ethiopia to your table with the {name}, sourced and prepared using traditional methods passed down for generations."
  ]
};

const getProductDescription = (product: Product): string => {
  if (product.description) return product.description;
  const templates = DESCRIPTION_TEMPLATES[product.category] || [
    "The {name} is a premium pick from our Merkato Store collection, chosen for its quality, craftsmanship, and value."
  ];
  const template = templates[product.id % templates.length];
  return template.replace("{name}", product.name);
};

const REVIEWER_NAMES = [
  "Bethelhem A.", "Yonas T.", "Selam G.", "Dawit M.", "Hana K.",
  "Nahom B.", "Ruth W.", "Abel S.", "Meron F.", "Kaleb Z.",
  "Liya H.", "Samuel D.", "Eden R.", "Mikael L.", "Sara N."
];

const REVIEW_COMMENTS = [
  "Really happy with this purchase — quality is even better than the photos showed.",
  "Fast delivery and the item matched the description perfectly. Will order again.",
  "Great value for the price. Exactly what I was looking for.",
  "Good quality overall, though I wish there were a few more color options.",
  "This exceeded my expectations. Packaging was solid and everything arrived safe.",
  "Solid buy. Been using it for a couple of weeks now and no complaints so far.",
  "Exactly as described. Customer service was also very responsive when I had questions.",
  "Nice craftsmanship, you can tell it wasn't mass produced carelessly.",
  "Took a chance on this and I'm glad I did — really satisfied with it.",
  "Would recommend to anyone considering it. Great addition to my collection."
];

const AVATAR_COLORS = ["#1e3a8a", "#f97316", "#16a34a", "#f59e0b", "#0f766e", "#7c3aed"];

const RELATIVE_DATES = ["3 days ago", "1 week ago", "2 weeks ago", "3 weeks ago", "1 month ago", "2 months ago"];

// Deterministic mock reviews so the same product always shows the same set,
// without needing a real backend/reviews database.
const getProductReviews = (product: Product): Review[] => {
  const count = 3 + (product.id % 2); // 3 or 4 reviews
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const nameIdx = (product.id * 3 + i * 7) % REVIEWER_NAMES.length;
    const commentIdx = (product.id * 5 + i * 11) % REVIEW_COMMENTS.length;
    const dateIdx = (product.id + i * 4) % RELATIVE_DATES.length;
    const colorIdx = (product.id + i) % AVATAR_COLORS.length;
    const name = REVIEWER_NAMES[nameIdx];
    const rating = ((product.id + i) % 2 === 0) ? 5 : 4;
    reviews.push({
      name,
      initials: name.split(" ").map((part) => part[0]).join("").slice(0, 2),
      avatarColor: AVATAR_COLORS[colorIdx],
      rating,
      date: RELATIVE_DATES[dateIdx],
      comment: REVIEW_COMMENTS[commentIdx]
    });
  }
  return reviews;
};

// Deterministic discount info per product — used for the badge + strikethrough
// original price shown on grid cards and the detail page.
const getDiscountInfo = (product: Product): { percent: number; original: number } => {
  const percent = 10 + (product.id % 4) * 5; // 10, 15, 20, or 25
  const original = Math.round((product.price / (1 - percent / 100)) / 10) * 10;
  return { percent, original };
};

// Deterministic numeric rating score (e.g. 4.8 / 5.0) derived from the
// integer star rating, for the high-end glowing star display.
const getRatingScore = (product: Product): number => {
  const score = product.rating - 0.2 + (product.id % 5) * 0.08;
  return Math.max(0, Math.min(5, score));
};

// Sleek glowing gold SVG star rating with a numeric score, used on the
// full-page product detail view.
const StarRating: React.FC<{ score: number }> = ({ score }) => {
  const rounded = Math.round(score);
  return (
    <div className="star-rating-detail">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= rounded;
        return (
          <svg
            key={i}
            className="star-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={filled ? "#FFD700" : "none"}
              stroke={filled ? "#FFD700" : "#94a3b8"}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
      <span className="rating-score-text">{score.toFixed(1)} / 5.0</span>
    </div>
  );
};

interface PaymentAccount {
  label: string;
  account: string;
  holder: string;
  qr: string;
  logo: string;
}

const PAYMENT_INFO: Record<string, PaymentAccount> = {
  telebirr: {
    label: "telebirr",
    account: "0938423234",
    holder: "Yilma Tsige",
    qr: telebirrQr,
    logo: telebirrLogo
  },
  cbe: {
    label: "CBE (Commercial Bank of Ethiopia)",
    account: "1000739055583",
    holder: "Michael Tadesse",
    qr: cbeQr,
    logo: cbeLogo
  },
  abyssinia: {
    label: "Bank of Abyssinia",
    account: "94343615",
    holder: "Michael Tadesse Meressa",
    qr: abyssiniaQr,
    logo: abyssiniaLogo
  }
};

type FooterModalKey = "story" | "how" | "contact" | "support";

const FOOTER_MODAL_TITLES: Record<FooterModalKey, string> = {
  story: "Our Story",
  how: "How It Works",
  contact: "Get in Touch",
  support: "Support"
};

const FOOTER_MODAL_SUBTITLES: Record<FooterModalKey, string> = {
  story: "The market spirit of Addis Ababa, brought to your doorstep.",
  how: "From browsing to delivery in four simple steps.",
  contact: "We usually reply within one business day.",
  support: "Real help for orders, payments, and deliveries."
};

interface HowItWorksStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: 1,
    icon: "🛍️",
    title: "Browse & Discover",
    description: "Explore Habesha clothing, modern fashion, and local electronics."
  },
  {
    step: 2,
    icon: "🛒",
    title: "Add to Cart & Checkout",
    description: "Select items and choose Telebirr, CBE Birr, or Abyssinia Bank."
  },
  {
    step: 3,
    icon: "💳",
    title: "Pay & Attach Receipt",
    description: "Submit your transaction reference number and upload receipt screenshot."
  },
  {
    step: 4,
    icon: "🚚",
    title: "Real-time Tracking & Delivery",
    description: "Watch status change from Payment Verified → Shipped → Delivered."
  }
];

interface StoryFeature {
  icon: string;
  title: string;
  description: string;
}

const STORY_FEATURES: StoryFeature[] = [
  {
    icon: "🌍",
    title: "Authentic Sourcing",
    description: "Every piece is sourced directly from Addis Ababa's legendary Merkato market and trusted local artisans, so what you see is genuinely what you get."
  },
  {
    icon: "🤝",
    title: "Local Empowerment",
    description: "We work hand-in-hand with Ethiopian tailors, weavers, and roasters, putting fair value back into the hands of the people who make each product."
  },
  {
    icon: "🚀",
    title: "Global Reach",
    description: "Whether you're across town or across the world, our platform brings Ethiopian craft and culture to your doorstep with reliable, trackable delivery."
  }
];

const TELEGRAM_USERNAME = "@I092MLBOA";
const TELEGRAM_LINK = "https://t.me/I092MLBOA";

interface ContactFormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_CONTACT_FORM: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("Home");
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("telebirr");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailActiveImage, setDetailActiveImage] = useState<string>("");
  const [detailQty, setDetailQty] = useState<number>(1);

  // Tracks thumbnail image URLs that failed to load (404 / missing file) so
  // we can filter them out of the thumbnail strip instead of showing a
  // broken-image icon. Only affects rendering — does not touch
  // getProductImages() or any other data logic.
  const [brokenThumbImages, setBrokenThumbImages] = useState<Set<string>>(new Set());

  // Payment modal / checkout flow state
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [paymentStep, setPaymentStep] = useState<"form" | "verifying" | "success">("form");
  const [txnRef, setTxnRef] = useState<string>("");
  const [receiptFileName, setReceiptFileName] = useState<string | null>(null);
  const [orderRef, setOrderRef] = useState<string>("");
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");

  // Footer link modal state ("story" | "how" | "contact" | "support" | null)
  const [activeFooterModal, setActiveFooterModal] = useState<FooterModalKey | null>(null);

  // "Get in Touch" contact form state
  const [contactForm, setContactForm] = useState<ContactFormState>(EMPTY_CONTACT_FORM);
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  const isInCart = (productId: number) => cart.some((item) => item.id === productId);

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setDetailActiveImage(getProductImages(product)[0]);
    setDetailQty(1);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const decrementDetailQty = () => {
    setDetailQty((prev) => Math.max(1, prev - 1));
  };

  const incrementDetailQty = () => {
    setDetailQty((prev) => Math.min(99, prev + 1));
  };

  // Toggles the product in/out of the cart from the detail page:
  // "Add to Cart" -> adds `detailQty` copies and becomes "Added to Cart";
  // clicking "Added to Cart" again removes all copies of that product.
  const handleDetailAddToggle = () => {
    if (!selectedProduct) return;
    if (isInCart(selectedProduct.id)) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== selectedProduct.id));
    } else {
      setCart((prevCart) => [
        ...prevCart,
        ...Array.from({ length: detailQty }, () => selectedProduct)
      ]);
    }
  };

  const handleDetailBuyNow = () => {
    if (!selectedProduct) return;
    setCart((prevCart) => [
      ...prevCart,
      ...Array.from({ length: detailQty }, () => selectedProduct)
    ]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const closeFooterModal = () => {
    setActiveFooterModal(null);
    setContactForm(EMPTY_CONTACT_FORM);
    setContactSubmitted(false);
  };

  const handleContactFieldChange = (field: keyof ContactFormState, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) return;
    setContactSubmitted(true);
    setContactForm(EMPTY_CONTACT_FORM);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentStep("form");
    setTxnRef("");
    setReceiptFileName(null);
    setOrderRef("");
    setEstimatedDelivery("");
    setIsCartOpen(false);
  };

  const handleConfirmPayment = () => {
    setPaymentStep("verifying");
    // Simulate payment verification, then reveal the AliExpress-style order
    // confirmation with a generated order reference + estimated delivery date.
    setTimeout(() => {
      const generatedRef = `MK-${Date.now().toString().slice(-8)}`;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 6);
      const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      });

      setOrderRef(generatedRef);
      setEstimatedDelivery(formattedDelivery);
      setCart([]);
      setPaymentStep("success");
    }, 1800);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Shop All" || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const activePaymentInfo = PAYMENT_INFO[paymentMethod];

  return (
    <div className="store-container w-full max-w-full overflow-x-hidden" data-theme={darkMode ? "dark" : "light"}>
      <header className="top-navbar flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 px-4 sm:px-6 lg:px-8 py-3">
        <div className="nav-brand">MERKATO STORE</div>

        <div className="search-bar-container w-full lg:w-auto lg:flex-1">
          <input
            type="text"
            placeholder="Search cultural items, electronics..."
            className="search-input w-full"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (selectedCategory === "Home" && e.target.value) {
                setSelectedCategory("Shop All");
              }
            }}
          />
          <button className="search-btn">🔍</button>
        </div>

        <div className="nav-actions flex items-center justify-between lg:justify-end gap-3 w-full lg:w-auto">
          <button
            className={`ios-toggle ${darkMode ? "ios-toggle-on" : ""}`}
            onClick={() => setDarkMode((prev) => !prev)}
            role="switch"
            aria-checked={darkMode}
            aria-label="Toggle dark mode"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="ios-toggle-knob" />
          </button>

          <div className="cart-status" onClick={() => setIsCartOpen(true)}>
            <span className="cart-icon-wrapper">
              🛒
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </span>
            <span className="cart-label">Cart</span>
          </div>
        </div>
      </header>

      <nav className="sub-navbar flex flex-wrap lg:flex-nowrap gap-2 px-4 sm:px-6 lg:px-8 overflow-x-auto">
        {["Home", "Shop All", "Cultural Clothes & Crafts", "Electronics", "Modern Fashion", "Spices & Coffee"].map((cat) => (
          <button
            key={cat}
            className={`nav-link whitespace-nowrap ${selectedCategory === cat ? "active-link" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <section className="hero-banner-container">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`hero-slide-wrapper ${currentSlide === idx ? 'slide-active' : ''}`}
          >
            <div className="hero-slide-blur" style={{ backgroundImage: `url(${img})` }} />
            <div className="hero-slide" style={{ backgroundImage: `url(${img})` }} />
          </div>
        ))}
        <div className="hero-overlay-dark" />
        <div className="hero-overlay px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl lg:text-6xl leading-tight text-center break-words">Authentic Merkato Finds, Delivered.</h2>
        </div>
        <div className="slider-dots">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              className={`dot ${currentSlide === idx ? 'dot-active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </section>

      {selectedCategory === "Home" ? (
        <div className="quick-cat-section grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
          <div
            className="quick-cat-card mx-auto w-full p-5 sm:p-7 lg:p-8 rounded-2xl"
            onClick={() => setSelectedCategory("Cultural Clothes & Crafts")}
          >
            <div className="quick-cat-image flex items-center justify-center min-h-[110px] sm:min-h-[150px] lg:min-h-[170px]">
              <img className="w-full h-auto object-contain mx-auto" src="Kemis 1.jpg" alt="Habesha Kemis" />
            </div>
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mt-3 sm:mt-4">Habesha Kemis</h4>
          </div>
          <div
            className="quick-cat-card mx-auto w-full p-5 sm:p-7 lg:p-8 rounded-2xl"
            onClick={() => setSelectedCategory("Electronics")}
          >
            <div className="quick-cat-image flex items-center justify-center min-h-[110px] sm:min-h-[150px] lg:min-h-[170px]">
              <img className="w-full h-auto object-contain mx-auto" src="Electronics.png" alt="Electronics" />
            </div>
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mt-3 sm:mt-4">Electronics</h4>
          </div>
          <div
            className="quick-cat-card mx-auto w-full p-5 sm:p-7 lg:p-8 rounded-2xl"
            onClick={() => setSelectedCategory("Modern Fashion")}
          >
            <div className="quick-cat-image flex items-center justify-center min-h-[110px] sm:min-h-[150px] lg:min-h-[170px]">
              <img className="w-full h-auto object-contain mx-auto" src="Sneaker.png" alt="Modern Fashion" />
            </div>
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mt-3 sm:mt-4">Modern Fashion</h4>
          </div>
          <div
            className="quick-cat-card mx-auto w-full p-5 sm:p-7 lg:p-8 rounded-2xl"
            onClick={() => setSelectedCategory("Spices & Coffee")}
          >
            <div className="quick-cat-image flex items-center justify-center min-h-[110px] sm:min-h-[150px] lg:min-h-[170px]">
              <img className="w-full h-auto object-contain mx-auto" src="Spices.png" alt="Spices" />
            </div>
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold mt-3 sm:mt-4">Spices</h4>
          </div>
        </div>
      ) : (
      <main className="main-layout flex flex-col lg:flex-row gap-4 px-4 sm:px-6 lg:px-8">
        <aside className="filter-sidebar w-full lg:w-64 shrink-0">
          <h3>Categories</h3>
          <div className="filter-group">
            {["Shop All", "Cultural Clothes & Crafts", "Electronics", "Modern Fashion", "Spices & Coffee"].map((cat) => (
              <label key={cat} className="filter-label">
                <input
                  type="radio"
                  name="sidebar-cat"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>

          <h3>Price Range</h3>
          <input
            type="range"
            min="100"
            max="500000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="price-slider w-full"
          />
          <div className="price-labels">
            <span>100 ETB</span>
            <span>{maxPrice.toLocaleString()} ETB</span>
          </div>
        </aside>

        <section className="products-display flex-1 min-w-0">
          <h2 className="section-title break-words">
            {selectedCategory} {searchQuery && ` - Search results for "${searchQuery}"`}
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="empty-cart-msg">No products found matching your filters.</p>
          ) : (
            <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => {
                const discount = getDiscountInfo(product);
                return (
                  <div
                    key={product.id}
                    className="product-card min-w-0 overflow-hidden"
                    onClick={() => openProductDetail(product)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="image-wrapper flex items-center justify-center">
                      <span className="discount-badge">-{discount.percent}%</span>
                      <img className="w-full h-auto object-contain mx-auto" src={product.image} alt={product.name} />
                    </div>
                    <div className="card-body min-w-0">
                      <h3 className="truncate">{product.name}</h3>
                      <div className="price-block flex-wrap">
                        <span className="original-price">{discount.original.toLocaleString()} ETB</span>
                        <span className="price">{product.price.toLocaleString()} ETB</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      )}

      <footer className="site-footer px-4 sm:px-6 lg:px-8">
        <div className="footer-container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12 w-full">
          <div className="footer-col flex flex-col gap-2 min-w-0">
            <h4>Category</h4>
            <button className="footer-link" onClick={() => setSelectedCategory("Cultural Clothes & Crafts")}>Cultural Clothes & Crafts</button>
            <button className="footer-link" onClick={() => setSelectedCategory("Electronics")}>Electronics</button>
            <button className="footer-link" onClick={() => setSelectedCategory("Modern Fashion")}>Modern Fashion</button>
            <button className="footer-link" onClick={() => setSelectedCategory("Spices & Coffee")}>Spices & Coffee</button>
          </div>

          <div className="footer-col flex flex-col gap-2 min-w-0">
            <h4>About Us</h4>
            <button className="footer-link" onClick={() => setActiveFooterModal("story")}>Our Story</button>
            <button className="footer-link" onClick={() => setActiveFooterModal("how")}>How It Works</button>
          </div>

          <div className="footer-col flex flex-col gap-2 min-w-0">
            <h4>Contact</h4>
            <button className="footer-link" onClick={() => setActiveFooterModal("contact")}>Get in Touch</button>
            <button className="footer-link" onClick={() => setActiveFooterModal("support")}>Support</button>
          </div>
        </div>

        <div className="footer-bottom flex flex-col sm:flex-row items-center gap-3 sm:gap-0">
          <span className="footer-copyright text-center sm:text-left">© 2026 Merkato Store. All rights reserved.</span>
          <div className="footer-social">
            <a
              href="https://www.linkedin.com/in/michael-tad-ab0989306?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="social-icon"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/bigp_api17?igsh=a281MnZyNmVwOGsy&igsi=a281MnZyNmVwOGsy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="social-icon"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://x.com/MikeHustle86312"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="social-icon"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 4.01c-.88.39-1.83.65-2.82.77 1.02-.61 1.79-1.56 2.16-2.72-.95.56-2 .97-3.13 1.19A4.92 4.92 0 0 0 16.11 2c-2.73 0-4.94 2.21-4.94 4.94 0 .39.04.76.13 1.12A13.98 13.98 0 0 1 1.64 3.16 4.822 4.822 0 0 0 1 5.6a4.94 4.94 0 0 0 2.19 4.11 4.897 4.897 0 0 1-2.24-.62v.06c0 2.39 1.7 4.39 3.95 4.84a4.996 4.996 0 0 1-2.23.08 4.951 4.951 0 0 0 4.62 3.44A9.9 9.9 0 0 1 1 19.54a13.94 13.94 0 0 0 7.55 2.21c9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.02-.63A9.936 9.936 0 0 0 23 4.01z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {(activeFooterModal === "story" || activeFooterModal === "how") && (
        <div
          className={`footer-info-page footer-info-page-${activeFooterModal} px-4 sm:px-6 lg:px-8`}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.78) 0%, rgba(2,6,23,0.58) 40%, rgba(2,6,23,0.82) 100%), url(${activeFooterModal === "story" ? ourStoryBg : howItWorksBg})`
          }}
        >
          <button className="footer-info-back-btn" onClick={closeFooterModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </button>

          <div className="footer-info-content">
            <div className="footer-info-heading">
              <h2>{FOOTER_MODAL_TITLES[activeFooterModal]}</h2>
              <p className="footer-info-subtitle">{FOOTER_MODAL_SUBTITLES[activeFooterModal]}</p>
            </div>

            <div className="footer-info-body">
              {activeFooterModal === "story" && (
                <div className="story-features-grid footer-info-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {STORY_FEATURES.map((feature) => (
                    <div key={feature.title} className="story-feature-card">
                      <div className="story-feature-icon">{feature.icon}</div>
                      <h3 className="story-feature-title">{feature.title}</h3>
                      <p className="story-feature-desc">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeFooterModal === "how" && (
                <div className="steps-flow footer-info-steps flex flex-col lg:flex-row items-stretch gap-4">
                  {HOW_IT_WORKS_STEPS.map((step, idx) => (
                    <React.Fragment key={step.step}>
                      <div className="step-card">
                        <div className="step-badge">Step {step.step}</div>
                        <div className="step-icon">{step.icon}</div>
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-desc">{step.description}</p>
                      </div>
                      {idx < HOW_IT_WORKS_STEPS.length - 1 && <div className="step-connector" aria-hidden="true" />}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(activeFooterModal === "contact" || activeFooterModal === "support") && (
        <div className="footer-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeFooterModal}>
          <div className={`footer-modal footer-modal-${activeFooterModal} w-full max-w-full sm:max-w-lg mx-auto`} onClick={(e) => e.stopPropagation()}>
            <div className="footer-modal-header">
              <div className="footer-modal-heading">
                <h2>{FOOTER_MODAL_TITLES[activeFooterModal]}</h2>
                <p className="footer-modal-subtitle">{FOOTER_MODAL_SUBTITLES[activeFooterModal]}</p>
              </div>
              <button
                className="footer-modal-close"
                onClick={closeFooterModal}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="footer-modal-body">
              {activeFooterModal === "contact" && (
                contactSubmitted ? (
                  <div className="contact-success-state">
                    <div className="contact-success-icon">✅</div>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thanks for reaching out — our team will get back to you within one business day.</p>
                    <button className="contact-send-another-btn w-full sm:w-auto" onClick={() => setContactSubmitted(false)}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleContactSubmit}>
                    <div className="contact-form-row flex flex-col sm:flex-row gap-3">
                      <div className="contact-form-group flex-1 min-w-0">
                        <label htmlFor="contact-name">Full Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          className="w-full"
                          placeholder="Abebe Kebede"
                          value={contactForm.name}
                          onChange={(e) => handleContactFieldChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="contact-form-group flex-1 min-w-0">
                        <label htmlFor="contact-email">Email Address</label>
                        <input
                          id="contact-email"
                          type="email"
                          className="w-full"
                          placeholder="you@example.com"
                          value={contactForm.email}
                          onChange={(e) => handleContactFieldChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-subject">Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        className="w-full"
                        placeholder="Question about my order"
                        value={contactForm.subject}
                        onChange={(e) => handleContactFieldChange("subject", e.target.value)}
                      />
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        className="w-full"
                        rows={4}
                        placeholder="Tell us how we can help..."
                        value={contactForm.message}
                        onChange={(e) => handleContactFieldChange("message", e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="contact-send-btn w-full sm:w-auto">Send Message</button>
                  </form>
                )
              )}

              {activeFooterModal === "support" && (
                <div className="support-body">
                  <p className="support-notice">
                    Need help with an order, a payment, or a product question? Have your Transaction Reference number ready for payment issues, and check the Estimated Delivery Date on your order confirmation for shipping questions. For anything else, our team is one message away.
                  </p>

                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="telegram-support-card"
                  >
                    <span className="telegram-icon-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.05 3.16 2.79 10.28c-1.25.5-1.24 1.19-.23 1.5l4.68 1.46 1.8 5.56c.22.6.37.84.76.84.35 0 .5-.16.7-.35l1.68-1.63 4.87 3.6c.65.36 1.12.17 1.28-.6l2.7-16.05c.24-1.1-.42-1.6-1.02-1.35zM8.36 13.62l9.7-6.1c.46-.28.88-.13.53.18l-8.28 7.48-.32 3.46-1.63-5.02z" />
                      </svg>
                    </span>
                    <span className="telegram-support-info min-w-0">
                      <span className="telegram-support-label">Chat with us on Telegram</span>
                      <span className="telegram-support-username truncate">{TELEGRAM_USERNAME}</span>
                    </span>
                    <span className="telegram-support-arrow">→</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="product-detail-page px-4 sm:px-6 lg:px-8">
          <button className="back-to-products-btn" onClick={closeProductDetail}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Products
          </button>

          <div className="detail-content flex flex-col lg:flex-row gap-6">
            <div className="detail-gallery w-full lg:w-1/2 min-w-0">
              <div className="detail-main-image flex items-center justify-center w-full h-[300px] sm:h-[400px] lg:h-[450px]">
                <img
                  className="max-w-full max-h-full w-auto h-auto object-contain"
                  src={detailActiveImage}
                  alt={selectedProduct.name}
                />
              </div>
              <div className="detail-thumbs flex flex-wrap gap-2">
                {getProductImages(selectedProduct)
                  .filter((img) => !brokenThumbImages.has(img))
                  .map((img, idx) => (
                    <button
                      key={idx}
                      className={`detail-thumb ${detailActiveImage === img ? "detail-thumb-active" : ""}`}
                      onClick={() => setDetailActiveImage(img)}
                    >
                      <img
                        className="w-full h-auto object-cover"
                        src={img}
                        alt={`${selectedProduct.name} ${idx + 1}`}
                        onError={() =>
                          setBrokenThumbImages((prev) => {
                            if (prev.has(img)) return prev;
                            const next = new Set(prev);
                            next.add(img);
                            return next;
                          })
                        }
                      />
                    </button>
                  ))}
              </div>
            </div>

            <div className="detail-info w-full lg:w-1/2 min-w-0">
              <span className="card-category">{selectedProduct.category}</span>
              <h2 className="detail-title break-words">{selectedProduct.name}</h2>
              <div className="detail-rating">
                <StarRating score={getRatingScore(selectedProduct)} />
                <span className="detail-rating-count">({getProductReviews(selectedProduct).length} reviews)</span>
              </div>

              <div className="detail-price-row flex flex-wrap items-center gap-2">
                <span className="detail-price">{selectedProduct.price.toLocaleString()} ETB</span>
                <span className="detail-original-price">{getDiscountInfo(selectedProduct).original.toLocaleString()} ETB</span>
                <span className="detail-discount-badge">-{getDiscountInfo(selectedProduct).percent}%</span>
              </div>

              <p className="detail-description break-words">{getProductDescription(selectedProduct)}</p>

              <div className="detail-qty-row">
                <span className="detail-qty-label">Quantity</span>
                <div className="detail-qty-controls">
                  <button className="qty-btn" onClick={decrementDetailQty} aria-label="Decrease quantity">−</button>
                  <span className="qty-value">{detailQty}</span>
                  <button className="qty-btn" onClick={incrementDetailQty} aria-label="Increase quantity">+</button>
                </div>
              </div>

              <div className="detail-action-row flex flex-col sm:flex-row gap-3">
                <button className="buy-now-btn w-full sm:w-auto" onClick={handleDetailBuyNow}>Buy Now</button>
                <button
                  className={`detail-add-btn w-full sm:w-auto ${isInCart(selectedProduct.id) ? "added" : ""}`}
                  onClick={handleDetailAddToggle}
                >
                  {isInCart(selectedProduct.id) ? "✓ Added to Cart" : "Add to Cart"}
                </button>
              </div>

              <div className="detail-reviews-section">
                <h3>Customer Reviews</h3>
                <div className="reviews-list">
                  {getProductReviews(selectedProduct).map((review, idx) => (
                    <div key={idx} className="review-item">
                      <div
                        className="review-avatar"
                        style={{ backgroundColor: review.avatarColor }}
                      >
                        {review.initials}
                      </div>
                      <div className="review-body min-w-0">
                        <div className="review-header flex flex-wrap items-center gap-2">
                          <span className="review-name">{review.name}</span>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="review-stars">{"⭐".repeat(review.rating)}</div>
                        <p className="review-comment break-words">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="cart-drawer-overlay fixed inset-0 z-50" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer w-full sm:max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header px-4 sm:px-6">
              <h2>Your Shopping Cart ({cart.length})</h2>
              <button className="close-drawer-btn" onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div className="cart-drawer-body px-4 sm:px-6">
              {cart.length === 0 ? (
                <p className="empty-cart-msg">Your cart is empty. Start shopping!</p>
              ) : (
                <div className="cart-content-wrapper">
                  <div className="cart-items-list">
                    {cart.map((item, index) => (
                      <div key={index} className="cart-drawer-item">
                        <img className="cart-item-thumb w-16 h-16 sm:w-20 sm:h-20 object-cover shrink-0" src={item.image} alt={item.name} />
                        <div className="item-details min-w-0">
                          <h4 className="truncate">{item.name}</h4>
                          <span className="item-price">{item.price.toLocaleString()} ETB</span>
                        </div>
                        <button
                          className="remove-item-btn"
                          onClick={() => removeFromCart(index)}
                          aria-label="Remove item"
                          title="Remove item"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="cart-summary-section">
                    <div className="total-row">
                      <span>Total:</span>
                      <span className="total-amount">{cartTotal.toLocaleString()} ETB</span>
                    </div>

                    <div className="payment-methods-box">
                      <h3>Payment Method</h3>
                      <div className="payment-grid grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <label className={`pay-option ${paymentMethod === "telebirr" ? "pay-option-selected" : ""}`}>
                          <input
                            type="radio"
                            name="payment"
                            value="telebirr"
                            checked={paymentMethod === "telebirr"}
                            onChange={() => setPaymentMethod("telebirr")}
                          />
                          <span className="pay-icon">
                            <img src={telebirrLogo} alt="telebirr" />
                          </span>
                          <span className="pay-name">telebirr</span>
                        </label>
                        <label className={`pay-option ${paymentMethod === "cbe" ? "pay-option-selected" : ""}`}>
                          <input
                            type="radio"
                            name="payment"
                            value="cbe"
                            checked={paymentMethod === "cbe"}
                            onChange={() => setPaymentMethod("cbe")}
                          />
                          <span className="pay-icon">
                            <img src={cbeLogo} alt="CBE Birr" />
                          </span>
                          <span className="pay-name">CBE Birr</span>
                        </label>
                        <label className={`pay-option ${paymentMethod === "abyssinia" ? "pay-option-selected" : ""}`}>
                          <input
                            type="radio"
                            name="payment"
                            value="abyssinia"
                            checked={paymentMethod === "abyssinia"}
                            onChange={() => setPaymentMethod("abyssinia")}
                          />
                          <span className="pay-icon">
                            <img src={abyssiniaLogo} alt="Abyssinia Bank" />
                          </span>
                          <span className="pay-name">Abyssinia Bank</span>
                        </label>
                      </div>
                    </div>

                    <button className="checkout-action-btn w-full" onClick={() => setShowPaymentModal(true)}>
                      Checkout Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="payment-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closePaymentModal}>
          <div className="payment-modal w-full max-w-full sm:max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
            {paymentStep === "form" ? (
              <>
                <div className="payment-modal-header">
                  <h2>Pay with {activePaymentInfo.label}</h2>
                  <button className="payment-modal-close" onClick={closePaymentModal} aria-label="Close">✕</button>
                </div>

                <div className="payment-qr-wrap">
                  <img className="w-full h-auto max-w-[220px] mx-auto" src={activePaymentInfo.qr} alt={`${activePaymentInfo.label} QR code`} />
                </div>

                <div className="payment-details-box">
                  <div className="payment-detail-row flex flex-wrap justify-between gap-1">
                    <span>Account / Phone</span>
                    <span>{activePaymentInfo.account}</span>
                  </div>
                  <div className="payment-detail-row flex flex-wrap justify-between gap-1">
                    <span>Account Name</span>
                    <span>{activePaymentInfo.holder}</span>
                  </div>
                  <div className="payment-detail-row flex flex-wrap justify-between gap-1">
                    <span>Amount Due</span>
                    <span>{cartTotal.toLocaleString()} ETB</span>
                  </div>
                </div>

                <div className="payment-form-group">
                  <label htmlFor="txn-ref">Transaction Reference / Txn ID</label>
                  <input
                    id="txn-ref"
                    type="text"
                    className="w-full"
                    value={txnRef}
                    onChange={(e) => setTxnRef(e.target.value)}
                    placeholder="e.g. FT2508XXXXXXX"
                  />
                </div>

                <div className="payment-form-group">
                  <label htmlFor="receipt-upload">Upload Payment Receipt / Screenshot</label>
                  <input
                    id="receipt-upload"
                    type="file"
                    className="w-full"
                    accept="image/*,.pdf"
                    onChange={(e) => setReceiptFileName(e.target.files?.[0]?.name ?? null)}
                  />
                </div>

                <button
                  className="confirm-payment-btn w-full"
                  disabled={!txnRef.trim() || !receiptFileName}
                  onClick={handleConfirmPayment}
                >
                  Confirm Payment
                </button>
              </>
            ) : paymentStep === "verifying" ? (
              <div className="payment-verifying">
                <div className="verifying-spinner" />
                <h3>Verifying Payment...</h3>
                <p>Please wait while we confirm your transaction details.</p>
              </div>
            ) : (
              <div className="payment-success">
                <div className="payment-success-icon">✅</div>
                <h3>Order Confirmed</h3>
                <p>Thank you! Your payment has been verified and your order is now being processed.</p>

                <div className="order-tracker flex flex-wrap items-center justify-center gap-1">
                  <div className="order-step completed">
                    <div className="order-step-dot">✓</div>
                    <span>Order Placed</span>
                  </div>
                  <div className="order-step-line completed" />
                  <div className="order-step completed">
                    <div className="order-step-dot">✓</div>
                    <span>Payment Verified</span>
                  </div>
                  <div className="order-step-line" />
                  <div className="order-step">
                    <div className="order-step-dot">3</div>
                    <span>Shipped</span>
                  </div>
                  <div className="order-step-line" />
                  <div className="order-step">
                    <div className="order-step-dot">4</div>
                    <span>Delivered</span>
                  </div>
                </div>

                <div className="order-details-box">
                  <div className="order-detail-row flex flex-wrap justify-between gap-1">
                    <span>Order Reference</span>
                    <span>{orderRef}</span>
                  </div>
                  <div className="order-detail-row flex flex-wrap justify-between gap-1">
                    <span>Estimated Delivery</span>
                    <span>{estimatedDelivery}</span>
                  </div>
                </div>

                <button className="payment-success-close-btn w-full sm:w-auto" onClick={closePaymentModal}>Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}