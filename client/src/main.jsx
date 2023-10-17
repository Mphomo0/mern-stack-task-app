import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import HomeScreen from './pages/HomeScreen.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import RegisterScreen from './pages/RegisterScreen.jsx';
import ProfileScreen from './pages/ProfileScreen'
import PrivateRoute from './components/PrivateRoute'
import TodoScreen from './pages/TodoScreen'
import TodoDetails from './pages/TodoDetails'
import EditTodo from './pages/EditTodo'
import AddTodo from './pages/AddTodo'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/todos/list' element={<TodoScreen />} />
        <Route path='/add' element={<AddTodo />} />
        <Route path='/todos/:id' element={<TodoDetails />} />
        <Route path='/todos/edit/:id' element={<EditTodo />} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
  </Provider>
)
