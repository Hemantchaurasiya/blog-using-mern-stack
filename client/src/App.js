import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostDetailView from "./pages/PostDetailView";
import { useSelector,useDispatch } from 'react-redux';
import { setAuth } from './store/authSlice';

function App() {
  const dispatch = useDispatch();
  const updateUserState = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(setAuth({ user: user }));
    }else{
      dispatch(setAuth({ user: null }));
      return (<Home />);
    }
  }
  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    updateUserState();
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Box style={{ marginTop: 85 }}>
        <Switch>
          <Route exact path='/'> <Home /> </Route>
          <Route exact path='/login'> <Login /> </Route>
          <Route exact path='/register'> <Register /> </Route>
          <Route exact path='/about'> <About /> </Route>
          <Route exact path='/contact'> <Contact /> </Route>
          <Route exact path='/create/:category?'> {user?<CreatePost />:<Login/>} </Route>
          <Route exact path='/details/:id'> <PostDetailView /> </Route>
          <Route exact path='/update/:id'> <UpdatePost /> </Route>
        </Switch>
      </Box>
    </BrowserRouter>
  );
}

export default App;
