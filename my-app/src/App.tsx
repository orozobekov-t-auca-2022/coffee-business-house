import { Route, Routes } from "react-router-dom"
import Main from "./pages/Main"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Header from "./components/Header"
import Footer from "./components/Footer"
import './provider/i18n';
import Feedback from "./pages/Feedback"

function App() {
  return (
    <>
        <Header/>
        <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/registration" element={<Registration/>} />
            <Route path="/feedback" element={<Feedback/>} />
        </Routes>
        <Footer/>
    </>
  )
}

export default App
