import { AppBar, Toolbar, Button } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React, {Suspense} from 'react';

function Header() {
  
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">{t('Home')}</Button>
        <Button color="inherit" component={RouterLink} to="/about">{t('About')}</Button>

        <Button color="inherit" onClick={() => changeLanguage('fi')} id="fi">FI</Button>
        <Button color="inherit" onClick={() => changeLanguage('en')} id="en">EN</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header