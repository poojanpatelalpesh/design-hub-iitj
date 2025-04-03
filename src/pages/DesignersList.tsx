
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";
import { ArrowLeft, Star, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const DesignersList = () => {
  const { categoryId, subcategoryId, subSubcategoryId } = useParams();
  const navigate = useNavigate();
  const { 
    getCategoryById, 
    getSubcategoryById, 
    getSubSubcategoryById,
    getDesignersForSubSubcategory 
  } = useData();
  
  if (!categoryId || !subcategoryId || !subSubcategoryId) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Parameters</h1>
            <Button onClick={() => navigate("/categories")}>
              Back to Categories
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const category = getCategoryById(categoryId);
  const subcategory = getSubcategoryById(categoryId, subcategoryId);
  const subSubcategory = getSubSubcategoryById(categoryId, subcategoryId, subSubcategoryId);
  
  if (!category || !subcategory || !subSubcategory) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
            <Button onClick={() => navigate("/categories")}>
              Back to Categories
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const designers = getDesignersForSubSubcategory(categoryId, subcategoryId, subSubcategoryId);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <button 
              onClick={() => navigate(`/categories/${categoryId}/${subcategoryId}`)}
              className="inline-flex items-center text-designer-primary hover:text-designer-primary/80"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to {subcategory.name} Types
            </button>
          </div>
          
          <div className="mb-8">
            <div className="text-sm text-designer-primary mb-2">
              {category.name} &gt; {subcategory.name} &gt; {subSubcategory.name}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{subSubcategory.name} Designers</h1>
            <p className="text-gray-600">
              Browse and select from our specialized {subcategory.name.toLowerCase()} {subSubcategory.name.toLowerCase()} designers
            </p>
          </div>
          
          <div className="space-y-6">
            {designers.length > 0 ? (
              designers.map((designer) => (
                <div 
                  key={designer.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                          <img
                            src={designer.avatar}
                            alt={designer.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h2 className="text-xl font-semibold text-gray-900">{designer.name}</h2>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 text-sm font-medium text-gray-700">{designer.rating}</span>
                              </div>
                              <span className="mx-2 text-gray-300">•</span>
                              <span className="text-sm text-gray-500">
                                {designer.specialties.join(", ")}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex items-center">
                            <Badge variant="outline" className="flex items-center mr-4">
                              <DollarSign className="h-3.5 w-3.5 mr-1" />
                              {designer.price}/hr
                            </Badge>
                            <Button 
                              onClick={() => navigate(`/designer/${designer.id}`)}
                              className="bg-designer-primary hover:bg-designer-primary/90 text-white"
                            >
                              View Profile
                            </Button>
                          </div>
                        </div>
                        
                        <p className="mt-4 text-gray-600">
                          {designer.description}
                        </p>
                        
                        <div className="mt-4">
                          <div className="text-sm font-medium text-gray-700 mb-2">Portfolio Preview</div>
                          <div className="flex space-x-3 overflow-x-auto pb-2">
                            {designer.portfolio.map((image, index) => (
                              <div key={index} className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden bg-gray-100">
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
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Designers Available</h3>
                <p className="text-gray-600 mb-4">We couldn't find any designers for this category at the moment.</p>
                <Button onClick={() => navigate(`/categories/${categoryId}/${subcategoryId}`)}>
                  Go Back
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DesignersList;
