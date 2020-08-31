import React from 'react'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

interface Props {
    anchorEl: any
    isMenuOpen: boolean
    handleMenuClose: () => void
    handleLogout: () => void
}

export default function NavMenu(props: Props) {
    const {anchorEl, isMenuOpen, handleMenuClose, handleLogout} = props;

    return (
        <div>
            <Menu
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={isMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                    style: {
                        minWidth: 200,
                    },
                }}
            >
                <MenuItem onClick={handleMenuClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}
