import React from 'react'
// import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

//COMPONENTS:
import Welcome from './components/Welcome_page'
import Search from './components/Search_page'
import Auth from './components/Auth_page'
import ProfileOther from './components/Profile_other_page'
import Profile from './components/Profile_page'
import UpdateProfile from './components/UpdateProfile_page'
import MyRecipes from './components/MyRecipes_page'
import Recipe from './components/Recipe_page'
import AddRecipe from './components/AddRecipe_page'
import ShoppingList from './components/ShoppingList_page'
import Footer from './components/Footer'

 function App() {
//     const getData = async () => {
//       const { data } = await axios.get('/api/profile/620591de033eedd8d146e333') // * <-- replace with your endpoint
//       console.log(data)
//     }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='search' element={<Search />} />
        <Route path='auth' element={<Auth />} />
        <Route path='profile/test' element={<ProfileOther />} />
        <Route path='myprofile/test' element={<Profile />} />
        <Route path='updateprofile/test' element={<UpdateProfile />} />
        <Route path='myrecipes/test' element={<MyRecipes />} />
        <Route path='recipe/test' element={<Recipe />} />
        <Route path='addrecipe' element={<AddRecipe />} />
        <Route path='shoppinglist' element={<ShoppingList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
