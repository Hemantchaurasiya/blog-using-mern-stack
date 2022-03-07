import { Avatar, Button, CssBaseline, TextField, Grid, CircularProgress, Typography, Container } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { register } from '../http/api';

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


const Register = () => {
    const classes = useStyles();
    const history = useHistory();
    const [message, setmessage] = useState('');
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [confirm_password, setconfirm_password] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        setmessage("-");
        if (password === confirm_password) {
            try {
                const user = {
                    username: username,
                    email: email,
                    password: password,
                    confirm_password: confirm_password,
                }
                const res = register(user);
                setmessage(res.data);
                history.push('/');
            } catch (error) {
                setmessage("something went wrong!");
            }
        } else {
            setmessage("password not match!");
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
                    Sign Up
                </Typography>
                <form onSubmit={handleClick} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        autoComplete="text"
                        autoFocus
                        value={username}
                        onChange={e => setusername(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        value={confirm_password}
                        onChange={e => setconfirm_password(e.target.value)}
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
                                Sign Up
                            </Button>
                    }
                    <Grid container>
                        <Grid item xs>
                            <Link to="/login">
                                Go to login
                            </Link>
                            <p>{message}</p>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Register;