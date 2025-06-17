import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SingleListing from './pages/SingleListing'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/listing/:id" element={<SingleListing />} />
    </Routes>
  )
}

export default App
