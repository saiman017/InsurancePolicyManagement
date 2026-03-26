import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppWrapper } from "./components/common/PageMeta.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover draggable />
          <AppWrapper>
            <App />
          </AppWrapper>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);