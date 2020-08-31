import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { AppState } from '../../store';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Input from "@material-ui/core/Input";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { addMessage } from '../../sockets/socket';
import { checkEmail } from '../../utils/IsEMail';
import ErrorMessage from '../errorMessage/ErrorMessage';
import SuccessMessage from '../successMessage/SuccessMessage';
import LoadingCircular from '../loading/LoadingCircular';
import { addMsgError, addMsgSuccess } from '../../thunks';

const styles = (theme: Theme) => createStyles({
    ContactContent:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
        margin: '1rem 0',
        position: 'relative'
    },
    ContactContentHeader:{
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    ContactHeader: {
        margin: '1rem 0',
        fontWeight: 'bold'
    },
    form:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%', 
        height: '100%'
    },
    ContactformControll:{
        display: 'flex',
        margin: '20px auto',
        flexDirection: 'column',
        width: '70%;',
        minWidth: 250,
        maxWidth: 600,
    },
    label:{
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input:{
        paddingLeft: 5,
    },
    legnthP:{
        textAlign: 'right',
        margin: '10px 0'
    },
    button: {
        boxShadow: 'none',
        margin: "0 auto",
        backgroundColor: '#419aff',
        borderColor: '#419aff',
        color: '#fff',
        textTransform: 'capitalize',
        letterSpacing: 1,
        padding: '6px 1.5rem',
        borderBottom: '3px solid #357ac5',
        width: '100%',
        minWidth: 250,
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
    loadingOverlap: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.text.disabled,
        zIndex: 1,
        opacity: 0.2
    }
})

const loadingBtn = (isLoading: boolean, classes: any) => {
    if(isLoading) {
        return (
            <div>
                <div className={classes.loadingOverlap} />
                <LoadingCircular />
            </div>
        )
    } else {
        return null
    }
}

interface Props extends WithStyles<typeof styles> {
    messageError: any
    messageSuccess: any
    addMsgError : (message: string) => any
    addMsgSuccess: (message: string) => any
}

interface State {
    name: string,
    email: string,
    message: string,
    errorsMsg: string,
    successMsg: string,
    loading: boolean
}

class ContactForm extends PureComponent<Props> {
    state: State = {
        name: '',
        email: '',
        message: '',
        errorsMsg: '',
        successMsg: '',
        loading: false,
    }

    componentDidUpdate(prevProp: any) {
        if(prevProp !== this.props) {
           const{ messageError, messageSuccess } = this.props;

            if(messageError.message && messageError.message.trim().length > 0) {
               this.setState({errorsMsg: messageError.message, loading: false});
            }

            if(messageSuccess.message && messageSuccess.message.trim().length > 0) {
                this.setState({successMsg: messageSuccess.message, loading: false, name: '', email: '', message: ''});
            }
        }
    }   

    ResetMessageResponse = () => {
        this.setState({errorsMsg: '', successMsg: ''});
        this.props.addMsgError('');
        this.props.addMsgSuccess('');
    }

    handleChange = (prop: string) => (event: any) => {
        this.ResetMessageResponse();

        this.setState({[prop]: event.target.value });
    }

    handeleSubmit = (e: any) => {
        e.preventDefault();

        this.ResetMessageResponse();

        const { name, email, message } = this.state;
        
        let valid = true;

        if(!checkEmail(email)) {
            valid = false;
            this.setState({errorsMsg: 'Email is not valid !'});
        }

        if(name.trim().length < 1){
            valid = false;
            this.setState({errorsMsg: 'At least 1 character in Name Field !'})
        }

        if(message.trim().length < 30){
            valid = false;
            this.setState({errorsMsg: 'At least 30 character in Message Field !'});
        }


        if(valid) {
            
            const data = {
                name: name,
                email: email,
                message: message,
                createdOn: Date.now()
            }

            addMessage(data);

            this.setState({ loading: true });
        }

    }

    render() {
        const { classes } = this.props;
        const { errorsMsg, successMsg, loading } = this.state;

        return (
            <Paper classes={{root: classes.ContactContent}} elevation={3}>
                
                { loadingBtn(loading, classes) }

                <div className={classes.ContactContentHeader}>
                    <Typography color='primary' variant='h4' classes={{root: classes.ContactHeader}}>Contact Form</Typography> 
                </div>

                <ErrorMessage errorsMsg={errorsMsg}/>

                <SuccessMessage message={successMsg}/>

                <form className={classes.form} onSubmit={this.handeleSubmit}>
                    <div className={classes.ContactformControll}>
                        <label className={classes.label}>Name :</label>
                        <Input
                            disabled={loading}
                            required
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            className={classes.input}
                        />
                    </div>

                    <div className={classes.ContactformControll}>
                        <label className={classes.label}>Email :</label>
                        <Input
                            disabled={loading}
                            type="email"
                            required
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            className={classes.input}
                        />
                    </div>

                    <div className={classes.ContactformControll}>
                        <label className={classes.label}>Message/Questions :</label>
                        <Input
                            disabled={loading}
                            multiline
                            rows={4}
                            required
                            value={this.state.message}
                            onChange={this.handleChange('message')}
                            className={classes.input}
                        />
                        <p className={classes.legnthP}>{this.state.message.trim().length}/30</p>
                    </div>

                    <div className={classes.ContactformControll}>
                        <Button 
                            disabled={loading}
                            variant='contained'
                            color='primary'
                            type='submit'
                            className={classes.button}
                        >
                            Send
                        </Button>
                    </div>

                </form>
            </Paper>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    messageSuccess: state.messageSuccess,
    messageError: state.messageError,
});

export default connect(mapStateToProps, { addMsgError, addMsgSuccess })(withStyles(styles)(ContactForm));