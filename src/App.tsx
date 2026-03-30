import { Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import NewNote from "./pages/NewNote"
import { Container } from "react-bootstrap"
function App() {
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* leads a wrongly written path to the home page */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>Edit</h1>} />
          <Route path="delete" element={<h1>Delete</h1>} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App
