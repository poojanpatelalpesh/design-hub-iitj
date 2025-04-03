import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export interface Designer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  specialties: string[];
  description: string;
  price: number;
  portfolio: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image?: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  image?: string;
  subSubcategories: SubSubcategory[];
}

export interface SubSubcategory {
  id: string;
  name: string;
  image?: string;
  designerIds: string[];
}

export interface Booking {
  id: string;
  userId: string;
  designerId: string;
  categoryId: string;
  subcategoryId: string;
  subSubcategoryId: string;
  designDetails?: string;
  status: "pending" | "completed" | "cancelled";
  date: string;
  paymentMethod: string;
}

interface DataContextType {
  categories: Category[];
  designers: Designer[];
  bookings: Booking[];
  getDesignerById: (id: string) => Designer | undefined;
  getCategoryById: (id: string) => Category | undefined;
  getSubcategoryById: (categoryId: string, subcategoryId: string) => Subcategory | undefined;
  getSubSubcategoryById: (
    categoryId: string,
    subcategoryId: string,
    subSubcategoryId: string
  ) => SubSubcategory | undefined;
  getDesignersForSubSubcategory: (
    categoryId: string,
    subcategoryId: string,
    subSubcategoryId: string
  ) => Designer[];
  addBooking: (booking: Omit<Booking, "id" | "date">) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

// Sample data
const sampleDesigners: Designer[] = [
  {
    id: "designer-1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    rating: 4.8,
    specialties: ["Footwear", "Athletic", "Running"],
    description: "Specializing in athletic footwear with 8+ years of experience in the industry. I've designed for major sportswear brands and focus on combining performance with style.",
    price: 150,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-2",
    name: "Sophia Chen",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialties: ["Footwear", "Casual", "Sneakers"],
    description: "Creative sneaker designer with a focus on sustainable materials and modern aesthetics. My designs have been featured in Vogue and GQ.",
    price: 180,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-3",
    name: "Marcus Williams",
    avatar: "/placeholder.svg",
    rating: 4.7,
    specialties: ["Eyewear", "Sunglasses", "Premium"],
    description: "Luxury eyewear designer with experience at top fashion houses. My approach combines classic elegance with contemporary innovation.",
    price: 200,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-4",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg",
    rating: 4.6,
    specialties: ["Eyewear", "Prescription", "Modern"],
    description: "Specialized in prescription eyewear that combines functionality with style. I focus on creating frames that enhance facial features while providing optimal comfort.",
    price: 160,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-5",
    name: "Daniel Kim",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialties: ["Headwear", "Caps", "Streetwear"],
    description: "Streetwear cap designer with a finger on the pulse of urban fashion trends. My designs have been worn by celebrities and featured in streetwear lookbooks.",
    price: 130,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-6",
    name: "Lisa Wang",
    avatar: "/placeholder.svg",
    rating: 4.8,
    specialties: ["Accessories", "Jewelry", "Modern"],
    description: "Contemporary jewelry designer specializing in minimalist and elegant pieces. I work with sustainable materials and focus on timeless designs.",
    price: 170,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-7",
    name: "James Cooper",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialties: ["Outerwear", "Jackets", "Winter"],
    description: "Technical outerwear designer with experience in creating functional yet stylish performance apparel. My designs have been used in extreme expeditions.",
    price: 190,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-8",
    name: "Taylor Smith",
    avatar: "/placeholder.svg",
    rating: 4.7,
    specialties: ["Apparel", "T-shirts", "Graphic"],
    description: "Graphic designer specializing in apparel prints with a distinctive urban aesthetic. My work combines street art influences with contemporary design principles.",
    price: 140,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-9",
    name: "Olivia Parker",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialties: ["UI/UX", "Mobile Apps", "Web Interfaces"],
    description: "Award-winning UI/UX designer specializing in intuitive digital experiences. I've designed interfaces for Fortune 500 companies and successful startups.",
    price: 210,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-10",
    name: "Noah Martinez",
    avatar: "/placeholder.svg",
    rating: 4.8,
    specialties: ["Graphic Design", "Branding", "Typography"],
    description: "Graphic designer with expertise in brand identity development. I help businesses establish distinctive visual languages that resonate with their target audiences.",
    price: 175,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-11",
    name: "Ava Wong",
    avatar: "/placeholder.svg",
    rating: 4.7,
    specialties: ["Interior Design", "Residential", "Modern"],
    description: "Interior designer with a passion for creating harmonious living spaces. I specialize in blending functionality with aesthetic appeal in residential environments.",
    price: 190,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-12",
    name: "Ethan Jackson",
    avatar: "/placeholder.svg",
    rating: 4.8,
    specialties: ["Industrial Design", "Furniture", "Lighting"],
    description: "Industrial designer focusing on furniture and lighting solutions. My designs have received international recognition for their innovative approaches to everyday objects.",
    price: 185,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }
];

const sampleCategories: Category[] = [
  {
    id: "category-1",
    name: "Footwear",
    icon: "shirt",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-1-1",
        name: "Athletic",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-1-1-1", 
            name: "Running", 
            image: "/placeholder.svg",
            designerIds: ["designer-1"] 
          },
          { 
            id: "subsubcategory-1-1-2", 
            name: "Basketball", 
            image: "/placeholder.svg",
            designerIds: ["designer-1"] 
          },
          { 
            id: "subsubcategory-1-1-3", 
            name: "Soccer", 
            image: "/placeholder.svg",
            designerIds: ["designer-1"] 
          },
          { 
            id: "subsubcategory-1-1-4", 
            name: "Cross-Training", 
            image: "/placeholder.svg",
            designerIds: ["designer-1"] 
          }
        ]
      },
      {
        id: "subcategory-1-2",
        name: "Casual",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-1-2-1", 
            name: "Sneakers", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          },
          { 
            id: "subsubcategory-1-2-2", 
            name: "Loafers", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          },
          { 
            id: "subsubcategory-1-2-3", 
            name: "Slip-ons", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          },
          { 
            id: "subsubcategory-1-2-4", 
            name: "Canvas", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          }
        ]
      },
      {
        id: "subcategory-1-3",
        name: "Formal",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-1-3-1", 
            name: "Dress Shoes", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          },
          { 
            id: "subsubcategory-1-3-2", 
            name: "Oxfords", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          },
          { 
            id: "subsubcategory-1-3-3", 
            name: "Brogues", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          }
        ]
      },
      {
        id: "subcategory-1-4",
        name: "Boots",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-1-4-1", 
            name: "Chelsea", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          },
          { 
            id: "subsubcategory-1-4-2", 
            name: "Combat", 
            image: "/placeholder.svg",
            designerIds: ["designer-2"] 
          },
          { 
            id: "subsubcategory-1-4-3", 
            name: "Hiking", 
            image: "/placeholder.svg",
            designerIds: ["designer-1"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-2",
    name: "Eyewear",
    icon: "glasses",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-2-1",
        name: "Sunglasses",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-2-1-1", 
            name: "Premium", 
            image: "/placeholder.svg",
            designerIds: ["designer-3"] 
          },
          { 
            id: "subsubcategory-2-1-2", 
            name: "Sport", 
            image: "/placeholder.svg",
            designerIds: ["designer-3"] 
          },
          { 
            id: "subsubcategory-2-1-3", 
            name: "Fashion", 
            image: "/placeholder.svg",
            designerIds: ["designer-3"] 
          },
          { 
            id: "subsubcategory-2-1-4", 
            name: "Aviator", 
            image: "/placeholder.svg",
            designerIds: ["designer-3"] 
          },
          { 
            id: "subsubcategory-2-1-5", 
            name: "Wayfarer", 
            image: "/placeholder.svg",
            designerIds: ["designer-3"] 
          }
        ]
      },
      {
        id: "subcategory-2-2",
        name: "Prescription",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-2-2-1", 
            name: "Modern", 
            image: "/placeholder.svg",
            designerIds: ["designer-4"] 
          },
          { 
            id: "subsubcategory-2-2-2", 
            name: "Classic", 
            image: "/placeholder.svg",
            designerIds: ["designer-4"] 
          },
          { 
            id: "subsubcategory-2-2-3", 
            name: "Reading", 
            image: "/placeholder.svg",
            designerIds: ["designer-4"] 
          },
          { 
            id: "subsubcategory-2-2-4", 
            name: "Blue Light", 
            image: "/placeholder.svg",
            designerIds: ["designer-4"] 
          }
        ]
      },
      {
        id: "subcategory-2-3",
        name: "Safety",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-2-3-1", 
            name: "Industrial", 
            image: "/placeholder.svg",
            designerIds: ["designer-4"] 
          },
          { 
            id: "subsubcategory-2-3-2", 
            name: "Sports", 
            image: "/placeholder.svg",
            designerIds: ["designer-4"] 
          },
          { 
            id: "subsubcategory-2-3-3", 
            name: "Medical", 
            image: "/placeholder.svg",
            designerIds: ["designer-4"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-3",
    name: "Headwear",
    icon: "crown",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-3-1",
        name: "Caps",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-3-1-1", 
            name: "Streetwear", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-1-2", 
            name: "Sports", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-1-3", 
            name: "Vintage", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-1-4", 
            name: "Customized", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          }
        ]
      },
      {
        id: "subcategory-3-2",
        name: "Hats",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-3-2-1", 
            name: "Formal", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-2-2", 
            name: "Casual", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-2-3", 
            name: "Winter", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-2-4", 
            name: "Sun Protection", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          }
        ]
      },
      {
        id: "subcategory-3-3",
        name: "Beanies",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-3-3-1", 
            name: "Knit", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-3-2", 
            name: "Slouchy", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-3-3", 
            name: "Cuffed", 
            image: "/placeholder.svg",
            designerIds: ["designer-5"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-4",
    name: "Accessories",
    icon: "bag",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-4-1",
        name: "Jewelry",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-4-1-1", 
            name: "Modern", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          },
          { 
            id: "subsubcategory-4-1-2", 
            name: "Classic", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          },
          { 
            id: "subsubcategory-4-1-3", 
            name: "Minimalist", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          },
          { 
            id: "subsubcategory-4-1-4", 
            name: "Statement", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          }
        ]
      },
      {
        id: "subcategory-4-2",
        name: "Bags",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-4-2-1", 
            name: "Handbags", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          },
          { 
            id: "subsubcategory-4-2-2", 
            name: "Backpacks", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          },
          { 
            id: "subsubcategory-4-2-3", 
            name: "Totes", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          },
          { 
            id: "subsubcategory-4-2-4", 
            name: "Crossbody", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          }
        ]
      },
      {
        id: "subcategory-4-3",
        name: "Belts",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-4-3-1", 
            name: "Leather", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          },
          { 
            id: "subsubcategory-4-3-2", 
            name: "Woven", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          },
          { 
            id: "subsubcategory-4-3-3", 
            name: "Statement", 
            image: "/placeholder.svg",
            designerIds: ["designer-6"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-5",
    name: "Outerwear",
    icon: "shirt",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-5-1",
        name: "Jackets",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-5-1-1", 
            name: "Winter", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          },
          { 
            id: "subsubcategory-5-1-2", 
            name: "Casual", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          },
          { 
            id: "subsubcategory-5-1-3", 
            name: "Leather", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          },
          { 
            id: "subsubcategory-5-1-4", 
            name: "Bomber", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          }
        ]
      },
      {
        id: "subcategory-5-2",
        name: "Coats",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-5-2-1", 
            name: "Formal", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          },
          { 
            id: "subsubcategory-5-2-2", 
            name: "Raincoats", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          },
          { 
            id: "subsubcategory-5-2-3", 
            name: "Trench", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          },
          { 
            id: "subsubcategory-5-2-4", 
            name: "Parka", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          }
        ]
      },
      {
        id: "subcategory-5-3",
        name: "Vests",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-5-3-1", 
            name: "Puffer", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          },
          { 
            id: "subsubcategory-5-3-2", 
            name: "Outdoor", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          },
          { 
            id: "subsubcategory-5-3-3", 
            name: "Formal", 
            image: "/placeholder.svg",
            designerIds: ["designer-7"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-6",
    name: "Apparel",
    icon: "shirt",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-6-1",
        name: "T-shirts",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-6-1-1", 
            name: "Graphic", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          },
          { 
            id: "subsubcategory-6-1-2", 
            name: "Basic", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          },
          { 
            id: "subsubcategory-6-1-3", 
            name: "Vintage", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          },
          { 
            id: "subsubcategory-6-1-4", 
            name: "Custom Print", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          }
        ]
      },
      {
        id: "subcategory-6-2",
        name: "Pants",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-6-2-1", 
            name: "Jeans", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          },
          { 
            id: "subsubcategory-6-2-2", 
            name: "Chinos", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          },
          { 
            id: "subsubcategory-6-2-3", 
            name: "Athletic", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          },
          { 
            id: "subsubcategory-6-2-4", 
            name: "Cargo", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          }
        ]
      },
      {
        id: "subcategory-6-3",
        name: "Dresses",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-6-3-1", 
            name: "Casual", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          },
          { 
            id: "subsubcategory-6-3-2", 
            name: "Evening", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          },
          { 
            id: "subsubcategory-6-3-3", 
            name: "Sundress", 
            image: "/placeholder.svg",
            designerIds: ["designer-8"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-7",
    name: "UI/UX Design",
    icon: "laptop",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-7-1",
        name: "Mobile",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-7-1-1", 
            name: "iOS Apps", 
            image: "/placeholder.svg",
            designerIds: ["designer-9"] 
          },
          { 
            id: "subsubcategory-7-1-2", 
            name: "Android Apps", 
            image: "/placeholder.svg",
            designerIds: ["designer-9"] 
          },
          { 
            id: "subsubcategory-7-1-3", 
            name: "Cross-Platform", 
            image: "/placeholder.svg",
            designerIds: ["designer-9"] 
          }
        ]
      },
      {
        id: "subcategory-7-2",
        name: "Web",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-7-2-1", 
            name: "Responsive", 
            image: "/placeholder.svg",
            designerIds: ["designer-9"] 
          },
          { 
            id: "subsubcategory-7-2-2", 
            name: "E-commerce", 
            image: "/placeholder.svg",
            designerIds: ["designer-9"] 
          },
          { 
            id: "subsubcategory-7-2-3", 
            name: "Dashboard", 
            image: "/placeholder.svg",
            designerIds: ["designer-9"] 
          }
        ]
      },
      {
        id: "subcategory-7-3",
        name: "Product",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-7-3-1", 
            name: "SaaS", 
            image: "/placeholder.svg",
            designerIds: ["designer-9"] 
          },
          { 
            id: "subsubcategory-7-3-2", 
            name: "Consumer", 
            image: "/placeholder.svg",
            designerIds: ["designer-9"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-8",
    name: "Graphic Design",
    icon: "pentool",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-8-1",
        name: "Branding",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-8-1-1", 
            name: "Logo Design", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          },
          { 
            id: "subsubcategory-8-1-2", 
            name: "Identity Systems", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          },
          { 
            id: "subsubcategory-8-1-3", 
            name: "Brand Guidelines", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          }
        ]
      },
      {
        id: "subcategory-8-2",
        name: "Print",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-8-2-1", 
            name: "Posters", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          },
          { 
            id: "subsubcategory-8-2-2", 
            name: "Packaging", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          },
          { 
            id: "subsubcategory-8-2-3", 
            name: "Business Cards", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          }
        ]
      },
      {
        id: "subcategory-8-3",
        name: "Digital",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-8-3-1", 
            name: "Social Media", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          },
          { 
            id: "subsubcategory-8-3-2", 
            name: "Web Graphics", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          },
          { 
            id: "subsubcategory-8-3-3", 
            name: "Email Design", 
            image: "/placeholder.svg",
            designerIds: ["designer-10"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-9",
    name: "Interior Design",
    icon: "palette",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-9-1",
        name: "Residential",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-9-1-1", 
            name: "Modern", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          },
          { 
            id: "subsubcategory-9-1-2", 
            name: "Traditional", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          },
          { 
            id: "subsubcategory-9-1-3", 
            name: "Minimalist", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          }
        ]
      },
      {
        id: "subcategory-9-2",
        name: "Commercial",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-9-2-1", 
            name: "Office", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          },
          { 
            id: "subsubcategory-9-2-2", 
            name: "Retail", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          },
          { 
            id: "subsubcategory-9-2-3", 
            name: "Hospitality", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          }
        ]
      },
      {
        id: "subcategory-9-3",
        name: "Specialized",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-9-3-1", 
            name: "Kitchen", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          },
          { 
            id: "subsubcategory-9-3-2", 
            name: "Bathroom", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          },
          { 
            id: "subsubcategory-9-3-3", 
            name: "Outdoor", 
            image: "/placeholder.svg",
            designerIds: ["designer-11"] 
          }
        ]
      }
    ]
  },
  {
    id: "category-10",
    name: "Industrial Design",
    icon: "scissors",
    image: "/placeholder.svg",
    subcategories: [
      {
        id: "subcategory-10-1",
        name: "Furniture",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-10-1-1", 
            name: "Contemporary", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          },
          { 
            id: "subsubcategory-10-1-2", 
            name: "Modular", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          },
          { 
            id: "subsubcategory-10-1-3", 
            name: "Sustainable", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          }
        ]
      },
      {
        id: "subcategory-10-2",
        name: "Lighting",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-10-2-1", 
            name: "Pendant", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          },
          { 
            id: "subsubcategory-10-2-2", 
            name: "Table Lamps", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          },
          { 
            id: "subsubcategory-10-2-3", 
            name: "Smart Lighting", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          }
        ]
      },
      {
        id: "subcategory-10-3",
        name: "Consumer Products",
        image: "/placeholder.svg",
        subSubcategories: [
          { 
            id: "subsubcategory-10-3-1", 
            name: "Kitchen Appliances", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          },
          { 
            id: "subsubcategory-10-3-2", 
            name: "Electronics", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          },
          { 
            id: "subsubcategory-10-3-3", 
            name: "Home Accessories", 
            image: "/placeholder.svg",
            designerIds: ["designer-12"] 
          }
        ]
      }
    ]
  }
];

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [designers] = useState<Designer[]>(sampleDesigners);
  const [categories] = useState<Category[]>(sampleCategories);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (user) {
      // Load user-specific bookings from localStorage
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const currentUser = users.find((u: any) => u.id === user.id);
        if (currentUser && currentUser.bookings) {
          setBookings(currentUser.bookings);
        }
      }
    } else {
      setBookings([]);
    }
  }, [user]);

  const getDesignerById = (id: string) => {
    return designers.find(designer => designer.id === id);
  };

  const getCategoryById = (id: string) => {
    return categories.find(category => category.id === id);
  };

  const getSubcategoryById = (categoryId: string, subcategoryId: string) => {
    const category = getCategoryById(categoryId);
    return category?.subcategories.find(sub => sub.id === subcategoryId);
  };

  const getSubSubcategoryById = (
    categoryId: string,
    subcategoryId: string,
    subSubcategoryId: string
  ) => {
    const subcategory = getSubcategoryById(categoryId, subcategoryId);
    return subcategory?.subSubcategories.find(subSub => subSub.id === subSubcategoryId);
  };

  const getDesignersForSubSubcategory = (
    categoryId: string,
    subcategoryId: string,
    subSubcategoryId: string
  ) => {
    const subSubcategory = getSubSubcategoryById(categoryId, subcategoryId, subSubcategoryId);
    if (!subSubcategory) return [];
    
    return designers.filter(designer => 
      subSubcategory.designerIds.includes(designer.id)
    );
  };

  const addBooking = (bookingData: Omit<Booking, "id" | "date">) => {
    if (!user) {
      console.error("User must be logged in to book a designer");
      return;
    }

    const newBooking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      date: new Date().toISOString(),
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);

    // Update in localStorage
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map((u: any) => {
        if (u.id === user.id) {
          return {
            ...u,
            bookings: updatedBookings
          };
        }
        return u;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  return (
    <DataContext.Provider
      value={{
        designers,
        categories,
        bookings,
        getDesignerById,
        getCategoryById,
        getSubcategoryById,
        getSubSubcategoryById,
        getDesignersForSubSubcategory,
        addBooking
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
