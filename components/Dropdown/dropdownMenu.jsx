import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { ListItemIcon, ListItemText } from '@material-ui/core';
import AvatarImg from '../Images/AvatarImg';
import {toggleDropdown} from '../../lib/global';
import { useDispatch } from 'react-redux';


/**
 * @description component to add dropdown feature in the pages
 * @author Abhishek
 * @date 19/04/2021
 * @export 
 * @param menuItems array of objects {icon: image path, iconWidth - String, iconHeight - String, label - String, onClick - function}
 * @param button title of page
 * @param classes classeNames
 * @return {*} 
 */
export default function ProfileDropdownMenu(props) {
    const [open, setOpen] = React.useState(false);
    const { button, classes = {}, menuItems } = props;
    // const open = toggleDropdown()
    console.log(open, "toggle open");
    const dispatch = useDispatch()

    const handleClick = () => {
        setOpen((prev) => !prev);
        // dispatch({type: "TOGGLE_DROPDOWN", payload: true})
    };

    const handleClickAway = () => {
        setOpen(false);
        // dispatch({type: "TOGGLE_DROPDOWN", payload: false})
    };

    useEffect(() => {
        
    }, [open])

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className='dropdown'>
                <a onClick={handleClick}>
                    {button} <i className="fa fa-caret-down nav__item" aria-hidden="true"></i>
                </a>
                {open ? (
                    <>
                        <i className="fa fa-caret-up menu__icon" aria-hidden="true"></i>
                        <div className='dropdownMenu'>
                            {
                                menuItems &&
                                menuItems.length &&
                                menuItems.map((item, index) => {
                                    if (item.type == "itemComp") {
                                        return <button
                                            className="dropdown__item d-flex align-items-center"
                                            type="button"
                                            key={index}
                                            onClick={() => item.onClick(item.label)}
                                        >
                                            {item.icon ? <ListItemIcon classes={{ root: classes.iconRoot }}>
                                                {item.icon ? <div
                                                    className='item__icon'
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
                                    }
                                    else {
                                        return <div
                                            key={index}>
                                            {item.jsxComp}
                                        </div>
                                    }
                                }
                                )
                            }
                        </div>
                    </>
                ) : <></>}
            </div>
        </ClickAwayListener>
    );
}
