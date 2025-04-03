
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const Subcategories = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { getCategoryById } = useData();
  
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  
  if (!category) {
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-2">
            <button 
              onClick={() => navigate("/categories")}
              className="inline-flex items-center text-designer-primary hover:text-designer-primary/80"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Categories
            </button>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name} Subcategories</h1>
            <p className="text-gray-600">Select a subcategory to find specialized designers</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={`/categories/${category.id}/${subcategory.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="w-12 h-12 bg-designer-primary/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-designer-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{subcategory.name}</h2>
                  <p className="text-gray-600 mb-4">
                    Find designers specializing in {category.name.toLowerCase()} {subcategory.name.toLowerCase()}.
                  </p>
                  <div className="text-designer-primary font-medium">
                    {subcategory.subSubcategories.length} Types &rarr;
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Subcategories;
