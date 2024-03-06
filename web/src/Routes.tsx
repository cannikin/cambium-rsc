// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'

import AppLayout from './layouts/AppLayout/AppLayout'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

const Routes = () => {
  return (
    <Router>
      <Route path="/photos/{id:Int}" page={PhotoPage} name="photo" />

      <Set wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/photos/{id:Int}/edit" page={EditPhotoPage} name="edit" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
