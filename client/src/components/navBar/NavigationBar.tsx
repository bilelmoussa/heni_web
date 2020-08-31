import React, { PureComponent } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles, createMuiTheme, Theme, createStyles, WithStyles  } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import NavMenu from './NavMenu';
import NavMobileMenu from './NavMobileMenu';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

import { connect } from "react-redux";
import { AppState } from '../../store';
import { switchDark, thunkLogout, fetchNewMsgsCount } from '../../thunks';

import ThemeSwitcher from '../ThemeSwitcher';

const drawerWidth = 240;
const closedDrawerWidth = 53;
const closedDrawerWidthSm = 73;

const theme = createMuiTheme({
});

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#2196f3',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    IconButton:{
        margin: 'auto 0'
    },
    dividerVer:{
        height: 50,
        margin: '0 0.5rem'
    },
    profileBtn:{
        color: "#fff",
        padding: theme.spacing(0, 1), 
        textTransform: "capitalize"
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: closedDrawerWidth,
        [theme.breakpoints.up('sm')]: {
          width: closedDrawerWidthSm,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
})

interface Props extends WithStyles<typeof styles> {
    system: any
    switchDark: any
    theme: any
    thunkLogout: any
    fetchNewMsgsCount: any
    inbox: any
}

interface State {
    open: boolean
    mobileOpen: boolean
    mobileMoreAnchorEl: any
    anchorEl: any
}

class NavigationBar extends PureComponent<Props, State> {
    state: State = {
        open: false,
        mobileOpen: false,
        mobileMoreAnchorEl: null,
        anchorEl: null,   
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    }

    handleProfileMenuOpen = (event: any) => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMobileMenuOpen = (event: any) => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };
    
    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleDrawerClose = () => {
        this.setState({open: false})
    }

    handleLogout = () => {
        this.props.thunkLogout();
    }

    componentDidMount(){
        this.props.fetchNewMsgsCount();
    }
    
    render() {
        const { classes } = this.props;;
        const { newMessages } = this.props.inbox;
        const { fullName } = this.props.system;
        const { lastName = 'user', firstName = 'name' } = fullName;
        const{ open, anchorEl, mobileMoreAnchorEl } = this.state;
        const isMenuOpen = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                            })}
                        >
                            <MenuIcon htmlColor={'#fff'}/>
                        </IconButton>

                        <div className={classes.grow} />
                        
                        <ThemeSwitcher />
                    
                        <div className={classes.sectionDesktop}>
                            <Tooltip title='Messages'>
                                <IconButton classes={{root: classes.IconButton}} key={'Inbox'} component={Link} to='/dashboard/inbox' >
                                    <Badge badgeContent={newMessages} color="secondary">
                                        <MailIcon htmlColor={'#fff'}/>
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Divider orientation="vertical" className={classes.dividerVer} />

                            <Tooltip title='Account settings'>
                                <Button
                                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                >
                                    <AccountCircle htmlColor={'#fff'}/>
                                    <p className={classes.profileBtn}>{firstName} {lastName}</p>
                                    <ArrowDropDownIcon htmlColor={'#fff'}/>
                                </Button>
                            </Tooltip>
                        </div>

                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} >
                                <MoreIcon htmlColor={'#fff'}/>
                            </IconButton>
                        </div>       
                    </Toolbar>
                </AppBar>

                <NavMenu  anchorEl={anchorEl} isMenuOpen={isMenuOpen} handleMenuClose={this.handleMenuClose} handleLogout={this.handleLogout} />

                <NavMobileMenu mobileMoreAnchorEl={mobileMoreAnchorEl} handleMenuClose={this.handleMenuClose} handleMobileMenuClose={this.handleMobileMenuClose} handleProfileMenuOpen={this.handleProfileMenuOpen} count={newMessages} fullName={fullName} />  

                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    })}
                    classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                    }}
                    open={open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button key={'Inbox'} component={Link} to='/dashboard/inbox'>
                            <ListItemIcon>
                                <InboxIcon /> 
                            </ListItemIcon>
                                <ListItemText primary={'Inbox'} />
                        </ListItem>
                        <ListItem button key={'AddProject'} component={Link} to='/dashboard/add-project'>
                            <ListItemIcon>
                                <AddIcon /> 
                            </ListItemIcon>
                                <ListItemText primary={'Add Project'} />
                        </ListItem>
                    </List>
                    <Divider />
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => ({
    system: state.system,
    theme: state.theme,
    inbox: state.inbox,
});
  
export default connect(mapStateToProps, { switchDark, thunkLogout, fetchNewMsgsCount })(withStyles(styles)(NavigationBar));
