import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar'
import Video from './Pages/Video/Video'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'

const App = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Navbar settingopen={setOpen}/>
      <Routes>
        <Route path='/' element={<Home settingopen={setOpen} opening={open}/>} />
        <Route path='/video/:categoryId/:videoId' element={<Video/>} />
      </Routes>
    </>
  )
}

export default App