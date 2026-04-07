import { useNavigate } from "react-router-dom";
import { WordRotate } from "../components/WordRotate";
import Header from "../components/Header";
import Underline from "../components/Underline";
import Footer from "../components/Footer";
import { generateRoomId } from "../lib/utils"; 

const Homepage = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    navigate(`/chat/${newRoomId}`); 
  };

  return (
    /* Main Wrapper: Scrollbar hidden aur full screen */
    <div className="h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500 overflow-hidden">
      
      {/* Header with ThemeToggle */}
      <Header />
      
      {/* Main Hero Section */}
      <main className="flex flex-1 justify-center items-center flex-col bg-linear-to-t from-violet-50 to-white dark:from-neutral-900 dark:to-neutral-950 py-12">
        
        {/* Balanced Heading Section */}
        <div className="font-extrabold text-4xl sm:text-5xl lg:text-7xl font-bricolage-grotesque flex flex-row items-center justify-center gap-x-1 sm:gap-x-3 text-indigo-900 dark:text-indigo-400 text-center w-full">
          
          {/* Left Text */}
          <h1 className="whitespace-nowrap">Experience</h1>

          {/* Rotating Word Container: min-w optimized for proximity */}
          <div className="relative flex items-center justify-center min-w-[32.5] sm:min-w-[60] px-1">
            <WordRotate
              words={["Secure", "Private", "Instant"]}
              duration={2500}
              className="text-indigo-700 dark:text-indigo-400" 
            />
          </div>

          {/* Right Text */}
          <h1 className="whitespace-nowrap">Chats</h1>
        </div>

        {/* Sub-text / Description */}
        <div className="mt-8 px-8 sm:text-lg xl:text-xl max-w-2xl font-medium text-center text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Chat without a footprint. Anonymous chat rooms for secure, temporary
          conversations.
          <div className="block sm:inline-block sm:ml-2 font-bold text-indigo-700 dark:text-indigo-300">
            No data saved, ever.
            <div className="w-32 mx-auto sm:w-full">
              <Underline />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <section className="flex flex-col gap-4 mt-12 justify-center items-center font-semibold text-white w-full px-6">
          <button
            onClick={handleCreateRoom}
            className="group relative block bg-indigo-700 py-4 w-full max-w-sm text-center rounded-2xl hover:bg-indigo-600 shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-95 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 text-lg">Create a New Room</span>
          </button>
          
          <button
            onClick={() => navigate("/join")}
            className="block bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 py-4 w-full max-w-sm text-center rounded-2xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all active:scale-95 cursor-pointer border border-neutral-200 dark:border-neutral-700 shadow-sm"
          >
            Join Existing Room
          </button>
        </section>

      </main>
      
      <Footer />
    </div>
  );
};

export default Homepage;
