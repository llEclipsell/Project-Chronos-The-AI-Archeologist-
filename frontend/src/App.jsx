import { Routes, Route } from 'react-router-dom'
import { Container } from '@mantine/core'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Report from './pages/Report'
import History from './pages/History'

export default function App() {
  return (
    <>
      <Header />
      <Container size="lg" my="md" style={{ minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report/:id?" element={<Report />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Container>
      <Footer />
    </>
  )
}
