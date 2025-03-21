
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 pb-20 md:pb-6">
        {children}
      </main>
      <MobileNav />
    </div>
  );
};

export default Layout;
