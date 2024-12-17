import EngineersPage from "@/pages/EngineersPage";
import { Route, Routes } from "react-router";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<EngineersPage />} />
    </Routes>
  );
}
