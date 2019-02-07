import React from 'react'

import BottomBar from './components/BottomBar'
import MainTabs from './components/MainTabs'
import PathPicker from './components/PathPicker'

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
