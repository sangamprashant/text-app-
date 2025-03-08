import { Route, Routes } from "react-router-dom"
import SideBar from "./components/SideBar"
import { AddCoursePage, AddQuizPage, AddStudentPage, AddTeacherPage, Dashboard, LoginPage, MyStudentPage, NotFound, SettingPage, StudentProfile, ViewCoursePage, ViewQuizPage, ViewStudentsPage, ViewTeachersPage } from "./pages"
import { useAuth } from "./providers/AuthenticationContext"

function App() {
  const { user, authLoading } = useAuth()
  return (
    <div className="fixed top-0 w-full h-full">
      {authLoading ? (
        <Loading />
      ) : (
        <>
          {user ?
            <SideBar>
              {
                user.role === "admin" ?
                  <>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/courses" element={<ViewCoursePage />} />
                      <Route path="/courses/add" element={<AddCoursePage />} />
                      <Route path="/teachers" element={<ViewTeachersPage />} />
                      <Route path="/teachers/course/:code" element={<ViewTeachersPage />} />
                      <Route path="/teachers/add" element={<AddTeacherPage />} />
                      <Route path="/students" element={<ViewStudentsPage />} />
                      <Route path="/students/course/:code" element={<ViewStudentsPage />} />
                      <Route path="/students/add" element={<AddStudentPage />} />
                      <Route path="/settings" element={<SettingPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </>
                  :
                  <>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/settings" element={<SettingPage />} />
                      <Route path="/students" element={<MyStudentPage />} />
                      <Route path="/students-profile/:id" element={<StudentProfile />} />
                      <Route path="/quiz" element={<ViewQuizPage />} />
                      <Route path="/quiz/add" element={<AddQuizPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </>
              }
            </SideBar>
            :
            <LoginPage />
          }
        </>
      )
      }
    </div>
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