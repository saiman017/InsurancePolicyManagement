// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DisplayPolicy from "./pages/Policy/DisplayPolicy"
import Home from "./pages/Dashboard/Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
        <Route index path="/" element={<Home />} />
          <Route path="/policy-management" element={<DisplayPolicy />} />
        </Route>
      </Routes>
    </Router>
  );
}