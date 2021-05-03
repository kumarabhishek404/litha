import React,{useState} from 'react'
import Alert from '@material-ui/lab/Alert'

const AlertComp = (props) => {
    const {message="This is Message",style={}, variant = "error",isOpen = false} = props;
    return (
        isOpen ? 
        <Alert severity="error" style={{position:'fixed',bottom:'25px',left:'25px',...style}}>{message}</Alert> : null
    )
}

export default AlertComp
