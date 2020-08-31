import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LoginForm from './LoginForm';
import ThemeSwitcher from '../ThemeSwitcher'


const useStyles  =  makeStyles((theme: Theme) => createStyles({
    login: {
        position: 'relative',
        top: 0,
        left: 0,
        display: 'flex',
        height: '100%',
        width: '100%',
        minWidth: 300,
        overflow: 'hidden',
        margin: 'auto 0',
        padding: theme.spacing(3, 0),
        flexDirection: 'column'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        padding: theme.spacing(3, 2),
        width: '35%',
        minWidth: 300,
        maxWidth: 800,
        margin: 'auto',
        overflow: 'hidden',
    },
    Avatar:{
        width: '25%',
        minWidth: 130,
        height: 'auto',
        margin: '10px auto'
    },
    AccountCircle:{
        width: '100%',
        height: '100%',
    },
    leftPaper: {
        backgroundColor: '#2196f3',
        margin: '5px 5px 20px auto',
        opacity: '0.8',
    }
}));

interface Props {
    
}

const LoginPage: React.SFC<Props> = () =>  {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.login}>
                <Paper classes={{root: classes.leftPaper}} elevation={3}>
                    <ThemeSwitcher />
                </Paper>
                <Paper classes={{root: classes.paper}} elevation={3}>
                    <div className={classes.Avatar}>
                        <AccountCircle className={classes.AccountCircle}/>
                    </div>
                    <LoginForm /> 
                </Paper>   
            </div>
        </div>
    );
}

export default LoginPage;
