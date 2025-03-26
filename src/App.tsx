
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CycleProvider } from "@/context/CycleContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/pages/Dashboard";
import Calendar from "@/pages/Calendar";
import Symptoms from "@/pages/Symptoms";
import Insights from "@/pages/Insights";
import Education from "@/pages/Education";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CycleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-cycle-pink-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/symptoms" element={<Symptoms />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/education" element={<Education />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </CycleProvider>
  </QueryClientProvider>
);

export default App;
