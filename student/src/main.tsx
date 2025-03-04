import { createRoot } from 'react-dom/client'
import { AuthProvider } from './(providers)/AuthContext.tsx'
import App from './App.tsx'
import './index.css'
import { NotificationProvider } from './(providers)/NotificationContext.tsx'
import { AppProvider } from './(providers)/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <NotificationProvider>
      <AuthProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </AuthProvider>
    </NotificationProvider>
  </>
)
