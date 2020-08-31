import React, { Component } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import ContactForm from './ContactForm';
import ThemeSwitcher from '../ThemeSwitcher';
import Paper from '@material-ui/core/Paper';

const styles = (theme: Theme) => createStyles({
    ContactSection:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minWidth: 300,
    },
    ContactContainer:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '1rem',
        justifyContent: 'center',
        width: '80%',
        minWidth: 300,
        maxWidth: 600,
        margin: 'auto'
    },
    leftPaper: {
        backgroundColor: '#2196f3',
        margin: '5px 5px 20px auto',
        opacity: '0.8',
    }
});

interface Props extends WithStyles<typeof styles> {

}

class ContactPage extends Component<Props> {
    render() {
        const{ classes } = this.props;

        return (
            <section className={classes.ContactSection}>
                <Paper classes={{root: classes.leftPaper}} elevation={3}>
                    <ThemeSwitcher />
                </Paper>
                <div className={classes.ContactContainer}>
                    <ContactForm />
                </div>
            </section>
        )
    }
}

export default  withStyles(styles)(ContactPage);