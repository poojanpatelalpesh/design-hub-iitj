
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";
import { ArrowLeft, Star, DollarSign, Calendar, Clock, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DesignerProfile = () => {
  const { designerId } = useParams();
  const navigate = useNavigate();
  const { getDesignerById } = useData();
  
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
              Back
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 flex justify-center">
                  <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={designer.avatar}
                      alt={designer.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{designer.name}</h1>
                      <div className="flex items-center mt-2">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-lg font-medium text-gray-700">{designer.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-300">•</span>
                        <Badge variant="outline" className="flex items-center">
                          <DollarSign className="h-3.5 w-3.5 mr-1" />
                          {designer.price}/hr
                        </Badge>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-sm font-medium text-gray-700 mb-1">Specialties</div>
                        <div className="flex flex-wrap gap-2">
                          {designer.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 md:mt-0">
                      <Button 
                        onClick={() => navigate(`/book/${designer.id}`)}
                        className="w-full md:w-auto bg-designer-primary hover:bg-designer-primary/90 text-white"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
                    <p className="text-gray-600">
                      {designer.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="portfolio" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Portfolio</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {designer.portfolio.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden bg-gray-100 aspect-square">
                        <img
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="contact">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Email</div>
                        <div className="text-gray-700">contact@{designer.name.toLowerCase().replace(' ', '')}design.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Phone</div>
                        <div className="text-gray-700">+1 (555) 123-4567</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Availability</div>
                        <div className="text-gray-700">Monday - Friday, 9:00 AM - 5:00 PM</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-500">Response Time</div>
                        <div className="text-gray-700">Usually within 24 hours</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button 
                      onClick={() => navigate(`/book/${designer.id}`)}
                      className="w-full bg-designer-primary hover:bg-designer-primary/90 text-white"
                    >
                      Book This Designer
                    </Button>
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

export default DesignerProfile;
