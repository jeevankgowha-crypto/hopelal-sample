import { Outlet } from "react-router-dom";
import Chatbot from "./components/Chatbot.jsx";
import FloatingActions from "./components/FloatingActions.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <Chatbot />
    </div>
  );
}
