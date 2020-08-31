import React, { Component } from 'react'
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import { connect } from "react-redux";
import { AppState } from '../store';
import { switchDark } from '../thunks';

const styles = (theme: Theme) => createStyles({
    IconButton:{
        margin: 'auto 0'
    },
});

interface Props extends WithStyles<typeof styles> {
    switchDark: any
    theme: any
}

const switchThmeIcon = (darkState: boolean) => {
    if(darkState) {
        return <Brightness7Icon htmlColor={'#fff'}/>
    } else {
        return <Brightness4Icon htmlColor={'#fff'}/>
    }
}

class ThemeSwitcher extends Component<Props> {

    handleSwitchTheme = () => {
        this.props.switchDark(!this.props.theme.darkState);
    }

    render() {
        const { classes }= this.props;
        const darkState = this.props.theme.darkState;
        
        return (
            <Tooltip  title="Toggle light/dark theme">
                <IconButton  
                    classes={{root: classes.IconButton}}
                    onClick={this.handleSwitchTheme} 
                >
                    {switchThmeIcon(darkState)}
                </IconButton>
            </Tooltip>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    theme: state.theme,
});

export default connect(mapStateToProps, { switchDark })(withStyles(styles) (ThemeSwitcher))
