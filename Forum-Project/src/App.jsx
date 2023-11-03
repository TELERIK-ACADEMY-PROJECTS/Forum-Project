import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Login from "./views/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./views/SignUp/SignUp";
import About from "./views/About/About";
import PublicView from "./views/PublicView/PublicView";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/About" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
