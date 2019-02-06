import React from 'react'
import Icon from '../img/icon.png'

const Splash = () =>
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    '-webkit-app-region': 'drag',
  }}>
    <img src={ Icon } style={{ width: '50%', height: 'auto' }} alt='ModSaber Logo' />
    <div style={{ textAlign: 'center' }}>
      <h1 className='is-size-4 has-text-weight-semibold'>ModSaber Installer</h1>
      <h3><i className='fas fa-cog fa-spin'></i> Loading...</h3>
    </div>
  </div>

export default Splash
