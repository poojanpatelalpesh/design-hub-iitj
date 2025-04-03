
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
    description: "Specializing in athletic footwear with 8+ years of experience in the industry.",
    price: 150,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-2",
    name: "Sophia Chen",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialties: ["Footwear", "Casual", "Sneakers"],
    description: "Creative sneaker designer with a focus on sustainable materials and modern aesthetics.",
    price: 180,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-3",
    name: "Marcus Williams",
    avatar: "/placeholder.svg",
    rating: 4.7,
    specialties: ["Eyewear", "Sunglasses", "Premium"],
    description: "Luxury eyewear designer with experience at top fashion houses.",
    price: 200,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-4",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg",
    rating: 4.6,
    specialties: ["Eyewear", "Prescription", "Modern"],
    description: "Specialized in prescription eyewear that combines functionality with style.",
    price: 160,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-5",
    name: "Daniel Kim",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialties: ["Headwear", "Caps", "Streetwear"],
    description: "Streetwear cap designer with a finger on the pulse of urban fashion trends.",
    price: 130,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-6",
    name: "Lisa Wang",
    avatar: "/placeholder.svg",
    rating: 4.8,
    specialties: ["Accessories", "Jewelry", "Modern"],
    description: "Contemporary jewelry designer specializing in minimalist and elegant pieces.",
    price: 170,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-7",
    name: "James Cooper",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialties: ["Outerwear", "Jackets", "Winter"],
    description: "Technical outerwear designer with experience in creating functional yet stylish performance apparel.",
    price: 190,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: "designer-8",
    name: "Taylor Smith",
    avatar: "/placeholder.svg",
    rating: 4.7,
    specialties: ["Apparel", "T-shirts", "Graphic"],
    description: "Graphic designer specializing in apparel prints with a distinctive urban aesthetic.",
    price: 140,
    portfolio: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]
  }
];

const sampleCategories: Category[] = [
  {
    id: "category-1",
    name: "Footwear",
    icon: "shoe",
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
          }
        ]
      }
    ]
  },
  {
    id: "category-3",
    name: "Headwear",
    icon: "hat",
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
