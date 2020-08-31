import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyless = makeStyles(() =>({
    loadingScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2
    }
}))

const LoadingCircular = () => {
    const classes = useStyless();

    return (
        <div className={classes.loadingScreen}>
            <CircularProgress />
        </div>
    )
}

export default LoadingCircular;