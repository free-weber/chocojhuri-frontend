import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  ShoppingBag, Phone, MapPin, X, Check, ChevronDown, Filter, 
  Search, Eye, ShoppingCart, Plus, Minus, MessageCircle, 
  Info, Star, ShieldCheck, Truck, ChevronLeft, ChevronRight, Copy, AlertCircle
} from 'lucide-react';
import { FaFacebook } from 'react-icons/fa';

const SITE_CONFIG = {
  brandName: "Chocoঝুড়ি",
  whatsappNumber: "+8801700000000",
  messengerPageId: "demo.chocojhuri",
  deliveryFee: {
    insideDhaka: 60,
    outsideDhaka: 120
  },
  currency: "৳",
};

// Global styles injecting new fonts and brand colors
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
    
    :root {
      --color-dark-cocoa: #402014;
      --color-fresh-lime: #D8F3B0;
      --color-natural-cream: #FFFBEA;
      --color-soft-lime: #EBF7D3;
      --color-success: #21865B;
      --color-text-primary: #402014;
      --color-text-secondary: #5E4D46;
    }

    body {
      font-family: 'Poppins', sans-serif;
      background-color: var(--color-natural-cream);
      color: var(--color-text-primary);
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }

    .font-playfair {
      font-family: 'Playfair Display', serif;
    }
    
    .font-pacifico {
      font-family: 'Pacifico', cursive;
    }

    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }

    .brand-gradient {
      background: linear-gradient(135deg, var(--color-dark-cocoa) 0%, #2A150D 100%);
    }
    
    .lime-glow {
      background: radial-gradient(circle at center, rgba(216, 243, 176, 0.2) 0%, transparent 70%);
    }
    
    .text-balance {
      text-wrap: balance;
    }
  `}</style>
);

const PRODUCTS = [
  {
    id: "combo-01", slug: "classic-chocolate-combo", name: "ক্লাসিক চকলেট কম্বো",
    description: "সবচেয়ে জনপ্রিয় এবং বিভিন্ন স্বাদের চকলেটের আকর্ষণীয় প্যাকেজ।",
    detailDescription: "আমাদের ক্লাসিক কম্বো বক্সটি তাদের জন্য যারা সব ধরনের স্বাদ একসাথে উপভোগ করতে চান। এতে রয়েছে প্রিমিয়াম কোয়ালিটির মিল্ক এবং ডার্ক চকলেটের দারুণ সমন্বয়।",
    price: 499, compareAtPrice: 550, itemCount: 6, totalWeightGrams: 180,
    countryOfOrigin: "বাংলাদেশ", brand: "Chocoঝুড়ি",
    items: [{ name: "Milk Chocolate", quantity: 3, unitType: "piece", unitLabel: "পিস" }, { name: "Dark Chocolate", quantity: 3, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419008/A_gtxq38.jpg",
      packaging: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419007/gloriously-chocolatey-selection-1-2005525-26_fttaif.jpg",
      inside: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419008/taste-of-bettys-gift-box-4-2005524-26_nwundg.jpg"
    },
    featured: true, available: true, allergens: ["দুধ", "সয়া"]
  },
  {
    id: "combo-02", slug: "premium-dark-delight", name: "প্রিমিয়াম ডার্ক ডিলাইট",
    description: "যারা ডার্ক চকলেট ভালোবাসেন, তাদের জন্য স্পেশাল ডার্ক চকলেটের কম্বো।",
    detailDescription: "৭০% কোকো সমৃদ্ধ এই ডার্ক চকলেটগুলো আপনার স্বাস্থ্যের জন্য উপকারী এবং স্বাদে অতুলনীয়।",
    price: 650, compareAtPrice: null, itemCount: 8, totalWeightGrams: 240,
    countryOfOrigin: "ভারত", brand: "DarkBite",
    items: [{ name: "70% Dark Chocolate", quantity: 4, unitType: "piece", unitLabel: "পিস" }, { name: "Dark Almond", quantity: 4, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419007/chocolate-eating-630x4502x_1_qezqjv.jpg",
      packaging: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419006/barretta-pecan-fronte_g8d0ha.png",
      inside: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419006/homepage-sustainable-mobile_flrgat.jpg"
    },
    featured: true, available: true, allergens: ["বাদাম", "সয়া"]
  },
  {
    id: "combo-03", slug: "kids-favorite-box", name: "কিডস ফেভারিট বক্স",
    description: "বাচ্চাদের পছন্দের মজাদার মিল্ক ও হোয়াইট চকলেটের দারুণ মিশ্রণ।",
    detailDescription: "বাচ্চাদের জন্মদিনে বা যেকোনো অনুষ্ঠানে উপহার দেওয়ার জন্য এটি একটি সেরা পছন্দ। মিষ্টি ও মজাদার স্বাদের গ্যারান্টি।",
    price: 350, compareAtPrice: 400, itemCount: 6, totalWeightGrams: 150,
    countryOfOrigin: "বাংলাদেশ", brand: "SweetTreat",
    items: [{ name: "White Chocolate", quantity: 3, unitType: "piece", unitLabel: "পিস" }, { name: "Milk Caramel", quantity: 3, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419012/Lindt-Lindor-Pistachio-Milk-Chocolate-100g-1-1_epah8w.png",
      packaging: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419012/Lindt-A-Touch-Of-Sea-Salt-Dark-Chocolate1_pls1is.png",
      inside: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419012/Lindt-Lindor-Milk-Chocolate-Bar-min_eits9i.png"
    },
    featured: false, available: true, allergens: ["দুধ"]
  },
  {
    id: "combo-04", slug: "arabian-dates-chocolate", name: "এরাবিয়ান ডেটস এন্ড চকলেট",
    description: "দুবাইয়ের প্রিমিয়াম খেজুর এবং চকলেটের রাজকীয় সমন্বয়।",
    detailDescription: "ভেতরে বাদাম এবং বাইরে চকলেটের আস্তরণ দেওয়া সুস্বাদু এরাবিয়ান খেজুর। মেহমান আপ্যায়নে অসাধারণ।",
    price: 890, compareAtPrice: 1000, itemCount: 12, totalWeightGrams: 360,
    countryOfOrigin: "দুবাই / সংযুক্ত আরব আমিরাত", brand: "ArabianSweets",
    items: [{ name: "Chocolate Coated Dates", quantity: 12, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419573/%E0%A6%96%E0%A7%87%E0%A6%9C%E0%A7%81%E0%A6%B0-%E0%A6%9A%E0%A6%95%E0%A6%B2%E0%A7%87%E0%A6%9F-2_a31drf.webp",
      packaging: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419573/%E0%A6%96%E0%A7%87%E0%A6%9C%E0%A7%81%E0%A6%B0-%E0%A6%9A%E0%A6%95%E0%A6%B2%E0%A7%87%E0%A6%9F-2_a31drf.webp",
      inside: "https://placehold.co/600x600/402014/D8F3B0?text=Inside+Dates"
    },
    featured: true, available: true, allergens: ["দুধ", "বাদাম"]
  },
  {
    id: "combo-05", slug: "romantic-gift-box", name: "রোমান্টিক গিফট বক্স",
    description: "প্রিয়জনকে উপহার দেওয়ার জন্য আকর্ষণীয় হার্ট শেপ চকলেটের বক্স।",
    detailDescription: "ভালোবাসা প্রকাশের সেরা মাধ্যম। সুন্দর লাল রঙের প্যাকেজিংয়ে সাজানো প্রিমিয়াম ট্রাফলস।",
    price: 750, compareAtPrice: null, itemCount: 8, totalWeightGrams: 200,
    countryOfOrigin: "সিঙ্গাপুর", brand: "LoveBites",
    items: [{ name: "Strawberry Truffle", quantity: 4, unitType: "piece", unitLabel: "পিস" }, { name: "Dark Truffle", quantity: 4, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419005/signature-indulgent-box_2_a5dgtp.webp",
      packaging: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419005/luxe-bloom-n-treat-hamper_1_p8bndq.webp",
      inside: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419006/gourmet-chocolate-n-rouge-reverie-decadence-box_3_j5pzu1.webp"
    },
    featured: false, available: true, allergens: ["দুধ", "সয়া"]
  },
  {
    id: "combo-06", slug: "mixed-nuts-crunch", name: "মিক্সড নাটস ক্রাঞ্চ",
    description: "কাজু, পেস্তা এবং কাঠবাদাম সমৃদ্ধ ক্রাঞ্চি চকলেটের মেলা।",
    detailDescription: "প্রতিটি বাইটে পাবেন বাদামের ক্রাঞ্চ। যারা একটু ভিন্ন স্বাদ খুঁজছেন তাদের জন্য পারফেক্ট।",
    price: 550, compareAtPrice: 600, itemCount: 6, totalWeightGrams: 210,
    countryOfOrigin: "ভারত", brand: "NuttyChoc",
    items: [{ name: "Almond Crunch", quantity: 2, unitType: "piece", unitLabel: "পিস" }, { name: "Cashew Delight", quantity: 2, unitType: "piece", unitLabel: "পিস" }, { name: "Pistachio Square", quantity: 2, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/D8F3B0/402014?text=Nuts+Crunch",
      packaging: "https://placehold.co/600x600/402014/FFFBEA?text=Nuts+Wrapper",
      inside: "https://placehold.co/600x600/402014/D8F3B0?text=Inside+Nuts"
    },
    featured: false, available: true, allergens: ["দুধ", "বাদাম"]
  },
  {
    id: "combo-07", slug: "kiwi-crafted-chocolate", name: "কিউই ক্রাফটেড চকলেট",
    description: "নিউজিল্যান্ডের বিখ্যাত ডেইরি থেকে তৈরি পিওর মিল্ক চকলেট।",
    detailDescription: "নিউজিল্যান্ডের বিশুদ্ধ দুধ থেকে তৈরি এই চকলেট মুখে দিলেই গলে যাবে। অনন্য এক অভিজ্ঞতা।",
    price: 1200, compareAtPrice: 1350, itemCount: 10, totalWeightGrams: 250,
    countryOfOrigin: "নিউজিল্যান্ড", brand: "KiwiDairy",
    items: [{ name: "Pure Milk Chocolate", quantity: 10, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419843/images_2_exgwql.jpg",
      packaging: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419844/images_e82uyv.jpg",
      inside: "https://res.cloudinary.com/dfkg9envn/image/upload/v1792419843/images_1_x7xloq.jpg"
    },
    featured: true, available: true, allergens: ["দুধ"]
  },
  {
    id: "combo-08", slug: "thai-delight-pack", name: "থাই ডিলাইট প্যাক",
    description: "থাইল্যান্ডের জনপ্রিয় ফ্রুট ফ্লেভার্ড চকলেটের চমৎকার বক্স।",
    detailDescription: "ম্যাঙ্গো এবং ডুরিয়ান ফ্লেভারের এক্সোটিক চকলেট। ভিন্ন স্বাদের সন্ধানীদের জন্য।",
    price: 480, compareAtPrice: null, itemCount: 8, totalWeightGrams: 160,
    countryOfOrigin: "থাইল্যান্ড", brand: "ThaiSweets",
    items: [{ name: "Mango Chocolate", quantity: 4, unitType: "piece", unitLabel: "পিস" }, { name: "Durian Chocolate", quantity: 4, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/D8F3B0/402014?text=Thai+Delight",
      packaging: "https://placehold.co/600x600/EBF7D3/402014?text=Thai+Wrapper",
      inside: "https://placehold.co/600x600/FFFBEA/402014?text=Inside+Thai"
    },
    featured: false, available: true, allergens: ["দুধ", "সয়া"]
  },
  {
    id: "combo-09", slug: "luxury-truffle-collection", name: "লাক্সারি ট্রাফল কালেকশন",
    description: "বিশেষ মুহূর্ত উদযাপনের জন্য এক্সক্লুসিভ ট্রাফল চকলেটের বক্স।",
    detailDescription: "সেরা মানের কোকোয়া থেকে তৈরি এই ট্রাফলগুলো আপনার উৎসবকে করবে আরও রঙিন।",
    price: 1450, compareAtPrice: 1600, itemCount: 12, totalWeightGrams: 300,
    countryOfOrigin: "সিঙ্গাপুর", brand: "LuxChoco",
    items: [{ name: "Hazelnut Truffle", quantity: 6, unitType: "piece", unitLabel: "পিস" }, { name: "Caramel Truffle", quantity: 6, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/402014/D8F3B0?text=Luxury+Truffles",
      packaging: "https://placehold.co/600x600/D8F3B0/402014?text=Luxury+Wrapper",
      inside: "https://placehold.co/600x600/402014/FFFBEA?text=Inside+Luxury"
    },
    featured: true, available: true, allergens: ["দুধ", "বাদাম"]
  },
  {
    id: "combo-10", slug: "budget-friendly-pack", name: "বাজেট ফ্রেন্ডলি প্যাক",
    description: "সাশ্রয়ী মূল্যে দারুণ সব চকলেটের একটি ছোট এবং কিউট কম্বো।",
    detailDescription: "প্রতিদিনের চকলেট ক্রেভিং মেটাতে এই প্যাকটি অনবদ্য। কম দামে সেরা মান।",
    price: 250, compareAtPrice: null, itemCount: 4, totalWeightGrams: 100,
    countryOfOrigin: "বাংলাদেশ", brand: "Chocoঝুড়ি",
    items: [{ name: "Classic Milk", quantity: 2, unitType: "piece", unitLabel: "পিস" }, { name: "Classic Dark", quantity: 2, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/402014/FFFBEA?text=Budget+Pack",
      packaging: "https://placehold.co/600x600/402014/D8F3B0?text=Budget+Wrapper",
      inside: "https://placehold.co/600x600/FFFBEA/402014?text=Inside+Budget"
    },
    featured: false, available: true, allergens: ["দুধ"]
  },
  {
    id: "combo-11", slug: "mega-celebration-box", name: "মেগা সেলিব্রেশন বক্স",
    description: "বিয়ে, জন্মদিন বা বড় কোনো অনুষ্ঠানের জন্য বিশাল চকলেটের বক্স।",
    detailDescription: "সবাইকে নিয়ে ভাগ করে খাওয়ার জন্য ১৬ পিসের এই বিশাল বক্সটি তৈরি করা হয়েছে।",
    price: 1800, compareAtPrice: 2000, itemCount: 16, totalWeightGrams: 450,
    countryOfOrigin: "দুবাই / সংযুক্ত আরব আমিরাত", brand: "ArabianSweets",
    items: [{ name: "Assorted Chocolates", quantity: 16, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/D8F3B0/402014?text=Mega+Box",
      packaging: "https://placehold.co/600x600/402014/D8F3B0?text=Mega+Wrapper",
      inside: "https://placehold.co/600x600/402014/FFFBEA?text=Inside+Mega"
    },
    featured: false, available: true, allergens: ["দুধ", "বাদাম", "সয়া"]
  },
  {
    id: "combo-12", slug: "family-sharing-pack", name: "ফ্যামিলি শেয়ারিং প্যাক",
    description: "পরিবারের সবার সাথে আনন্দ ভাগাভাগি করার জন্য মাঝারি সাইজের বক্স।",
    detailDescription: "উইকেন্ডে মুভি দেখার সময় বা আড্ডায় এই বক্সটি দারুণ মানিয়ে যাবে।",
    price: 600, compareAtPrice: 650, itemCount: 8, totalWeightGrams: 220,
    countryOfOrigin: "ভারত", brand: "SweetTreat",
    items: [{ name: "Milk Bar", quantity: 4, unitType: "piece", unitLabel: "পিস" }, { name: "Crispy Bite", quantity: 4, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/402014/FFFBEA?text=Family+Pack",
      packaging: "https://placehold.co/600x600/D8F3B0/402014?text=Family+Wrapper",
      inside: "https://placehold.co/600x600/EBF7D3/402014?text=Inside+Family"
    },
    featured: false, available: true, allergens: ["দুধ", "গম"]
  },
  {
    id: "combo-13", slug: "saudi-special-dates", name: "সৌদি স্পেশাল ডেটস চকলেট",
    description: "সৌদি আরবের আজওয়া খেজুর ও প্রিমিয়াম চকলেটের মেলবন্ধন।",
    detailDescription: "স্বাস্থ্যকর এবং সুস্বাদু এই কম্বোটি মুরুব্বিদের উপহার দেওয়ার জন্য খুব ভালো।",
    price: 1100, compareAtPrice: 1250, itemCount: 10, totalWeightGrams: 300,
    countryOfOrigin: "সৌদি আরব", brand: "DesertSweets",
    items: [{ name: "Ajwa Chocolate Coated", quantity: 10, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/402014/D8F3B0?text=Saudi+Dates",
      packaging: "https://placehold.co/600x600/402014/FFFBEA?text=Saudi+Wrapper",
      inside: "https://placehold.co/600x600/402014/FFFBEA?text=Inside+Saudi"
    },
    featured: false, available: true, allergens: ["দুধ"]
  },
  {
    id: "combo-14", slug: "white-chocolate-fantasy", name: "হোয়াইট চকলেট ফ্যান্টাসি",
    description: "বিশুদ্ধ কোকোয়া বাটার থেকে তৈরি ক্রিমি হোয়াইট চকলেটের বক্স।",
    detailDescription: "যারা হোয়াইট চকলেট পছন্দ করেন তাদের জন্য স্পেশাল এডিশন। মুখে দিলেই ভিন্ন এক অনুভুতি।",
    price: 520, compareAtPrice: null, itemCount: 6, totalWeightGrams: 180,
    countryOfOrigin: "সিঙ্গাপুর", brand: "LuxChoco",
    items: [{ name: "Pure White Chocolate", quantity: 6, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/FFFBEA/402014?text=White+Fantasy",
      packaging: "https://placehold.co/600x600/EBF7D3/402014?text=White+Wrapper",
      inside: "https://placehold.co/600x600/D8F3B0/402014?text=Inside+White"
    },
    featured: false, available: true, allergens: ["দুধ"]
  },
  {
    id: "combo-15", slug: "special-birthday-combo", name: "স্পেশাল বার্থডে কম্বো",
    description: "শুভ জন্মদিনের শুভেচ্ছা জানাতে বিশেষভাবে ডিজাইন করা বক্স।",
    detailDescription: "রঙিন মোড়কে সাজানো এই বক্সটিতে রয়েছে নানা স্বাদের চকলেট এবং একটি ছোট গ্রিটিংস কার্ড।",
    price: 680, compareAtPrice: 750, itemCount: 8, totalWeightGrams: 240,
    countryOfOrigin: "বাংলাদেশ", brand: "Chocoঝুড়ি",
    items: [{ name: "Birthday Special Assortment", quantity: 8, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/402014/FFFBEA?text=Birthday+Combo",
      packaging: "https://placehold.co/600x600/EBF7D3/402014?text=Birthday+Wrapper",
      inside: "https://placehold.co/600x600/D8F3B0/402014?text=Inside+Birthday"
    },
    featured: true, available: true, allergens: ["দুধ", "সয়া"]
  },
  {
    id: "combo-16", slug: "anniversary-special", name: "এনিভার্সারি স্পেশাল",
    description: "বিবাহ বার্ষিকী উদযাপনের জন্য আকর্ষণীয় প্রিমিয়াম চকলেট কালেকশন।",
    detailDescription: "ভালোবাসার দিনটিকে আরও স্পেশাল করতে চমৎকার গোল্ডেন প্যাকেজিংয়ে এই বক্সটি ডিজাইন করা হয়েছে।",
    price: 950, compareAtPrice: null, itemCount: 10, totalWeightGrams: 280,
    countryOfOrigin: "দুবাই / সংযুক্ত আরব আমিরাত", brand: "ArabianSweets",
    items: [{ name: "Gold Wrapped Truffles", quantity: 5, unitType: "piece", unitLabel: "পিস" }, { name: "Dark Velvet", quantity: 5, unitType: "piece", unitLabel: "পিস" }],
    images: {
      chocolate: "https://placehold.co/600x600/D8F3B0/402014?text=Anniversary+Box",
      packaging: "https://placehold.co/600x600/402014/FFFBEA?text=Anniversary+Wrapper",
      inside: "https://placehold.co/600x600/402014/D8F3B0?text=Inside+Anniversary"
    },
    featured: false, available: true, allergens: ["দুধ", "বাদাম"]
  }
];

const CUSTOM_PRODUCTS = [
  {
    id: "cus-001", name: "মিল্ক চকলেট", description: "অরিজিনাল ডেইরি মিল্কের স্বাদ",
    image: "https://placehold.co/400x400/402014/FFFBEA?text=Milk+Choco",
    unitType: "piece", unitLabel: "পিস", unitPrice: 50, weightGrams: 20, piecesPerPackage: 1, minOrderQuantity: 1, quantityStep: 1, available: true
  },
  {
    id: "cus-002", name: "চকলেট গিফট বক্স", description: "আকর্ষণীয় মোড়কে ১২ পিসের বক্স",
    image: "https://placehold.co/400x400/402014/D8F3B0?text=Gift+Box",
    unitType: "box", unitLabel: "বক্স", unitPrice: 500, weightGrams: 250, piecesPerPackage: 12, minOrderQuantity: 1, quantityStep: 1, available: true
  },
  {
    id: "cus-003", name: "হেজেলনাট স্প্রেড", description: "রুটি বা বিস্কুটের সাথে খাওয়ার পেস্ট",
    image: "https://placehold.co/400x400/D8F3B0/402014?text=Choco+Jar",
    unitType: "jar", unitLabel: "জার", unitPrice: 350, weightGrams: 300, piecesPerPackage: 0, minOrderQuantity: 1, quantityStep: 1, available: true
  },
  {
    id: "cus-004", name: "অ্যাসর্টেড লুজ চকলেট", description: "ওজন অনুযায়ী বিভিন্ন স্বাদের মিশ্রণ",
    image: "https://placehold.co/400x400/402014/EBF7D3?text=Loose+Choco",
    unitType: "gram", unitLabel: "গ্রাম", unitPrice: 150, weightGrams: 100, piecesPerPackage: 0, minOrderQuantity: 100, quantityStep: 100, available: true
  },
  {
    id: "cus-005", name: "প্রিমিয়াম ডার্ক চকলেট", description: "৭০% কোকোয়া সমৃদ্ধ ডার্ক চকলেট",
    image: "https://placehold.co/400x400/402014/D8F3B0?text=Dark+Piece",
    unitType: "piece", unitLabel: "পিস", unitPrice: 80, weightGrams: 25, piecesPerPackage: 1, minOrderQuantity: 1, quantityStep: 1, available: true
  },
  {
    id: "cus-006", name: "ক্যারামেল ট্রাফলস", description: "ভেতরে ক্যারামেল যুক্ত স্পেশাল বক্স",
    image: "https://placehold.co/400x400/D8F3B0/402014?text=Truffle+Box",
    unitType: "box", unitLabel: "বক্স", unitPrice: 650, weightGrams: 320, piecesPerPackage: 16, minOrderQuantity: 1, quantityStep: 1, available: true
  }
];

const DISCOUNT_CONFIG = {
  enabled: true,
  minimumSubtotal: 200,
  tierAmount: 200,
  discountPerTierPercent: 2,
  maximumDiscountPercent: 10
};

const formatPrice = (price) => {
  return `${SITE_CONFIG.currency} ${Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

const generateOrderMessage = (customer, product, deliveryCharge, grandTotal) => {
  const isCustom = product.isCustom;
  
  const itemsList = product.items.map((item, index) => {
    if (isCustom) {
      if (item.unitType === 'gram') {
        return `${index + 1}. ${item.name} — ${item.quantity} ${item.unitLabel} = ${SITE_CONFIG.currency}${Math.round(item.lineTotal)}`;
      } else {
        return `${index + 1}. ${item.name} — ${item.quantity} ${item.unitLabel} × ${SITE_CONFIG.currency}${item.unitPrice} = ${SITE_CONFIG.currency}${Math.round(item.lineTotal)}`;
      }
    } else {
      return `${index + 1}. ${item.name} — ${item.quantity} ${item.unitLabel}`;
    }
  }).join('\n');

  let priceSection = "";
  if (isCustom && product.discountAmount > 0) {
    priceSection = `পণ্যের মোট মূল্য: ${SITE_CONFIG.currency}${Math.round(product.subtotal)}
ছাড়: ${product.discountPercent}% = ${SITE_CONFIG.currency}${Math.round(product.discountAmount)}
ডেলিভারি চার্জ: ${SITE_CONFIG.currency}${deliveryCharge}
সর্বমোট মূল্য: ${SITE_CONFIG.currency}${Math.round(grandTotal)}`;
  } else {
    priceSection = `প্যাকেজের মূল্য: ${SITE_CONFIG.currency}${Math.round(product.price)}
ডেলিভারি চার্জ: ${SITE_CONFIG.currency}${deliveryCharge}
সর্বমোট মূল্য: ${SITE_CONFIG.currency}${Math.round(grandTotal)}`;
  }

  const pieceCountText = product.itemCount > 0 ? `মোট চকলেট: ${product.itemCount} পিস\n` : '';
  const weightText = product.totalWeightGrams > 0 ? `মোট ওজন: ${product.totalWeightGrams} গ্রাম` : '';

  return `🛒 নতুন অর্ডারের অনুরোধ — Chocoঝুড়ি

অর্ডার করা কম্বো: ${product.name}

📦 প্যাকেজের বিস্তারিত:
${itemsList}

${pieceCountText}${weightText}

${priceSection}

👤 কাস্টমারের তথ্য:
নাম: ${customer.name}
মোবাইল: ${customer.phone}
ঠিকানা: ${customer.address}

💵 পেমেন্ট: সম্পূর্ণ ক্যাশ অন ডেলিভারি
পণ্য হাতে পেয়ে রাইডারকে টাকা প্রদান করব।

অর্ডার নিশ্চিত করার জন্য এই অর্ডারের বিস্তারিত গ্রহণ করে নিশ্চিত করুন।`;
};

// Clipboard helper with fallback
const copyToClipboard = (text, onSuccess, onError) => {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => onSuccess())
      .catch(() => fallbackCopyTextToClipboard(text, onSuccess, onError));
  } else {
    fallbackCopyTextToClipboard(text, onSuccess, onError);
  }
};

const fallbackCopyTextToClipboard = (text, onSuccess, onError) => {
  let textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    let successful = document.execCommand('copy');
    if (successful) {
      onSuccess();
    } else {
      onError();
    }
  } catch (err) {
    onError();
  }
  document.body.removeChild(textArea);
};

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#402014] text-[#FFFBEA] hover:bg-[#2A150D]",
    secondary: "bg-[#D8F3B0] text-[#402014] hover:bg-[#C2E890]",
    outline: "border-2 border-[#402014] text-[#402014] hover:bg-[#D8F3B0]",
    ghost: "text-[#402014] hover:bg-[#D8F3B0]",
    success: "bg-[#21865B] text-white hover:bg-[#1A6B48]",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className} px-4 py-2 text-sm md:text-base`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, error, ...props }) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-medium text-[#402014] mb-1">{label}</label>
    <input 
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8F3B0] bg-white text-[#402014] ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...props} 
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex items-center bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
      {type === 'success' ? <Check className="w-5 h-5 mr-2 text-green-400" /> : <AlertCircle className="w-5 h-5 mr-2 text-red-400" />}
      <span className="text-sm">{message}</span>
    </div>
  );
};

const ProductModal = ({ product, isOpen, onClose, onOrder }) => {
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveImage(0);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const images = [product.images.chocolate, product.images.packaging, product.images.inside];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-[#FFFBEA] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col md:flex-row relative"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-[#402014] hover:bg-[#EBF7D3] transition">
          <X className="w-5 h-5" />
        </button>

        {/* Image Gallery */}
        <div className="w-full md:w-1/2 p-4 md:p-6 bg-white flex flex-col">
          <div className="aspect-square rounded-xl overflow-hidden mb-4 relative bg-gray-100">
            <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="flex gap-2 justify-center">
            {images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#402014] scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="mb-2">
            <span className="inline-block px-2 py-1 bg-[#EBF7D3] text-[#402014] text-xs font-bold rounded mb-2">
              {product.countryOfOrigin} • {product.brand}
            </span>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-[#402014] leading-tight">{product.name}</h2>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-[#21865B]">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <p className="text-[#5E4D46] mb-6 leading-relaxed text-sm md:text-base">{product.detailDescription || product.description}</p>

          <div className="bg-white p-4 rounded-xl border border-[#EBF7D3] mb-6 text-sm">
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <div className="flex flex-col">
                <span className="text-gray-500">মোট পিস</span>
                <span className="font-semibold text-[#402014]">{product.itemCount > 0 ? `${product.itemCount} টি` : 'প্রযোজ্য নয়'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">মোট ওজন</span>
                <span className="font-semibold text-[#402014]">{product.totalWeightGrams > 0 ? `${product.totalWeightGrams} গ্রাম` : 'প্রযোজ্য নয়'}</span>
              </div>
              {product.allergens && product.allergens.length > 0 && (
                <div className="flex flex-col col-span-2 mt-2 pt-2 border-t border-gray-100">
                  <span className="text-gray-500">অ্যালার্জেন তথ্য</span>
                  <span className="text-red-600/80 font-medium">{product.allergens.join(", ")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-[#402014] mb-2">প্যাকেজে যা যা থাকছে:</h3>
            <ul className="list-disc list-inside text-[#5E4D46] text-sm space-y-1">
              {product.items.map((item, idx) => (
                <li key={idx}>{item.name} - {item.quantity} {item.unitLabel}</li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <div className="flex items-start gap-2 mb-4 p-3 bg-green-50 text-green-800 rounded-lg text-sm">
              <Truck className="w-5 h-5 shrink-0" />
              <p>সম্পূর্ণ ক্যাশ অন ডেলিভারি। হাতে পণ্য পেয়ে রাইডারকে টাকা প্রদান করুন।</p>
            </div>
            <Button className="w-full py-4 text-lg" onClick={() => { onClose(); onOrder(product); }}>
              <ShoppingCart className="w-5 h-5 mr-2" /> এই কম্বো অর্ডার করুন
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderModal = ({ product, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '', area: 'inside' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setIsCopied(false);
      setShowSummary(true);
    } else {
      document.body.style.overflow = 'auto';
      setCustomer({ name: '', phone: '', address: '', area: 'inside' });
      setErrors({});
      setIsCopied(false);
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    setIsCopied(false);
  }, [customer, product]);

  if (!isOpen || !product) return null;

  const validateForm = () => {
    const newErrors = {};
    if (customer.name.trim().length < 3) newErrors.name = "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
    if (!/^(\+8801|01)[3-9]\d{8}$/.test(customer.phone)) newErrors.phone = "সঠিক বাংলাদেশী মোবাইল নম্বর দিন।";
    if (customer.address.trim().length < 5) newErrors.address = "সম্পূর্ণ ঠিকানা প্রদান করুন।";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const deliveryCharge = customer.area === 'inside' ? SITE_CONFIG.deliveryFee.insideDhaka : SITE_CONFIG.deliveryFee.outsideDhaka;
  const grandTotal = product.price + deliveryCharge;
  const orderMessageText = generateOrderMessage(customer, product, deliveryCharge, grandTotal);

  const handleCopy = () => {
    copyToClipboard(
      orderMessageText,
      () => {
        setIsCopied(true);
        setToast({ message: "অর্ডারের সম্পূর্ণ তথ্য কপি করা হয়েছে!", type: "success" });
      },
      () => setToast({ message: "কপি করতে সমস্যা হয়েছে। দয়া করে টেক্সট বক্সে ক্লিক করে ম্যানুয়ালি কপি করুন।", type: "error" })
    );
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}`, '_blank', 'noopener,noreferrer');
  };

  const openMessenger = () => {
    window.open(`https://m.me/${SITE_CONFIG.messengerPageId}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative"
        onClick={e => e.stopPropagation()}
        role="dialog"
      >
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-playfair font-bold text-[#402014]">অর্ডার নিশ্চিতকরণ</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center mb-8 relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-[#402014] text-[#FFFBEA]' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <div className={`flex-1 h-1 mx-2 rounded ${step >= 2 ? 'bg-[#402014]' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-[#402014] text-[#FFFBEA]' : 'bg-gray-200 text-gray-500'}`}>2</div>
          </div>

          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="font-semibold text-lg mb-4 text-[#402014]">আপনার তথ্য দিন</h3>
              <Input 
                label="আপনার নাম" 
                placeholder="যেমন: রহিম ইসলাম" 
                value={customer.name}
                onChange={e => setCustomer({...customer, name: e.target.value})}
                error={errors.name}
              />
              <Input 
                label="মোবাইল নম্বর" 
                placeholder="01XXXXXXXXX" 
                value={customer.phone}
                onChange={e => setCustomer({...customer, phone: e.target.value})}
                error={errors.phone}
                type="tel"
              />
              <Input 
                label="সম্পূর্ণ ডেলিভারি ঠিকানা" 
                placeholder="বাসা/ফ্ল্যাট, রোড, এলাকা, শহর" 
                value={customer.address}
                onChange={e => setCustomer({...customer, address: e.target.value})}
                error={errors.address}
              />
              <div className="mb-4 w-full">
                <label className="block text-sm font-medium text-[#402014] mb-1">ডেলিভারি এরিয়া</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D8F3B0] bg-white text-[#402014]"
                  value={customer.area}
                  onChange={e => setCustomer({...customer, area: e.target.value})}
                >
                  <option value="inside">ঢাকার ভেতরে (৳{SITE_CONFIG.deliveryFee.insideDhaka})</option>
                  <option value="outside">ঢাকার বাইরে (৳{SITE_CONFIG.deliveryFee.outsideDhaka})</option>
                </select>
              </div>
              <div className="mt-6">
                <Button className="w-full py-3" onClick={handleNext}>পরবর্তী ধাপে যান</Button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="bg-[#FFFBEA] rounded-xl p-4 mb-6 border border-[#EBF7D3]">
                <h4 
                  className="font-semibold text-[#402014] border-b border-[#D8F3B0] pb-2 mb-3 flex items-center justify-between cursor-pointer" 
                  onClick={() => setShowSummary(!showSummary)}
                >
                  <span>সম্পূর্ণ অর্ডার তথ্য</span>
                  <ChevronDown className={`w-5 h-5 text-[#402014] transition-transform duration-300 ${showSummary ? 'rotate-180' : ''}`} />
                </h4>
                
                {showSummary && (
                  <textarea 
                    readOnly 
                    className="w-full text-sm text-[#5E4D46] bg-white p-4 rounded-lg border border-gray-200 h-56 focus:outline-none focus:ring-2 focus:ring-[#D8F3B0] resize-none whitespace-pre-wrap leading-relaxed shadow-inner"
                    value={orderMessageText}
                    onClick={(e) => e.target.select()}
                  />
                )}
              </div>

              <div className="text-center mb-5">
                <p className="text-sm font-medium text-red-700 bg-red-50 p-3 rounded-lg border border-red-200 leading-relaxed text-balance shadow-sm">
                  প্রথমে সম্পূর্ণ অর্ডার তথ্য কপি করুন। তারপর WhatsApp অথবা Messenger খুলে মেসেজটি পেস্ট করে পাঠান। বিক্রেতা অর্ডার নিশ্চিত করলে আপনার অর্ডার প্রক্রিয়া সম্পন্ন হবে।
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  className={`w-full py-3.5 shadow-sm text-base ${isCopied ? 'bg-[#21865B] hover:bg-[#1A6B48] text-white' : 'bg-[#402014] hover:bg-[#2A150D] text-[#FFFBEA]'}`} 
                  onClick={handleCopy}
                >
                  {isCopied ? <Check className="w-5 h-5 mr-2 shrink-0" /> : <Copy className="w-5 h-5 mr-2 shrink-0" />}
                  <span className="truncate">{isCopied ? 'সম্পূর্ণ তথ্য কপি করা হয়েছে!' : 'অর্ডারের সম্পূর্ণ তথ্য কপি করুন'}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className={`w-full py-3.5 transition-all duration-300 border-none ${!isCopied ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md'}`} 
                  onClick={openWhatsApp}
                  disabled={!isCopied}
                >
                  <MessageCircle className="w-5 h-5 mr-2 shrink-0" /> <span className="truncate">WhatsApp-এ অর্ডার নিশ্চিত করুন</span>
                </Button>
                
                <Button 
                  variant="primary" 
                  className={`w-full py-3.5 transition-all duration-300 border-none ${!isCopied ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`} 
                  onClick={openMessenger}
                  disabled={!isCopied}
                >
                  <FaFacebook className="w-5 h-5 mr-2 shrink-0" /> <span className="truncate">Messenger-এ অর্ডার নিশ্চিত করুন</span>
                </Button>
              </div>
              <button className="mt-5 text-sm text-gray-500 w-full text-center hover:text-[#402014] hover:underline font-medium transition-colors" onClick={() => setStep(1)}>
                তথ্য পরিবর্তন করতে পেছনে যান
              </button>
            </div>
          )}
        </div>
      </div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

const CustomComboBuilder = ({ onOrderCustom }) => {
  const [selectedItems, setSelectedItems] = useState({});
  
  const handleAdd = (item) => {
    setSelectedItems(prev => {
      const current = prev[item.id] || 0;
      const next = current === 0 ? item.minOrderQuantity : current + item.quantityStep;
      return { ...prev, [item.id]: next };
    });
  };
  
  const handleRemove = (item) => {
    setSelectedItems(prev => {
      const current = prev[item.id] || 0;
      if (current <= item.minOrderQuantity) {
        const newState = { ...prev };
        delete newState[item.id];
        return newState;
      }
      return { ...prev, [item.id]: current - item.quantityStep };
    });
  };

  const stats = useMemo(() => {
    let subtotal = 0;
    let totalPieces = 0;
    let totalWeight = 0;
    const itemsList = [];
    
    Object.entries(selectedItems).forEach(([id, qty]) => {
      const itemDef = CUSTOM_PRODUCTS.find(i => i.id === id);
      if (itemDef) {
        let lineTotal = 0;
        let itemWeight = 0;
        let itemPieces = 0;

        if (itemDef.unitType === 'gram') {
          lineTotal = (qty / itemDef.quantityStep) * itemDef.unitPrice;
          itemWeight = qty;
        } else {
          lineTotal = qty * itemDef.unitPrice;
          itemWeight = qty * itemDef.weightGrams;
          itemPieces = qty * (itemDef.piecesPerPackage || 0);
        }

        subtotal += lineTotal;
        totalWeight += itemWeight;
        totalPieces += itemPieces;

        itemsList.push({
          id: itemDef.id,
          name: itemDef.name,
          quantity: qty,
          unitType: itemDef.unitType,
          unitLabel: itemDef.unitLabel,
          unitPrice: itemDef.unitPrice,
          lineTotal: lineTotal
        });
      }
    });
    
    let discountPercent = 0;
    let discountAmount = 0;

    if (DISCOUNT_CONFIG.enabled && subtotal >= DISCOUNT_CONFIG.minimumSubtotal) {
      const tiers = Math.floor(subtotal / DISCOUNT_CONFIG.tierAmount);
      discountPercent = Math.min(tiers * DISCOUNT_CONFIG.discountPerTierPercent, DISCOUNT_CONFIG.maximumDiscountPercent);
      discountAmount = Math.round((subtotal * discountPercent) / 100);
    }

    const finalPrice = subtotal - discountAmount;

    return { 
      subtotal, 
      discountPercent, 
      discountAmount, 
      finalPrice, 
      totalPieces, 
      totalWeight, 
      itemsList 
    };
  }, [selectedItems]);

  const handleOrder = () => {
    if (stats.itemsList.length === 0 || stats.finalPrice <= 0) return;
    
    const customProduct = {
      id: "custom-combo",
      name: "কাস্টম তৈরি চকলেট কম্বো",
      isCustom: true,
      price: stats.finalPrice,
      subtotal: stats.subtotal,
      discountPercent: stats.discountPercent,
      discountAmount: stats.discountAmount,
      totalWeightGrams: stats.totalWeight,
      itemCount: stats.totalPieces,
      images: {
        chocolate: "https://placehold.co/600x600/402014/D8F3B0?text=Custom+Combo",
        packaging: "https://placehold.co/600x600/402014/FFFBEA?text=Custom+Wrapper",
        inside: "https://placehold.co/600x600/D8F3B0/402014?text=Inside+Custom"
      },
      countryOfOrigin: "মাল্টিপল",
      brand: "Chocoঝুড়ি কাস্টম",
      detailDescription: "আপনার নিজের পছন্দমত বাছাই করা চকলেটের স্পেশাল কম্বো বক্স।",
      items: stats.itemsList
    };
    
    onOrderCustom(customProduct);
  };

  return (
    <section id="combo-builder" className="py-16 bg-[#EBF7D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#402014] mb-4">নিজের কম্বো তৈরি করুন</h2>
          <p className="text-[#402014] max-w-2xl mx-auto">আপনার পছন্দের চকলেটগুলো বেছে নিয়ে নিজেই তৈরি করুন স্পেশাল একটি বক্স। পরিমাপ এবং প্যাকেট নির্বাচন করুন।</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUSTOM_PRODUCTS.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border border-transparent hover:border-[#D8F3B0] flex flex-col overflow-hidden">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute top-2 left-2 bg-[#402014] text-[#D8F3B0] text-xs font-bold px-2 py-1 rounded">
                    {formatPrice(item.unitPrice)} / {item.unitType === 'gram' ? `${item.quantityStep} ` : ''}{item.unitLabel}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-bold text-[#402014] mb-1 leading-tight">{item.name}</h4>
                  <p className="text-xs text-[#5E4D46] mb-3 flex-1">{item.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    {selectedItems[item.id] ? (
                      <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1 w-full justify-between">
                        <button 
                          onClick={() => handleRemove(item)}
                          className="p-1.5 rounded bg-white text-gray-600 hover:text-red-500 shadow-sm"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-[#402014] text-sm">
                          {selectedItems[item.id]} {item.unitLabel}
                        </span>
                        <button 
                          onClick={() => handleAdd(item)}
                          className="p-1.5 rounded bg-white text-gray-600 hover:text-green-600 shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full text-sm py-2"
                        onClick={() => handleAdd(item)}
                      >
                        <Plus className="w-4 h-4 mr-1" /> যোগ করুন
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-[#402014] border-b border-gray-100 pb-4 mb-4">আপনার কম্বো সামারি</h3>
              
              {stats.itemsList.length === 0 ? (
                <div className="text-center text-gray-400 py-10">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-20" />
                  <p>কোনো পণ্য নির্বাচন করা হয়নি</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-3 text-sm">
                    {stats.itemsList.map(item => (
                      <div key={item.id} className="flex justify-between items-start border-b border-gray-50 pb-2">
                        <div>
                          <p className="font-medium text-[#402014]">{item.name}</p>
                          <p className="text-xs text-[#5E4D46]">{item.quantity} {item.unitLabel} × {formatPrice(item.unitPrice)}</p>
                        </div>
                        <span className="font-semibold text-[#402014] whitespace-nowrap">{formatPrice(item.lineTotal)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-[#FFFBEA] p-4 rounded-xl space-y-2 text-sm border border-[#EBF7D3]">
                    {stats.totalPieces > 0 && (
                      <div className="flex justify-between text-[#5E4D46]">
                        <span>মোট পিস (নিশ্চিত):</span>
                        <span className="font-medium text-[#402014]">{stats.totalPieces} পিস</span>
                      </div>
                    )}
                    {stats.totalWeight > 0 && (
                      <div className="flex justify-between text-[#5E4D46]">
                        <span>মোট ওজন:</span>
                        <span className="font-medium text-[#402014]">{stats.totalWeight}g</span>
                      </div>
                    )}
                    
                    <div className="pt-2 border-t border-[#D8F3B0] mt-2 space-y-1">
                      <div className="flex justify-between text-[#5E4D46]">
                        <span>পণ্যের মোট মূল্য:</span>
                        <span className="text-[#402014] font-medium">{formatPrice(stats.subtotal)}</span>
                      </div>
                      
                      {stats.discountAmount > 0 && (
                        <div className="flex justify-between text-[#21865B] font-medium">
                          <span>কম্বো ছাড় ({stats.discountPercent}%):</span>
                          <span>- {formatPrice(stats.discountAmount)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-lg font-bold text-[#402014] pt-2">
                        <span>সর্বমোট:</span>
                        <span>{formatPrice(stats.finalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full py-3.5 text-lg shadow-md" 
                    onClick={handleOrder}
                  >
                    অর্ডার করতে এগিয়ে যান
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductSection = ({ onOpenDetails, onOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCountry, setFilterCountry] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCountry = filterCountry === "all" || p.countryOfOrigin === filterCountry;
      return matchSearch && matchCountry;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'featured') return (b.featured === a.featured) ? 0 : b.featured ? 1 : -1;
      return 0;
    });
  }, [searchTerm, filterCountry, sortBy]);

  const uniqueCountries = ["all", ...new Set(PRODUCTS.map(p => p.countryOfOrigin))];

  return (
    <section id="products" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#402014] mb-4">আমাদের কালেকশন</h2>
        <p className="text-[#5E4D46] max-w-2xl mx-auto text-balance">প্রিমিয়াম ব্র্যান্ডের এক্সক্লুসিভ চকলেট প্যাকেজগুলো থেকে বেছে নিন আপনার পছন্দেরটি।</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-center justify-between border border-gray-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="চকলেট বা ব্র্যান্ড খুঁজুন..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-[#D8F3B0] outline-none text-[#402014]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-3 overflow-x-auto hide-scrollbar pb-1 md:pb-0">
          <select 
            className="bg-gray-50 border-none px-4 py-2 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#D8F3B0] text-[#402014] min-w-max"
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
          >
            <option value="all">সব দেশ</option>
            {uniqueCountries.filter(c => c !== 'all').map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          
          <select 
            className="bg-gray-50 border-none px-4 py-2 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#D8F3B0] text-[#402014] min-w-max"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">জনপ্রিয় পছন্দ</option>
            <option value="price-low">মূল্য: কম থেকে বেশি</option>
            <option value="price-high">মূল্য: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium text-gray-600">কোনো চকলেট পাওয়া যায়নি</h3>
          <p className="text-gray-400 mt-2">অনুগ্রহ করে অন্য কিছু সার্চ করুন বা ফিল্টার পরিবর্তন করুন।</p>
          <Button variant="outline" className="mt-6" onClick={() => {setSearchTerm(""); setFilterCountry("all");}}>ফিল্টার রিসেট করুন</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img 
                  src={product.images.chocolate} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {product.featured && (
                  <span className="absolute top-3 left-3 bg-[#D8F3B0] text-[#402014] text-xs font-bold px-2 py-1 rounded shadow-sm">
                    জনপ্রিয়
                  </span>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {product.countryOfOrigin}
                  </p>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-[#402014] leading-tight line-clamp-2">{product.name}</h3>
                </div>
                
                <p className="text-sm text-[#5E4D46] mb-4 line-clamp-2 flex-1">{product.description}</p>
                
                <div className="flex items-center justify-between text-xs text-[#5E4D46] bg-gray-50 p-2 rounded-lg mb-4">
                  <span>পিস: {product.itemCount > 0 ? product.itemCount : 'প্রযোজ্য নয়'}</span>
                  <span>•</span>
                  <span>ওজন: {product.totalWeightGrams > 0 ? `${product.totalWeightGrams}g` : 'প্রযোজ্য নয়'}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-[#21865B]">{formatPrice(product.price)}</span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-gray-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-auto">
                  <Button variant="outline" className="px-2" onClick={() => onOpenDetails(product)}>
                    <Eye className="w-4 h-4 mr-1" /> বিস্তারিত
                  </Button>
                  <Button variant="primary" className="px-2" onClick={() => onOrder(product)}>
                    অর্ডার করুন
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

const Header = () => (
  <>
    <div className="bg-[#402014] text-[#D8F3B0] text-sm py-2 text-center px-4 font-medium tracking-wide">
      🎉 প্রথম অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি! (শর্ত প্রযোজ্য)
    </div>
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#EBF7D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src="/logo.svg" alt="ChocoJhuri Logo" className="h-20 md:h-24" />
        </a>
        <nav className="hidden md:flex items-center gap-6 font-medium text-[#5E4D46]">
          <a href="#products" className="hover:text-[#402014] transition">কম্বো প্যাকেজ</a>
          <a href="#combo-builder" className="hover:text-[#402014] transition">কাস্টম বক্স</a>
          <a href="#faq" className="hover:text-[#402014] transition">সাধারণ জিজ্ঞাসা</a>
        </nav>
        <a href="#products" className="bg-[#402014] text-[#FFFBEA] px-5 py-2 rounded-full font-semibold hover:bg-[#2A150D] transition shadow-md">
          শপ নাউ
        </a>
      </div>
    </header>
  </>
);

const Hero = () => (
  <section className="relative overflow-hidden brand-gradient pt-16 pb-24 md:pt-24 md:pb-32 px-4 sm:px-6">
    <div className="absolute inset-0 lime-glow"></div>
    <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <span className="inline-block px-4 py-1 bg-[#D8F3B0]/20 text-[#D8F3B0] font-pacifico tracking-wider rounded-full text-lg mb-4 border border-[#D8F3B0]/30 shadow-[0_0_15px_rgba(216,243,176,0.2)]">
          প্রিমিয়াম গিফট কালেকশন
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#FFFBEA] mb-6 leading-tight text-balance">
          এক বাক্সে পছন্দের <br/><span className="text-[#D8F3B0]">সব চকলেট!</span>
        </h1>
        <p className="text-[#FFFBEA]/90 text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0 font-light">
          নিজের পছন্দের চকলেট বেছে নিন, তৈরি করুন মনের মতো কম্বো। অর্ডার করুন সহজেই, মূল্য পরিশোধ করুন পণ্য হাতে পেয়ে।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a href="#products" className="inline-flex items-center justify-center bg-[#D8F3B0] text-[#402014] font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#FFFBEA] transition duration-300 text-lg">
            কম্বো অফার দেখুন
          </a>
          <a href="#combo-builder" className="inline-flex items-center justify-center bg-transparent border-2 border-[#D8F3B0] text-[#D8F3B0] font-semibold py-3 px-8 rounded-lg hover:bg-[#D8F3B0]/10 transition duration-300 text-lg">
            নিজের কম্বো তৈরি করুন
          </a>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center relative">
        <div className="relative w-72 h-72 md:w-96 md:h-96">
           <div className="absolute inset-0 bg-[#D8F3B0] rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
           <img 
            src="https://res.cloudinary.com/dfkg9envn/image/upload/v1792419009/MntSizedBundle_05b40b4d-43b5-40cc-823e-176f0197fa79_tmn1bt.jpg"
            alt="Premium Chocolate Box" 
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl" 
          />
        </div>
      </div>
    </div>
  </section>
);

const TrustSection = () => (
  <div className="bg-[#FFFBEA] py-10 border-b border-[#EBF7D3]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <div className="flex flex-col items-center p-4">
        <div className="w-16 h-16 bg-[#EBF7D3] rounded-full flex items-center justify-center text-[#402014] mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-lg text-[#402014] mb-2 font-playfair">ক্যাশ অন ডেলিভারি</h3>
        <p className="text-[#5E4D46] text-sm">হাতে পণ্য পেয়ে মূল্য পরিশোধের সুবিধা। ঢাকা ও ঢাকার বাইরে ডেলিভারি।</p>
      </div>
      <div className="flex flex-col items-center p-4">
        <div className="w-16 h-16 bg-[#EBF7D3] rounded-full flex items-center justify-center text-[#402014] mb-4">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-lg text-[#402014] mb-2 font-playfair">প্রিমিয়াম কোয়ালিটি</h3>
        <p className="text-[#5E4D46] text-sm">বিশ্বের বিভিন্ন প্রান্ত থেকে সংগৃহীত সেরা মানের অরিজিনাল চকলেট।</p>
      </div>
      <div className="flex flex-col items-center p-4">
        <div className="w-16 h-16 bg-[#EBF7D3] rounded-full flex items-center justify-center text-[#402014] mb-4">
          <Star className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-lg text-[#402014] mb-2 font-playfair">আকর্ষণীয় প্যাকেজিং</h3>
        <p className="text-[#5E4D46] text-sm">যেকোনো উৎসব বা উপহারের জন্য মানানসই সুন্দর ও সুরক্ষিত বক্স।</p>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const faqs = [
    { q: "অর্ডার করার কতদিনের মধ্যে ডেলিভারি পাবো?", a: "ঢাকার ভেতরে সাধারণত ২৪-৪৮ ঘণ্টা এবং ঢাকার বাইরে ২-৪ কর্মদিবসের মধ্যে ডেলিভারি করা হয়।" },
    { q: "ডেলিভারি চার্জ কত?", a: `ঢাকার ভেতরে ডেলিভারি চার্জ ${SITE_CONFIG.deliveryFee.insideDhaka} টাকা এবং ঢাকার বাইরে ${SITE_CONFIG.deliveryFee.outsideDhaka} টাকা।` },
    { q: "আমি কি বক্সের ভেতরের চকলেট পরিবর্তন করতে পারবো?", a: "আমাদের পূর্বনির্ধারিত কম্বোগুলোতে পরিবর্তন সম্ভব নয়, তবে আপনি 'কাস্টম কম্বো' সেকশন থেকে নিজের পছন্দমতো বক্স তৈরি করতে পারবেন।" },
    { q: "পণ্য হাতে পাওয়ার পর কি ফেরত দেওয়ার সুযোগ আছে?", a: "খাদ্যদ্রব্য হওয়ায় ডেলিভারি ম্যানের সামনে চেক করে রিসিভ করার অনুরোধ করা হচ্ছে। খোলার পর বা ডেলিভারি সম্পন্ন হওয়ার পর ফেরত নেওয়া সম্ভব নয়।" }
  ];

  return (
    <section id="faq" className="py-16 bg-[#FFFBEA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#402014] mb-4">সাধারণ জিজ্ঞাসা</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-[#EBF7D3] rounded-lg p-5 hover:border-[#D8F3B0] transition bg-white">
              <h4 className="font-bold text-[#402014] flex gap-2 items-start text-lg mb-2">
                <Info className="w-5 h-5 shrink-0 text-[#21865B] mt-1" />
                {faq.q}
              </h4>
              <p className="text-[#5E4D46] pl-7 text-sm md:text-base leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-[#402014] text-[#FFFBEA] py-12 border-t-4 border-[#D8F3B0]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <a href="#" className="flex items-center gap-2 text-3xl font-pacifico text-[#D8F3B0] mb-4">
          <ShoppingBag className="w-8 h-8" />
          {SITE_CONFIG.brandName}
        </a>
        <p className="text-[#EBF7D3]/80 text-sm max-w-xs leading-relaxed">
          আপনার প্রিয়জনদের মুখে হাসি ফোটাতে বিশ্বের সেরা চকলেটগুলো আমরা নিয়ে এসেছি এক ছাদের নিচে।
        </p>
      </div>
      <div>
        <h4 className="text-lg font-playfair font-bold mb-4 text-[#FFFBEA]">প্রয়োজনীয় লিংক</h4>
        <ul className="space-y-2 text-sm text-[#EBF7D3]/80">
          <li><a href="#products" className="hover:text-[#D8F3B0] transition">সকল কম্বো</a></li>
          <li><a href="#combo-builder" className="hover:text-[#D8F3B0] transition">কাস্টম বক্স তৈরি</a></li>
          <li><a href="#faq" className="hover:text-[#D8F3B0] transition">প্রায়শই জিজ্ঞাসিত প্রশ্ন</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-playfair font-bold mb-4 text-[#FFFBEA]">যোগাযোগ</h4>
        <ul className="space-y-3 text-sm text-[#EBF7D3]/80">
          <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> {SITE_CONFIG.whatsappNumber}</li>
          <li className="flex items-center gap-2"><FaFacebook className="w-4 h-4" /> facebook.com/{SITE_CONFIG.messengerPageId}</li>
          <li className="flex items-start gap-2 mt-4 text-xs text-[#EBF7D3]/60 italic">
            * এটি একটি ডেমো ওয়েবসাইট প্রজেক্ট। এর সাথে কোনো বাস্তব ব্যবসার সম্পর্ক নেই।
          </li>
        </ul>
      </div>
    </div>
  </footer>
);

const FloatingContact = () => (
  <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
    <a 
      href={`https://m.me/${SITE_CONFIG.messengerPageId}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      aria-label="Contact on Messenger"
    >
      <FaFacebook className="w-8 h-8" />
    </a>
    <a 
      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  </div>
);

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderProduct, setOrderProduct] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOpenDetails = useCallback((product) => {
    setSelectedProduct(product);
    setIsDetailsModalOpen(true);
  }, []);

  const handleOpenOrder = useCallback((product) => {
    setIsDetailsModalOpen(false);
    setOrderProduct(product);
    setTimeout(() => {
      setIsOrderModalOpen(true);
    }, 100);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsDetailsModalOpen(false);
        setIsOrderModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen relative font-sans text-[#402014]">
      <GlobalStyles />
      
      <Header />
      
      <main>
        <Hero />
        <TrustSection />
        <ProductSection 
          onOpenDetails={handleOpenDetails} 
          onOrder={handleOpenOrder} 
        />
        <CustomComboBuilder 
          onOrderCustom={handleOpenOrder}
        />
        <FAQSection />
      </main>

      <Footer />
      
      <FloatingContact />

      <ProductModal 
        isOpen={isDetailsModalOpen} 
        product={selectedProduct} 
        onClose={() => setIsDetailsModalOpen(false)} 
        onOrder={handleOpenOrder}
      />
      
      <OrderModal 
        isOpen={isOrderModalOpen} 
        product={orderProduct} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </div>
  );
}