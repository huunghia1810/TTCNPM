import React from 'react'
import { Layout, Row, Col } from 'antd'

const MyFooter = props => {
  const { Footer } = Layout

  return (
    <>
      <Footer style={{ background: '#fafafa' }}>
        <p className='copyright'>
          {' '}
          Copyright © 2022 Order System by <a href='#team'>TTCNPM's team</a>.{' '}
        </p>
      </Footer>
    </>
  )
}

export default MyFooter
