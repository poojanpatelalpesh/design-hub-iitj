
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Sparkles, CheckCircle2, Users, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/categories");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Connect with Top Fashion Designers
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                StyleConnect helps you find the perfect designer for your fashion and accessory needs. 
                From footwear to eyewear, we've got the talent you're looking for.
              </p>
              <div className="flex space-x-4">
                <Button 
                  className="bg-designer-primary hover:bg-designer-primary/90 text-white text-lg px-6 py-3 h-auto"
                  onClick={handleGetStarted}
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  className="border-designer-primary text-designer-primary hover:bg-designer-primary/10"
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <div className="relative">
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                  <div className="bg-designer-primary h-12 flex items-center px-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-100 rounded-lg p-4 aspect-square flex items-center justify-center">
                        <img src="/placeholder.svg" alt="Footwear" className="w-16 h-16" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4 aspect-square flex items-center justify-center">
                        <img src="/placeholder.svg" alt="Eyewear" className="w-16 h-16" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4 aspect-square flex items-center justify-center">
                        <img src="/placeholder.svg" alt="Headwear" className="w-16 h-16" />
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4 aspect-square flex items-center justify-center">
                        <Sparkles className="w-16 h-16 text-designer-secondary opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-designer-secondary text-white px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-sm font-medium">Premium Designers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              StyleConnect makes it easy to find and book specialized designers for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="bg-designer-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-designer-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Designer</h3>
              <p className="text-gray-600">
                Browse through categories and subcategories to find designers specializing in exactly what you need.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="bg-designer-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-designer-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Consultation</h3>
              <p className="text-gray-600">
                Select a designer and book a consultation to discuss your project requirements and expectations.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <div className="bg-designer-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-designer-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your project status from your personalized dashboard and communicate with your designer.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-designer-primary to-designer-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to find your designer?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Join StyleConnect today and connect with top designers in your desired category.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-designer-primary hover:bg-gray-100"
              onClick={handleGetStarted}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
