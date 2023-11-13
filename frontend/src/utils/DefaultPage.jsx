import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

const DefaultPage = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default DefaultPage