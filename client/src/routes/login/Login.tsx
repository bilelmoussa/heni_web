import React, { Component } from 'react';
import PreventLogin from '../../components/PreventLogin';
import LoginPage from '../../components/loading/LoginPage';

interface Props {
    location: any
}

class Login extends Component<Props> {
    render(){
        const { location } = this.props;
    
        return (
            <PreventLogin redirectTo='/dashboard' location={location} Component={LoginPage}/>
        )
    }
}

export default Login;