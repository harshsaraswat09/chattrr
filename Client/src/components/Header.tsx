import { useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="p-4 px-6 md:px-12 flex justify-between items-center border-b dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
      {/* Logo Section */}
      <div 
        onClick={() => navigate("/")} 
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
          <MessageSquare className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-black tracking-tighter dark:text-white">Chattr.</span>
      </div>

      {/* Right Side Section */}
      <div className="flex items-center gap-4">
        {/* YAHAN DAAL DIYA THEME TOGGLE */}
        
        <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800 hidden sm:block"></div>
        
      </div>
    </header>
  );
};

export default Header;
