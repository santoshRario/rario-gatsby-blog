import React from 'react'

import './variables.css'
import './global.css'

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <main style={{ height: '100vh', width: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
        {children}
      </main>
    )
  }
}

export default Template
