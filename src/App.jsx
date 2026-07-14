import { Route, Routes } from "react-router"

import Home from "@/pages/Home"
import Projects from "@/pages/Projects"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  )
}