import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SidebarProvider } from './providers/SidebarContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthenticationContext.tsx'
import { NotificationProvider } from './providers/NotificationContext.tsx'
import { CoursesListProvider } from './providers/CoursesListContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NotificationProvider>
      <AuthProvider>
        <CoursesListProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </CoursesListProvider>
      </AuthProvider>
    </NotificationProvider>
  </BrowserRouter>
)
