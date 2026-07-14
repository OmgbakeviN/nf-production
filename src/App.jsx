import { Route, Routes } from "react-router"

import Home from "@/pages/Home"
import Projects from "@/pages/Projects"
import ProjectDetails from "@/pages/ProjectDetails"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
    </Routes>
  )
}