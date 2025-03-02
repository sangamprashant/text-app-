import { createRoot } from 'react-dom/client'
import { AuthProvider } from './(providers)/AuthContext.tsx'
import App from './App.tsx'
import './index.css'
import { NotificationProvider } from './(providers)/NotificationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <NotificationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </NotificationProvider>
  </>
)
