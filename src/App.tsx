import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BreadcrumbNavigation from "./components/BreadcrumbNavigation";
import Index from "./pages/Index";
import Tree from "./pages/Tree";
import EditMember from "./pages/EditMember";
import MemberProfile from "./pages/MemberProfile";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Heritage from "./pages/Heritage";
import Changelog from "./pages/Changelog";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <BreadcrumbNavigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tree" element={<Tree />} />
              <Route path="/edit-member" element={<EditMember />} />
              <Route path="/member/:id" element={<MemberProfile />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/heritage" element={<Heritage />} />
              <Route path="/changelog" element={<Changelog />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
