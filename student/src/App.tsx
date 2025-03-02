import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/(navbar)"
import Home from "./components/(home)"
import Footer from "./components/(home)/footer"
import { useAuth } from "./(providers)/AuthContext"
import { Login } from "./components/(auth)"
import { NotFoundPage } from "./(page)"

const App = () => {
  const { user, authLoading } = useAuth()
  return (
    <BrowserRouter>
      {
        authLoading
          ?
          <Loading />
          :
          <>
            <Navbar />
            {
              user
                ?
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                :
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
            }
            <Footer />
          </>
      }
    </BrowserRouter>
  )
}

export default App

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50"></div>
    </div>
  )
}