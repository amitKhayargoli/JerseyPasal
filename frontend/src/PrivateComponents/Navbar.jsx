import { ShoppingCartIcon, LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isHomePage, products }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="bg-black/90 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between min-h-[4rem]">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <ShoppingCartIcon className="w-9 h-9 text-primary fill-white" />
            <span className="text-2xl font-mono font-semibold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-white">
              AdminDashboard
            </span>
          </div>

          {/* RIGHT SECTION */}
          <div onClick={handleLogout} className="flex items-center gap-4">
            <button className="flex items-center gap-2 p-2 rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out shadow-lg cursor-pointer text-white">
              <LogOutIcon className="w-6 h-6" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
