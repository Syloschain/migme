
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E0F7FF] to-[#B3E5FC]">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 pb-20 md:pb-6">
        {children}
      </main>
      <MobileNav />
      <Toaster />
    </div>
  );
};

export default Layout;
