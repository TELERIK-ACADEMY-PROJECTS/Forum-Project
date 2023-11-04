import Home from "./views/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Login from "./views/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./views/Signup/Signup";
import About from "./views/About/About";
import PublicView from "./views/PublicView/PublicView";
import Notfound from "./views/Notfound/Notfound";
import EditorsChoice from "./views/EditorsChoice/EditorsChoice";
import SinglePostView from "./views/SinglePostView/SinglePostView";


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicView />} />
        <Route path="/home" element={<Home />} />
        <Route path="/singlePostView" element={<SinglePostView />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/About" element={<About />} />
        <Route path="/EditorsChoice" element={<EditorsChoice />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
