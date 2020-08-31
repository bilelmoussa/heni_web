import React from 'react';
import { connect } from "react-redux";
import { AppState } from "../../store";
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { thunkLogin, resetError } from '../../thunks';

const styles = (theme: Theme) => createStyles({
    form:{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        overflow: 'hidden',
        marginBottom: 20,
    },
    textField: {
        width: '70%',
        maxWidth: 700,
        minWidth: 250,
        margin: '20px auto',
        '& label.Mui-focused': {
            color: '#419aff',
        },
        '& .MuiFilledInput-underline:after':{
            borderBottomColor: '#419aff',
        },
    },
    button:{
        width: '70%',
        maxWidth: 700,
        minWidth: 250,
        boxShadow: 'none',
        margin: `${theme.spacing(1)}px auto`,
        backgroundColor: '#419aff',
        borderColor: '#419aff',
        color: '#fff',
        textTransform: 'capitalize',
        letterSpacing: 1,
        padding: '6px 1.5rem',
        borderBottom: '3px solid #357ac5',
        '&:hover':{
            backgroundColor: '#357ac5',
            borderColor: '#357ac5'
        },
        '&active':{
            boxShadow: 'none',
            backgroundColor: '#357ac5',
            borderColor: '#357ac5'
        }
    },
    ErrContainer: {
        width: '70%',
        maxWidth: '700',
        minWidth: '250',
        margin: '20px auto',
        backgroundColor: '#f00',
        padding: '10px 0',
        borderRadius: 5,
        textAlign: 'center'
    },
    ErrMessage:{
        color: '#fff',
        textTransform: 'uppercase',
        fontSize: 14,
        letterSpacing: 1,
        margin: '5px 0'
    }
});

const RenderErrorMsg = (message: string, classes: any) =>{
    const cleanMsg = String(message).trim();
    if(!cleanMsg || cleanMsg.length < 1){
        return null;
    }else{
        return(
            <div className={classes.ErrContainer}>
                <p className={classes.ErrMessage}>{cleanMsg}</p>
            </div>
        )
    }
}

interface Props extends WithStyles<typeof styles> {
    resetError: any;
    thunkLogin: any;
    error: any;
}

class LoginForm extends React.Component<Props> {
    state = {
        email: '',
        password: ''
    }

    handleSubmit = (e: any) => {
        e.preventDefault();

        this.props.thunkLogin(this.state.email, this.state.password);
    }

    handleChange = (name: any) => (event: any) => {
        const cleanMsg = this.props.error.message.trim();
        if(cleanMsg || cleanMsg.length > 1){
            this.props.resetError();
        }
        this.setState({[name]: event.target.value });
    }

    render() {
        const{ classes } = this.props;

        return (
            <form className={classes.form} onSubmit={this.handleSubmit}>
                {RenderErrorMsg(this.props.error.message, classes)}
                <TextField 
                    required
                    name="email"
                    type="text"
                    autoComplete="email"
                    classes={{root: classes.textField}} 
                    value={this.state.email}
                    label="Email" 
                    onChange={this.handleChange('email')}
                    margin="normal"
                    variant="filled"
                />
                <TextField 
                    required
                    classes={{root: classes.textField}} 
                    value={this.state.password} 
                    type="password"
                    label="Password" 
                    onChange={this.handleChange('password')}
                    margin="normal"
                    variant="filled"
                    name="password"
                    autoComplete="current-password"
                />
                <Button 
                    className={classes.button}  variant="contained" 
                    color="primary"
                    type="submit"
                >
                    login
                </Button> 
            </form>
        );
    } 
}

const mapStateToProps = (state: AppState) => ({
    error: state.error,
});

export default connect(mapStateToProps, { thunkLogin, resetError } )(withStyles(styles)(LoginForm));