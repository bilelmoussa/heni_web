import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

interface Props {
    mobileMoreAnchorEl: any
    handleMenuClose: () => void
    handleMobileMenuClose: (event: any) => void
    handleProfileMenuOpen: (event: any) => void
    count: number
    fullName: any
}

export default function NavMobileMenu(props: Props) {
    const{ mobileMoreAnchorEl, handleMenuClose, handleMobileMenuClose, handleProfileMenuOpen } = props;

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const {firstName = 'user', lastName = "name"} = props.fullName;

    return (
        <div>
            <Menu
                anchorEl={mobileMoreAnchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={isMobileMenuOpen}
                onClose={handleMenuClose}
                keepMounted
                PaperProps={{
                    style: {
                            minWidth: 200,
                    },
                }}
            >
            <MenuItem onClick={handleMobileMenuClose} key={'Inbox'} component={Link} to='/dashboard/inbox'>
                <IconButton color="inherit">
                    <Badge badgeContent={props.count} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
                <MenuItem onClick={handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p style={{textTransform: 'capitalize'}}>{firstName} {lastName}</p>
                </MenuItem>
            </Menu>                
        </div>
    )
}
