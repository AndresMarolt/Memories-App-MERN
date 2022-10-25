import React, {useState, useEffect} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import { AppBar, Typography, Button, Toolbar, Avatar } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

import memoriesLogo from '../../images/memories-Logo.png'
import memoriesText from '../../images/memories-Text.png'

import useStyles from './styles'

function NavBar() {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        history.push('/');
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
 
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
            <img src={memoriesText} alt="icon" height="45px" />
            <img className={classes.image} src={memoriesLogo} alt="memories" height="40px" />
        </Link>

        <Toolbar className={classes.ToolBar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user?.result.given_name} src={user.result.picture}>
                        {
                            user.result.given_name ? user.result.given_name.charAt(0) : user.result.name.charAt(0)
                        }
                    </Avatar>
                    <Typography className={classes.userName} variant="h6">
                        {
                            user.result.given_name ? user.result.given_name : user.result.name
                        }

                        {
                            user.result.family_name && " " + user.result.family_name
                        }
                    </Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color='primary'>Sign In</Button>
            )}
        </Toolbar>

    </AppBar>
  )
}

export default NavBar;