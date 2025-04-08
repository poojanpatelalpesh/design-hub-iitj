
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users, Target, Sparkles, Globe } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About StyleConnect</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting innovative clients with talented designers to create the next generation of fashion and accessories.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At StyleConnect, we believe that great design should be accessible to everyone. Our mission is to democratize design by connecting talented designers with clients who need their expertise.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We're building a world where finding the perfect designer for your specific needs is as easy as a few clicks. No more endless searching or settling for generic designs.
              </p>
              <Button
                onClick={() => navigate("/categories")}
                className="bg-designer-primary hover:bg-designer-primary/90 text-white"
              >
                Explore Designers
              </Button>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Users className="h-8 w-8 text-designer-primary mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Connected Community</h3>
                  <p className="text-gray-600">
                    Building bridges between designers and clients around the world.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Target className="h-8 w-8 text-designer-secondary mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Targeted Expertise</h3>
                  <p className="text-gray-600">
                    Find designers who specialize in exactly what you need.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Sparkles className="h-8 w-8 text-designer-accent mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Design</h3>
                  <p className="text-gray-600">
                    Only the best designers are featured on our platform.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <Globe className="h-8 w-8 text-designer-primary mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-gray-600">
                    Access top designers from anywhere in the world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              How StyleConnect came to life and evolved into the platform you see today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-designer-primary font-bold text-3xl mb-4">Jan'25</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">The Beginning</h3>
              <p className="text-gray-600">
                StyleConnect started as a small community of fashion designers looking to connect with clients who needed custom designs.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-designer-primary font-bold text-3xl mb-4">Feb'25</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth & Expansion</h3>
              <p className="text-gray-600">
                We expanded beyond fashion to include accessory designers, creating a more comprehensive platform for all design needs.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-designer-primary font-bold text-3xl mb-4">March'25</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">The Platform Today</h3>
              <p className="text-gray-600">
                Today, StyleConnect is the leading platform connecting clients with specialized designers across multiple categories.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the people behind StyleConnect who are passionate about bringing designers and clients together
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              
              {
                name: "Poojan Patel",
                role: "Co-Founder",
                image: "/placeholder.svg"
              },
              {
                name: "Raman Pareek",
                role: "Co-Founder",
                image: "/placeholder.svg"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 rounded-full overflow-hidden h-32 w-32 mx-auto bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
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
              onClick={() => navigate("/categories")}
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

export default AboutUs;
