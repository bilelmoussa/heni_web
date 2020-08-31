import React from 'react';
import { makeStyles, Typography  } from '@material-ui/core';
import InboxTable from './InboxTable';

const useStyles = makeStyles({
    container:{
        display: "flex",
        flexDirection: "column",
        padding: "1rem"
    },
    header:{
        margin: "1rem auto"
    },
    table:{
        margin: "1rem 0.5rem"
    }
})

const InboxPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.header}><Typography variant="h4">Inbox</Typography></div>
            <div className={classes.table}>
                <InboxTable />
            </div>
        </div>
    )
}

export default InboxPage