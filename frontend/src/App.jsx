import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify';


function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth && authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }


  console.log('====================================');
  console.log(authUser);
  console.log('====================================');


  return (
    <>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
          <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to='/' />} />
          <Route path='/login' element={!authUser ? <Login /> : <Navigate to='/' />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/login' />} />
        </Routes>
      </Router>
      <ToastContainer
        draggable
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
