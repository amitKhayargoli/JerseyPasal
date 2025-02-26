import { ShoppingBagIcon, ShoppingCartIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ isHomePage, products }) => {
  return (
    <div className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between min-h-[4rem]">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ShoppingCartIcon className="w-9 h-9 text-primary fill-white" />
              <span className="text-2xl font-mono font-semibold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-white">
                AdminDashboard
              </span>
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4">
            {isHomePage && (
              <div className="relative group">
                <div className="p-2 rounded-full bg-gray-900 hover:bg-gray-800 transition-all duration-300 ease-in-out shadow-lg cursor-pointer flex items-center justify-center ring-1 ring-gray-700 hover:ring-gray-600">
                  <ShoppingBagIcon className="w-6 h-6 fill-white text-white" />
                  {products.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-md">
                      {products.length}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
