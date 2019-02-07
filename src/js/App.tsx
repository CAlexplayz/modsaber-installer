import React from 'react'

import BottomBar from './components/BottomBar.jsx'
import MainTabs from './components/MainTabs.jsx'
import PathPicker from './components/PathPicker.jsx'

const App = () => (
  <div className='layout'>
    <div className='layout-item top'>
      <PathPicker />
    </div>

    <div className='layout-item main'>
      <MainTabs />
    </div>

    <div className='layout-item bottom'>
      <BottomBar />
    </div>
  </div>
)

export default App
