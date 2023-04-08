import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import About from './pages/About'
import Contact from './pages/Contact'
import ShoppingCarts from './components/ShoppingCarts'
import { HiOutlineShoppingCart } from 'react-icons/Hi';
import Login from './pages/Login'
function App() {

  const [open, setOpen] = useState(false)
  return (
    <>
      {/* <Routes>
          <Route path="/login" element={<Login />} />
        </Routes> */}
      <div className="">
        <div data-dial-init class="fixed right-2 md:right-12 lg:right-16  z-50 bottom-16 group">
          <div id="speed-dial-menu-default" class=" flex-col items-center hidden mb-4 space-y-2">
          </div>
          <button type="button" data-dial-toggle="speed-dial-menu-default" aria-controls="speed-dial-menu-default" aria-expanded="false" class="flex items-center justify-center text-white bg-green-600 rounded-full w-14 h-14">
            <HiOutlineShoppingCart onClick={() => setOpen(!open)} class="w-8 h-8 transition-transform group-hover:rotate-45" />
          </button>
        </div>

        <Hero />
        <Navbar setOpen={setOpen} open={open} />
        {open && <ShoppingCarts open={open} setOpen={setOpen} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/login" element={<Login />} />


        </Routes>

        <Footer />
      </div>
    </>
  )
}

export default App
