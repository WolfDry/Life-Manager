import React, { useState } from 'react'
import { pages } from '../pages'
import { Page } from '../types/global.types'

const AuthenticatedRouter = () => {

  const [currentPage, setCurrentPage] = useState<Page>(pages.find(page => page.label === "home")!)

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {currentPage.display()}
    </div>
  )
}

export default AuthenticatedRouter