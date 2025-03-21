
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import FriendsPage from "./pages/FriendsPage";
import GiftsPage from "./pages/GiftsPage";
import ProfilePage from "./pages/ProfilePage";
import GamesPage from "./pages/GamesPage";
import GameDetailsPage from "./pages/GameDetailsPage";
import StorePage from "./pages/StorePage";
import MerchantPage from "./pages/MerchantPage";
import { AuthProvider } from "./context/AuthContext";
import AppWrapper from "./components/layout/AppWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route 
              path="/chat" 
              element={<AppWrapper><ChatPage /></AppWrapper>} 
            />
            <Route 
              path="/friends" 
              element={<AppWrapper><FriendsPage /></AppWrapper>} 
            />
            <Route 
              path="/gifts" 
              element={<AppWrapper><GiftsPage /></AppWrapper>} 
            />
            <Route 
              path="/profile" 
              element={<AppWrapper><ProfilePage /></AppWrapper>} 
            />
            <Route 
              path="/games" 
              element={<AppWrapper><GamesPage /></AppWrapper>} 
            />
            <Route 
              path="/games/:gameId" 
              element={<AppWrapper><GameDetailsPage /></AppWrapper>} 
            />
            <Route 
              path="/store" 
              element={<AppWrapper><StorePage /></AppWrapper>} 
            />
            <Route 
              path="/merchant" 
              element={<AppWrapper><MerchantPage /></AppWrapper>} 
            />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
