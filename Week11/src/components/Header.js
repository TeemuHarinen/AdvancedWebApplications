import { AppBar, Toolbar, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">{'Home'}</Button>
        <Button color="inherit" component={RouterLink} to="/about">{'About'}</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header