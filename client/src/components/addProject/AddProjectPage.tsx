import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddProjectForm from './AddProjectForm'
import LoadingCircular from '../loading/LoadingCircular';

const styles = (theme: Theme) => createStyles({
    container:{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    paper:{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        padding: theme.spacing(3, 2),
        width: '50%',
        minWidth: 300,
        maxWidth: 800,
        margin: '1rem auto',
        overflow: 'hidden',
        position: 'relative'
    },
    title: {
        textTransform: 'uppercase',
        margin: 'auto'
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

});

interface Props extends WithStyles<typeof styles> {

}

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

class AddProjectPage extends Component<Props> {
    state = {
        loading: false
    }

    handleLoading = (loading: boolean) => {
        this.setState({loading: loading})
    }

    render() {
        const { classes } = this.props;
        const { loading } = this.state;

        return (
            <div className={classes.container}>
                <Paper classes={{root: classes.paper}}>
                    { loadingBtn(loading, classes) }
                    <Typography className={classes.title} variant="h6" color="inherit">
                        add a project 
                    </Typography>
                    <AddProjectForm handleLoading={this.handleLoading} />
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(AddProjectPage);
