import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SingleListing from './pages/SingleListing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing" element={<SingleListing />} />
    </Routes>
  )
}

export default App
