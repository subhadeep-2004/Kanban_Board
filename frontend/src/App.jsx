import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import KanbanBoard from './components/KanbanBoard'
import NavBar from './components/NavBar'
import { TaskProvider } from "./context/TaskContext"


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer />
    <NavBar></NavBar>
    <TaskProvider>
      <KanbanBoard />
    </TaskProvider>
    </>
  )
}

export default App
