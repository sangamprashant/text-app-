import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotFoundPage } from "./(page)"
import { useAuth } from "./(providers)/AuthContext"
import { Login } from "./components/(auth)"
import Home from "./components/(home)"
import Footer from "./components/(home)/footer"
import Navbar from "./components/(navbar)"
import { Quiz } from "./components/(quiz)"
import { Result } from "./components/(result)"
import { useAppContext } from "./(providers)/AppContext"

const App = () => {
  const { user, authLoading } = useAuth()
  const { quizActive } = useAppContext()
  return (
    <BrowserRouter>
      {
        authLoading
          ?
          <Loading />
          :
          <>
            {!quizActive && <Navbar />}
            {
              user
                ?
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/quiz/:id" element={<Quiz />} />
                  <Route path="/result/:id" element={<Result />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                :
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
            }
            {!quizActive && <Footer />}
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