import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BreadcrumbNavigation from "./components/BreadcrumbNavigation";
import Index from "./pages/Index";
import Tree from "./pages/Tree";
import EditMember from "./pages/EditMember";
import MemberProfile from "./pages/MemberProfile";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <BreadcrumbNavigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tree" element={<Tree />} />
          <Route path="/edit-member" element={<EditMember />} />
          <Route path="/member/:id" element={<MemberProfile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
