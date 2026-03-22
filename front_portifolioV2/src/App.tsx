import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/adm/cms"
        element={(
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        )}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
