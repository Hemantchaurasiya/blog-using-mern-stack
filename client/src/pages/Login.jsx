import {Avatar,Button,CssBaseline,TextField,Grid,CircularProgress,Typography,Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from 'react';
import { setAuth } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import {Link,useHistory} from "react-router-dom";
import { login } from '../http/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [message, setmessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = async (e) => {
    setmessage("-");
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    }
    try {
      const { data } = await login(user);
      dispatch(setAuth({ user: data }));
      localStorage.setItem("user", JSON.stringify({ user:data}));
      history.push('/');
    } catch (error) {
      console.log(error);
      setmessage("something went wrong!");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleClick} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
          {
            message === '-' ?
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                <CircularProgress />
              </Button>
              :
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
          }
          <Grid container>
            <Grid item xs>
              <Link to="/reset-password-email" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default Login;