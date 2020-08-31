import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { SystemState } from '../store/system/types';
import { connect } from "react-redux";
import { AppState } from '../store';
import LoadingCircular from './loading/LoadingCircular';

interface Props {
    system: SystemState
    Component: any
    location: any
    redirectTo: string
}

interface ProtectedProps {
    loggedIn: boolean, 
    verified: boolean,
    Component: any,
    location: any
    redirectTo: string
}

const SafeRoute = (props: ProtectedProps) => {
    const { verified, loggedIn, Component, location, redirectTo } = props;
    
    if(!verified) {
        return <LoadingCircular />;
    } else if(!loggedIn && verified) {
        return <Component />;
    } else {
        return <Redirect to={{pathname: redirectTo, state: { from: location }}}/>;
    }
}

class PreventLogin extends Component<Props> {
    render() {
        const { system, Component, location, redirectTo } = this.props;
        const { loggedIn , verified } = system;

        return (
           <SafeRoute verified={verified} loggedIn={loggedIn} Component={Component} location={location} redirectTo={redirectTo}/>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
});

export default connect(mapStateToProps)(PreventLogin)
