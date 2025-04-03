
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, TrendingUp, Clock, ArrowRight } from "lucide-react";

const Trending = () => {
  const navigate = useNavigate();
  
  const trendingDesigners = [
    {
      id: "designer-1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      rating: 4.8,
      specialties: ["Footwear", "Athletic", "Running"],
      projects: 37,
      followers: 1240,
      featured: true
    },
    {
      id: "designer-3",
      name: "Marcus Williams",
      avatar: "/placeholder.svg",
      rating: 4.7,
      specialties: ["Eyewear", "Sunglasses", "Premium"],
      projects: 52,
      followers: 890,
      featured: false
    },
    {
      id: "designer-2",
      name: "Sophia Chen",
      avatar: "/placeholder.svg",
      rating: 4.9,
      specialties: ["Footwear", "Casual", "Sneakers"],
      projects: 41,
      followers: 1560,
      featured: true
    }
  ];
  
  const latestProjects = [
    {
      id: "project-1",
      title: "Minimalist Running Shoe",
      designer: "Alex Johnson",
      designerId: "designer-1",
      category: "Footwear",
      image: "/placeholder.svg",
      date: "2 days ago"
    },
    {
      id: "project-2",
      title: "Fashion-Forward Sunglasses",
      designer: "Marcus Williams",
      designerId: "designer-3",
      category: "Eyewear",
      image: "/placeholder.svg",
      date: "3 days ago"
    },
    {
      id: "project-3",
      title: "Urban Street Sneakers",
      designer: "Sophia Chen",
      designerId: "designer-2",
      category: "Footwear",
      image: "/placeholder.svg",
      date: "5 days ago"
    },
    {
      id: "project-4",
      title: "Eco-Friendly Casual Cap",
      designer: "Daniel Kim",
      designerId: "designer-5",
      category: "Headwear",
      image: "/placeholder.svg",
      date: "1 week ago"
    }
  ];
  
  const trendingCategories = [
    {
      id: "category-1",
      name: "Footwear",
      growth: "+12% this month",
      image: "/placeholder.svg"
    },
    {
      id: "category-2",
      name: "Eyewear",
      growth: "+8% this month",
      image: "/placeholder.svg"
    },
    {
      id: "category-3",
      name: "Headwear",
      growth: "+5% this month",
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Trending on StyleConnect</h1>
            <p className="text-gray-600">Discover what's hot in the world of design right now</p>
          </div>
          
          <Tabs defaultValue="designers" className="space-y-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="designers">Designers</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="designers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingDesigners.map((designer) => (
                  <div 
                    key={designer.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 relative"
                  >
                    {designer.featured && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-designer-accent">Featured</Badge>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={designer.avatar}
                            alt={designer.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{designer.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span className="ml-1 text-sm font-medium text-gray-700">{designer.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-sm font-medium text-gray-700 mb-1">Specialties</div>
                        <div className="flex flex-wrap gap-2">
                          {designer.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-500 mb-4">
                        <div>{designer.projects} Projects</div>
                        <div>{designer.followers.toLocaleString()} Followers</div>
                      </div>
                      
                      <div className="mt-4">
                        <Button 
                          onClick={() => navigate(`/designer/${designer.id}`)}
                          className="w-full bg-designer-primary hover:bg-designer-primary/90 text-white"
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/categories")}
                  className="border-designer-primary text-designer-primary hover:bg-designer-primary/10"
                >
                  Browse All Designers
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <div className="flex items-center text-gray-600 mb-4">
                        <span>by </span>
                        <button 
                          className="ml-1 text-designer-primary hover:underline"
                          onClick={() => navigate(`/designer/${project.designerId}`)}
                        >
                          {project.designer}
                        </button>
                        <span className="mx-2">•</span>
                        <Badge variant="outline">{project.category}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingCategories.map((category) => (
                  <div 
                    key={category.id} 
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => navigate(`/categories/${category.id}`)}
                  >
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <div className="flex items-center text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{category.growth}</span>
                      </div>
                      <div className="mt-4 flex justify-end text-designer-primary font-medium">
                        <div className="flex items-center">
                          Explore <ArrowRight className="ml-1 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <Button 
                  variant="outline"
                  onClick={() => navigate("/categories")}
                  className="border-designer-primary text-designer-primary hover:bg-designer-primary/10"
                >
                  Browse All Categories
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Trending;
