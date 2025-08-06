import vector from '../../assets/navbar/Vector - 0.png';
import { Link } from "react-router-dom";

const Navbar = () => {
 
  
  

  return (
    <div className="w-full">
      <nav className="flex justify-between items-center py-4 px-8 bg-black text-white">
        <div className="flex items-center gap-2 md:gap-2">
          <img src={vector} alt="Logo" className="w-[16px] h-[16px]" />
          {/* Wrap the YogasanaAI text with a Link component */}
          <Link to="/" className="text-[15px] md:text-18px font-spaceGrotesk font-semibold text-white">
            StudentExamHub
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-6">
         
          
        </div>
      </nav>

      {/* Border Line */}
      <div className="border-b border-[#E5E8EB] w-full"></div>
    </div>
  );
};

export default Navbar;
