// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import DisplayPolicy from "./pages/Policy/DisplayPolicy"

const SimpleTest = () => {
  return <div className="p-4 bg-green-200 text-black">Lorem Simple Test</div>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Test with simple content */}
          <Route index element={<SimpleTest />} />
          <Route path="/policy-management" element={<DisplayPolicy />} />
        </Route>
      </Routes>
    </Router>
  );
}