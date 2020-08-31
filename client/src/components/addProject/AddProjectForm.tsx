import React, { Component } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { AppState } from '../../store';
import { addProject, resetAddProjectRes } from '../../thunks'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Upload from '../upload/Upload';

const styles = (theme: Theme) => createStyles({
    form: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        overflow: 'hidden',
        margin: '1rem 0',
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
        minWidth: 250,
        margin: '20px auto', 
    },
    dialog: {
        width: 'calc(100% - 16px)',
    },
});

interface Props extends WithStyles<typeof styles> {
    addProject: any,
    handleLoading: (laoding: boolean) => void,
    add_project_response: any,
    resetAddProjectRes: any
}

class AddProjectForm extends Component<Props> {
    state = {
        projectName: '',
        projectDescription: '',
        files: [],
        errors: '',
        successMsg: '',
    }

    componentDidUpdate(prevProp: any) {
        if(prevProp !== this.props) {
           const{ add_project_response } = this.props;

           if(add_project_response){
                const { success_msg, error_msg } = add_project_response;

                if(success_msg && success_msg.trim().length > 0){
                    this.setState({successMsg: success_msg, projectName: '', projectDescription: '', files: []});
                    this.props.handleLoading(false);
                }

                if(error_msg && error_msg.trim().length > 0){
                    this.setState({errors: error_msg});
                    this.props.handleLoading(false);
                }
           }
        }
    }

    handleChange = (name: any) => (event: any) => {
        this.props.resetAddProjectRes();
        //const cleanMsg = this.props.error.message.trim();
        /*
        if(cleanMsg || cleanMsg.length > 1){

            this.props.resetError();
        }
        */
        this.setState({[name]: event.target.value});
    }

    handleFileChange = (files: any[])=>{
        this.props.resetAddProjectRes();

        this.setState({
          files: files
        });
    }

    onFilesAdded = (files: any) => {
        this.props.resetAddProjectRes();

        this.setState((prevState: any) => ({
          files: prevState.files.concat(files)
        }));
    }

    handeleDeleteFile = (target: never) => {
        this.props.resetAddProjectRes();

        const { files } = this.state;

        let index = files.indexOf(target);

        if (index !== -1) {
            files.splice(index, 1);
            this.setState({files: files});
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();

        this.props.resetAddProjectRes();

        const{ files, projectName, projectDescription } = this.state;

        if(files.length < 3 || projectName.trim().length < 1 || projectDescription.trim().length < 1) {
            this.setState({errors: 'Please fill all fields'});
        }else{
            this.props.addProject(files, projectName, projectDescription);
            this.props.handleLoading(true);
        }
    }

    exitDialog = () => {
        this.props.resetAddProjectRes();

        this.setState({ errors : '' });
    };


    render() {
        const { classes } = this.props;
        const { errors, files } = this.state;
        
        const isOpen = errors.trim().length > 0;

        return (
            <div>
            <form className={classes.form} onSubmit={this.handleSubmit}>
                <TextField 
                    required
                    name="projectName"
                    type="text"
                    classes={{root: classes.textField}} 
                    value={this.state.projectName}
                    label="Project Name" 
                    onChange={this.handleChange('projectName')}
                    margin="normal"
                    variant="filled"
                />
                <TextField 
                    required
                    name="projectDescription"
                    type="text"
                    classes={{root: classes.textField}} 
                    value={this.state.projectDescription}
                    label="Project Description" 
                    onChange={this.handleChange('projectDescription')}
                    margin="normal"
                    variant="filled"
                />

                <Upload  onFilesAdded={this.onFilesAdded} handeleDeleteFile={this.handeleDeleteFile}  files={files} />

                <Button 
                        className={classes.button}  variant="contained" 
                        color="primary"
                        type="submit"
                    >
                        ADD
                </Button>
            </form>
            <Dialog
                    open={isOpen}
                    onClose={this.exitDialog}
                    classes={{ paper: classes.dialog }}
                >
                <DialogTitle>
                    Error
                </DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {errors}
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.exitDialog} color="secondary" >
                    Exit
                    </Button>
                </DialogActions>

            </Dialog> 
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    add_project_response: state.add_project_response
});

export default connect(mapStateToProps, { addProject, resetAddProjectRes } )(withStyles(styles)(AddProjectForm));
