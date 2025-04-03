
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { ArrowLeft, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const BookDesigner = () => {
  const { designerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getDesignerById, getCategoryById, categories, addBooking } = useData();
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  
  if (!designerId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Designer ID</h1>
            <Button onClick={() => navigate("/categories")}>
              Browse Categories
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const designer = getDesignerById(designerId);
  
  if (!designer) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Designer Not Found</h1>
            <Button onClick={() => navigate("/categories")}>
              Browse Categories
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory("");
    setSelectedSubSubcategory("");
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setSelectedSubSubcategory("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCategory || !selectedSubcategory || !selectedSubSubcategory) {
      toast.error("Please select all category options");
      return;
    }
    
    if (paymentMethod === "credit-card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
        toast.error("Please fill in all payment details");
        return;
      }
      
      // Very basic validation
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        toast.error("Please enter a valid 16-digit card number");
        return;
      }
      
      if (cardExpiry.length !== 5 || !cardExpiry.includes("/")) {
        toast.error("Please enter a valid expiry date (MM/YY)");
        return;
      }
      
      if (cardCVC.length !== 3) {
        toast.error("Please enter a valid 3-digit CVC");
        return;
      }
    }
    
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      try {
        addBooking({
          userId: user?.id || "",
          designerId: designer.id,
          categoryId: selectedCategory,
          subcategoryId: selectedSubcategory,
          subSubcategoryId: selectedSubSubcategory,
          status: "pending",
          paymentMethod: paymentMethod === "credit-card" ? "Credit Card" : "PayPal"
        });
        
        setBookingComplete(true);
        toast.success("Designer booked successfully!");
      } catch (error) {
        toast.error("An error occurred during booking.");
        setIsBooking(false);
      }
    }, 1500);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-md w-full text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-12 w-12 text-green-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Successful!</h1>
            <p className="text-gray-600 mb-8">
              You have successfully booked {designer.name}. You can view your booking details in your dashboard.
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate("/dashboard")}
                className="w-full bg-designer-primary hover:bg-designer-primary/90 text-white"
              >
                Go to Dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/categories")}
                className="w-full"
              >
                Browse More Categories
              </Button>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <button 
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-designer-primary hover:text-designer-primary/80"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Designer Profile
            </button>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Book {designer.name}</h1>
            <p className="text-gray-600">Complete the form below to book this designer</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <Label htmlFor="category" className="text-base">Select Category</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        {categories.map((category) => (
                          <div
                            key={category.id}
                            className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                              selectedCategory === category.id
                                ? 'border-designer-primary bg-designer-primary/5'
                                : 'border-gray-200 hover:border-designer-primary/50'
                            }`}
                            onClick={() => handleCategoryChange(category.id)}
                          >
                            <div className="font-medium text-gray-900">{category.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedCategory && (
                      <div>
                        <Label htmlFor="subcategory" className="text-base">Select Subcategory</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          {getCategoryById(selectedCategory)?.subcategories.map((subcategory) => (
                            <div
                              key={subcategory.id}
                              className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                                selectedSubcategory === subcategory.id
                                  ? 'border-designer-primary bg-designer-primary/5'
                                  : 'border-gray-200 hover:border-designer-primary/50'
                              }`}
                              onClick={() => handleSubcategoryChange(subcategory.id)}
                            >
                              <div className="font-medium text-gray-900">{subcategory.name}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedSubcategory && (
                      <div>
                        <Label htmlFor="subSubcategory" className="text-base">Select Type</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                          {getCategoryById(selectedCategory)?.subcategories
                            .find(sub => sub.id === selectedSubcategory)
                            ?.subSubcategories.map((subSubcategory) => (
                              <div
                                key={subSubcategory.id}
                                className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                                  selectedSubSubcategory === subSubcategory.id
                                    ? 'border-designer-primary bg-designer-primary/5'
                                    : 'border-gray-200 hover:border-designer-primary/50'
                                }`}
                                onClick={() => setSelectedSubSubcategory(subSubcategory.id)}
                              >
                                <div className="font-medium text-gray-900">{subSubcategory.name}</div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
                  </div>
                  <div className="p-6">
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal">PayPal</Label>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === "credit-card" && (
                      <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Cardholder Name</Label>
                          <Input
                            id="card-name"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-expiry">Expiry Date</Label>
                            <Input
                              id="card-expiry"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="card-cvc">CVC</Label>
                            <Input
                              id="card-cvc"
                              placeholder="123"
                              value={cardCVC}
                              onChange={(e) => setCardCVC(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === "paypal" && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                        <p className="text-gray-600 mb-4">
                          You will be redirected to PayPal to complete your payment after submitting this form.
                        </p>
                        <img 
                          src="/placeholder.svg" 
                          alt="PayPal" 
                          className="h-8 mx-auto"
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-designer-primary hover:bg-designer-primary/90 text-white"
                  disabled={isBooking}
                >
                  {isBooking ? "Processing..." : "Complete Booking"}
                </Button>
              </form>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                    <CardDescription>Designer details and pricing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={designer.avatar}
                          alt={designer.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{designer.name}</div>
                        <div className="text-sm text-gray-500">{designer.specialties.join(", ")}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Designer Rate</span>
                        <span className="font-medium">${designer.price}/hr</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Consultation (1 hour)</span>
                        <span className="font-medium">${designer.price}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="font-medium">${Math.round(designer.price * 0.1)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-gray-200 pt-4">
                    <div className="w-full flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-semibold text-gray-900">
                        ${designer.price + Math.round(designer.price * 0.1)}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookDesigner;
