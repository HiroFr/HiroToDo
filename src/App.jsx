import "./assets/styles/App.css";
import Footer from "./components/Footer";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";
import useStore from "./store/store";
import { useState, useEffect } from "react";

function App() {
  const theme = useStore((state) => state.theme);
  const [query, setQuery] = useState("");

    useEffect(() => {
      const root = document.documentElement;
      if (theme) root.classList.add("dark");
      else root.classList.remove("dark");
    }, [theme]);
  return (
    <>
      <div className="bg-background text-primary text-base py-5 px-6 h-[600px] w-[642px]">
        <Navbar setQuery={setQuery} />
        <div className="flex-1 overflow-y-auto scrollbar h-[491px]">
          <ItemList query={query} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
