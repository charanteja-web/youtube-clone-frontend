import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Video from "./pages/Video/Video";
import Search from "./pages/Search/Search";
import { useState, useEffect } from "react";

function App() {
  const [sidebar, setSidebar] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "";
  }, [darkMode]);

  return (
    <div>
      <Navbar setSidebar={setSidebar} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        <Route path="/search/:query" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;



