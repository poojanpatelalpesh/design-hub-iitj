
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
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  subSubcategories: SubSubcategory[];
}

export interface SubSubcategory {
  id: string;
  name: string;
  designerIds: string[];
}

export interface Booking {
  id: string;
  userId: string;
  designerId: string;
  categoryId: string;
  subcategoryId: string;
  subSubcategoryId: string;
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
  }
];

const sampleCategories: Category[] = [
  {
    id: "category-1",
    name: "Footwear",
    icon: "shoe",
    subcategories: [
      {
        id: "subcategory-1-1",
        name: "Athletic",
        subSubcategories: [
          { 
            id: "subsubcategory-1-1-1", 
            name: "Running", 
            designerIds: ["designer-1"] 
          },
          { 
            id: "subsubcategory-1-1-2", 
            name: "Basketball", 
            designerIds: ["designer-1"] 
          }
        ]
      },
      {
        id: "subcategory-1-2",
        name: "Casual",
        subSubcategories: [
          { 
            id: "subsubcategory-1-2-1", 
            name: "Sneakers", 
            designerIds: ["designer-2"] 
          },
          { 
            id: "subsubcategory-1-2-2", 
            name: "Loafers", 
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
    subcategories: [
      {
        id: "subcategory-2-1",
        name: "Sunglasses",
        subSubcategories: [
          { 
            id: "subsubcategory-2-1-1", 
            name: "Premium", 
            designerIds: ["designer-3"] 
          },
          { 
            id: "subsubcategory-2-1-2", 
            name: "Sport", 
            designerIds: ["designer-3"] 
          }
        ]
      },
      {
        id: "subcategory-2-2",
        name: "Prescription",
        subSubcategories: [
          { 
            id: "subsubcategory-2-2-1", 
            name: "Modern", 
            designerIds: ["designer-4"] 
          },
          { 
            id: "subsubcategory-2-2-2", 
            name: "Classic", 
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
    subcategories: [
      {
        id: "subcategory-3-1",
        name: "Caps",
        subSubcategories: [
          { 
            id: "subsubcategory-3-1-1", 
            name: "Streetwear", 
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-1-2", 
            name: "Sports", 
            designerIds: ["designer-5"] 
          }
        ]
      },
      {
        id: "subcategory-3-2",
        name: "Hats",
        subSubcategories: [
          { 
            id: "subsubcategory-3-2-1", 
            name: "Formal", 
            designerIds: ["designer-5"] 
          },
          { 
            id: "subsubcategory-3-2-2", 
            name: "Casual", 
            designerIds: ["designer-5"] 
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
