
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  ShoppingBagIcon, 
  ClockIcon,
  CheckCircleIcon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { user } = useAuth();
  const { bookings, getDesignerById, getCategoryById, getSubcategoryById, getSubSubcategoryById } = useData();
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}</h1>
            <p className="text-gray-600">Manage your design consultations and bookings</p>
          </div>
          
          <Tabs defaultValue="bookings" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bookings" className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">My Bookings</h2>
                </div>
                
                {bookings.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {bookings.map((booking) => {
                      const designer = getDesignerById(booking.designerId);
                      const category = getCategoryById(booking.categoryId);
                      const subcategory = getSubcategoryById(booking.categoryId, booking.subcategoryId);
                      const subSubcategory = getSubSubcategoryById(
                        booking.categoryId, 
                        booking.subcategoryId, 
                        booking.subSubcategoryId
                      );
                      
                      return (
                        <div key={booking.id} className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="mb-4 sm:mb-0">
                              <div className="flex items-center">
                                <h3 className="text-lg font-medium text-gray-900">{designer?.name}</h3>
                                <Badge 
                                  variant={booking.status === "completed" ? "default" : booking.status === "cancelled" ? "destructive" : "outline"} 
                                  className="ml-3"
                                >
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="mt-1 text-sm text-gray-600">
                                {category?.name} &gt; {subcategory?.name} &gt; {subSubcategory?.name}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500">
                                <CalendarIcon className="mr-1.5 h-4 w-4" />
                                <span>
                                  {new Date(booking.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="mt-1 flex items-center text-sm text-gray-500">
                                <ShoppingBagIcon className="mr-1.5 h-4 w-4" />
                                <span>Payment: {booking.paymentMethod}</span>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-designer-primary text-designer-primary hover:bg-designer-primary/10"
                              >
                                View Details
                              </Button>
                              {booking.status === "pending" && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                >
                                  Cancel Booking
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings yet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      You haven't booked any designers yet. Start by exploring our categories.
                    </p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link to="/categories">Explore Categories</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Name</h3>
                      <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                      <p className="mt-1 text-sm text-gray-900">{bookings.length}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      className="border-designer-primary text-designer-primary hover:bg-designer-primary/10"
                    >
                      Edit Profile
                    </Button>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
