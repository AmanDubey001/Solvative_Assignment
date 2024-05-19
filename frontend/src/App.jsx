import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserInput from './pages/UserInput'
import P5Balance from './pages/P5Balance'
import Rewards from './Rewards'
import NewRewards from './NewRewards'


function App() {
  return (
    <div className='main'>
    <Routes>
    <Route  path="/" element={<Home/>} />
    <Route exact path="/:id" element={<UserInput/>} />
    <Route exact path="/:id/p5" element={<P5Balance/>} />
    <Route exact path="/:id/rewards" element={<Rewards/>} />
    <Route exact path="/:id/rewards/new" element={<NewRewards/>} />
    <Route  path="/new" element={<UserInput/>} />

    </Routes>
    </div>
  )
}

export default App
