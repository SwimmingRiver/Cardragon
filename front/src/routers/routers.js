import { Routes,Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Home from "../components/Home";
import Search from "../components/Search";
import Profile from "../components/Profile";

const Routers=()=>{
    return(
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign_up" element={<SignUp/>} />
        <Route path="/sign_in" element={<SignIn/>} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/profile" element={<Profile/>}/>
    </Routes>
    )   
}
export default Routers;