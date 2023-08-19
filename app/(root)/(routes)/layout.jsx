import Heading from "@/components/heading";
import Navbar from "@/components/navbar";
const HomeLayout = ({ children }) => {
  return (
    <div className="h-full ">
      <div className="fixed w-full z-[80]">
        <Navbar user={false} userId={false} />
      </div>
      
      <div className="pt-12 min-h-full bg-[#f8f9fa] ">{children}</div>
    </div>
  );
};

export default HomeLayout;
