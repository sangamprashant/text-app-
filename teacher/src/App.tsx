import { Route, Routes } from "react-router-dom"
import SideBar from "./components/SideBar"
import { Dashboard, LoginPage, NotFound, SettingPage } from "./pages"
import { useAuth } from "./providers/AuthenticationContext"

function App() {
  const { user } = useAuth()
  return (
    <>
      {user ?
        <SideBar>
          <Routes>
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<SettingPage />} />
              <Route path="*" element={<NotFound />} />
            </>
          </Routes>
        </SideBar>
        :
        <LoginPage />
      }
    </>
  )
}

export default App
