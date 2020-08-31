import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    message: string;
}

const UseStyles = makeStyles(theme =>({
    MessageFormControll:{
        display: 'flex', 
        flexDirection: 'column',
        margin: '1rem auto',
        width: '70%;',
        minWidth: 250,
        maxWidth: 600, 
    },
    SuccessText:{
        color: '#fff',
        fontSize: 16,
        backgroundColor: '#34d265',
        borderRadius: 3,
        padding: '0.5rem 1rem',
    }
}))

const SuccessMessage: React.SFC<Props> = (props) => {
    const classes = UseStyles();
    const{ message } = props;
    
    if(message || message.trim().length > 0){
        return (
            <div className={classes.MessageFormControll}>
                <output className={classes.SuccessText}>{message}</output>
            </div>
        )
    }else{
        return null;
    }
}

export default SuccessMessage