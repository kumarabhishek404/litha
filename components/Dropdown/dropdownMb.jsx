import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ListItemIcon, ListItemText } from '@material-ui/core';


export default function ProfileDropdownMenu(props) {
    const [open, setOpen] = React.useState(false);
    const { button, classes = {}, menuItems } = props;

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className='dropdown_mobile'>
                <a onClick={handleClick}>
                    {button} <i className="fa fa-caret-down nav__item" aria-hidden="true"></i>
                </a>
                {open ? (
                    <div className='dropdownMenu_mobile'>
                        {
                            menuItems &&
                            menuItems.length &&
                            menuItems.map((item, index) => (
                                <button
                                    className="dropdown__item_mobile d-flex align-items-center"
                                    type="button"
                                    key={index}
                                    onClick={() => item.onClick(item.label)}
                                >
                                    {item.icon ? <ListItemIcon classes={{ root: classes.iconRoot }}>
                                        {item.icon ? <div
                                            className='item__icon_mobile'
                                            style={{
                                                maxWidth: `${item.iconWidth}`,
                                                maxHeight: `${item.iconHeight}`,
                                            }}
                                        >{item.icon}</div> : <></>}
                                    </ListItemIcon> : <></>}
                                    <ListItemText
                                        primary={item.label}
                                        style={{ textAlign: 'left' }}
                                    />
                                </button>
                            ))
                        }
                    </div>
                ) : <></>}
            </div>
        </ClickAwayListener>
    );
}
