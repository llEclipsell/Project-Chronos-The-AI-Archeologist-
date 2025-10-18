import { Routes, Route } from 'react-router-dom'
import { Container, Box } from '@mantine/core'
import Header from './components/Header'
import NavBar from './components/NavBar';
import Footer from './components/Footer'
import Home from './pages/Home'
import Report from './pages/Report'
import History from './pages/History'

export default function App() {
  return (
    <>
      {/* Use Box for flex column layout to push footer down */}
      <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <NavBar /> {/* Add NavBar here */}
        {/* Add className for flex-grow */}
        <Container size="xl" my="xl" className="main-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/report/:id?" element={<Report />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </>
  )
}
