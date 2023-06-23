import React from 'react'

import Layout from '../components/layout'
import SEOHead from '../components/seo-head'

const NotFoundPage = () => (
  <Layout>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <h1>404: Not Found</h1>
    </div>
  </Layout>
)

export const Head = () => {
  return <SEOHead title="404: Page not found" />
}

export default NotFoundPage
