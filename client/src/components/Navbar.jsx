import { AppBar, Toolbar,makeStyles, Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setAuth } from '../store/authSlice';

const useStyle = makeStyles({
    component: {
        background: '#FFFFFF',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        '&  >*': {
            padding: 20,
            color: 'black',
            textDecoration: 'none'
        }
    }
});

function Navbar() {
    const classes = useStyle();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const Logout = async (e) => {
        e.preventDefault();
        try {
          localStorage.removeItem("user");
          dispatch(setAuth({ user: null }));
        } catch (error) {
          console.log(error);
        }
    }

    const button = user ? 
        <Button onClick={Logout} style={{
            background: 'unset',
            border: 'none',
            fontSize: 17,
            textTransform: 'uppercase',
            fontFamily: 'Roboto',
            cursor: 'pointer',
            opacity: 0.8
        }}>Logout</Button> :
        <Link to="/login" style={{ textDecoration: 'none'}}><Button>Login</Button></Link>

    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link>{button}</Link>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;