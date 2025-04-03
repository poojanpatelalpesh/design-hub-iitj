
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useData } from "@/context/DataContext";
import { Shirt, Glasses, Crown, ShoppingBag, Gem, Briefcase, Palette, Scissors, Laptop, PenTool } from "lucide-react";

const Categories = () => {
  const { categories } = useData();

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case "shirt":
        return <Shirt className="h-10 w-10" />;
      case "glasses":
        return <Glasses className="h-10 w-10" />;
      case "crown":
        return <Crown className="h-10 w-10" />;
      case "bag":
        return <Briefcase className="h-10 w-10" />;
      case "jewel":
        return <Gem className="h-10 w-10" />;
      case "palette":
        return <Palette className="h-10 w-10" />;
      case "scissors":
        return <Scissors className="h-10 w-10" />;
      case "laptop":
        return <Laptop className="h-10 w-10" />;
      case "pentool":
        return <PenTool className="h-10 w-10" />;
      default:
        return <ShoppingBag className="h-10 w-10" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
            <p className="text-gray-600">Browse design categories to find the perfect designer for your needs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/categories/${category.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {category.image && (
                  <div className="w-full h-40 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="w-14 h-14 bg-designer-primary/10 rounded-full flex items-center justify-center mb-4">
                    <div className="text-designer-primary">
                      {getCategoryIcon(category.icon)}
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h2>
                  <p className="text-gray-600 mb-4">
                    Find designers specializing in {category.name.toLowerCase()} design and customization.
                  </p>
                  <div className="text-designer-primary font-medium">
                    {category.subcategories.length} Subcategories &rarr;
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

export default Categories;
