import React from 'react'
// import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

//COMPONENTS:
import Welcome from './components/Welcome_page'
import Search from './components/Search_page'
import Login from './components/Login_page'
import Register from './components/Register_page'
import ProfileOther from './components/Profile_other_page'
import Profile from './components/Profile_page'
import UpdateProfile from './components/UpdateProfile_page'
import MyRecipes from './components/MyRecipes_page'
import Recipe from './components/Recipe_page'
import AddRecipe from './components/AddRecipe_page'
import ShoppingList from './components/ShoppingList_page'
import Footer from './components/Footer'

 function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='search' element={<Search />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='profile/:id' element={<ProfileOther />} />
        <Route path='myprofile/test' element={<Profile />} />
        <Route path='updateprofile/test' element={<UpdateProfile />} />
        <Route path='myrecipes/test' element={<MyRecipes />} />
        <Route path='recipe/:id' element={<Recipe />} />
        <Route path='addrecipe' element={<AddRecipe />} />
        <Route path='shoppinglist' element={<ShoppingList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
