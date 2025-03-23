import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Game from './pages/Game'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminRoute from './components/auth/AdminRoute'
import WriteReview from './pages/WriteReview'
import { Toaster } from "sonner"
import Games from './pages/Games'
import AdminDash from './pages/Admin/AdminDash'
import GamesAdmin from './pages/Admin/Game'
import NewGame from './pages/Admin/NewGame'
import Category from './pages/Admin/Category'
import NewCategory from './pages/Admin/NewCategory'
import Publishers from './pages/Admin/Publishers'
import NewPublisher from './pages/Admin/NewPublishers'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/:id"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
          <Route
            path="/games/:id/review"
            element={
              <ProtectedRoute>
                <WriteReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDash />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/games"
            element={
              <AdminRoute>
                <GamesAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/games/new"
            element={
              <AdminRoute>
                <NewGame />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <Category />
              </AdminRoute>
            }
          />  
          <Route
            path="/admin/categories/new"
            element={
              <AdminRoute>
                <NewCategory />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/publishers"
            element={
              <AdminRoute>
                <Publishers />
              </AdminRoute> 
            }
          />
          <Route
            path="/admin/publishers/new"
            element={
              <AdminRoute>
                <NewPublisher />
              </AdminRoute>
            }
          />
        </Routes>
        <Routes>
          <Route path="/games" element={<ProtectedRoute><Games /></ProtectedRoute>} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
