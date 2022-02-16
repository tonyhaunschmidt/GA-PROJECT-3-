import React from 'react'
// import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//COMPONENTS:
import Welcome from './components/pages/Welcome_page'
import Search from './components/pages/Search_page'
import Login from './components/pages/Login_page'
import Register from './components/pages/Register_page'
import Profile from './components/pages/Profile_page'
import UpdateProfile from './components/pages/UpdateProfile_page'
import MyRecipes from './components/pages/MyRecipes_page'
import Recipe from './components/pages/Recipe_page'
import AddRecipe from './components/pages/AddRecipe_page'
import ShoppingList from './components/pages/ShoppingList_page'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='search' element={<Search />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='profile/:id' element={<Profile />} />
        <Route path='updateprofile' element={<UpdateProfile />} />
        <Route path='myrecipes' element={<MyRecipes />} />
        <Route path='recipe/:id' element={<Recipe />} />
        <Route path='addrecipe' element={<AddRecipe />} />
        <Route path='shoppinglist' element={<ShoppingList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
