import React, { Component } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import NavigationBar from '../navBar/NavigationBar';
import { Router, Route, Switch as SwitchRouter } from "react-router-dom";
import { history } from "../../utils/history";

import Inbox from '../../routes/inbox/Inbox';
import AddProject from '../../routes/addProject/AddProject';

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        margin:  `${theme.spacing(2)}px 0`,
        overflow: "auto"
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
});

interface Props extends WithStyles<typeof styles> {

}

class DashboardPage extends Component<Props> {

    render() {
        const{ classes } = this.props;

        return (
            <div className={classes.root}>
                <NavigationBar />
                <main className={classes.content}>
                <div className={classes.toolbar} />
                    <Router history={history}>
                        <SwitchRouter>
                            <Route exact path = '/' />
                            <Route path='/dashboard/inbox' component={Inbox} />
                            <Route path='/dashboard/add-project' component={AddProject} />
                        </SwitchRouter>
                    </Router>
                </main>
            </div>
        )
    }
}


export default withStyles(styles)(DashboardPage);
