import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollManager from "@/components/layout/ScrollManager";
import Index from "./pages/Index";
import InfoPage from "./pages/InfoPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter basename={import.meta.env.BASE_URL} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ScrollManager />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/bilgi" element={<InfoPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
