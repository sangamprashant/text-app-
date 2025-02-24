import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/(navbar)"
import Home from "./components/(home)"
import Footer from "./components/(home)/footer"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App