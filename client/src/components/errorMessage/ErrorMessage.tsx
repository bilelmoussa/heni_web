import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    errorsMsg: string;
}

const UseStyles = makeStyles(theme =>({
    ErrorFormControll: {
        display: 'flex', 
        flexDirection: 'column',
        margin: '1rem auto',
        width: '70%;',
        minWidth: 250,
        maxWidth: 600,
    },
    ErrorText:{
        color: '#fff',
        fontSize: 16,
        backgroundColor: '#f00',
        borderRadius: 3,
        padding: '0.5rem 1rem',
    }
})) 

const ErrorMessage: React.SFC<Props> = (props) => {
    const classes = UseStyles();
    const{ errorsMsg } = props;

    if(errorsMsg && errorsMsg.trim().length > 0){  
        return (
            <div className={classes.ErrorFormControll}>
               <output className={classes.ErrorText}>{errorsMsg}</output>
            </div>
        )
    }else{
        return null;
    }
};
  
export default ErrorMessage;
  
