import moment from 'moment';
import Route from 'next/router'
import { useSelector } from 'react-redux';
import { DialogOpen, DrawerClose, DrawerOpen, PageLoader, snakbar } from "./rxSubject"

/**
* @description method to close drawer
* @param params ("drawer_name", {drawer_data}, "opening_position")
*/
export const open_drawer = (...params) => {
  return DrawerOpen.next([...params])
}

/**
* @description method to close drawer
* @param params:string - drawer name to close
*/
export const close_drawer = (...params) => {
  DrawerClose.next([...params]);
}


/**
* @description method to start full page loader
*/
export const start_page_loader = () => {
  PageLoader.next(true)
}

/**
* @description method to stop full page loader
*/
export const stop_page_loader = () => {
  PageLoader.next(false)
}


/**
 * @description 
 * @author Abhishek
 * @date 19/04/2021
 * @param date
 * @return {*} 
 */
export const findDayAgo = (date) => {
  return moment(date).fromNow();
};

/**
* @description method to open drawer with custom data
* @param drawerData: Object{}
*/
export const drawerToast = (drawerData = {}) => {
  setTimeout(() => {
    open_drawer("drawerToaster", drawerData, "bottom")
  }, 30);
};


/**
* @description this method is used to detect device type
* @return true/false
*/
export const detectDevice = () => {
  let isMobileViewServer = navigator.userAgent.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i);
  return Boolean(isMobileViewServer);
};


// Admin function 

/**
* @description method to open dialog
* @param params ("dialog_name", {dialog_data}, "opening_position")
*/
export const open_dialog = (...params) => {
  return DialogOpen.next([...params])
}

/**
* @description method to show toastr
* @author jagannath
* @date 08/04/2021
* @param message toastr message
* @param variant: 'variantSuccess' | 'variantError' | 'variantInfo' | 'variantWarning';
* @param duration?: toastr duration - default: 2000 ms
* @param vertical?: 'top' | 'bottom';
* @param horizontal?: 'left' | 'center' | 'right';
*/
export const showToast = (message, variant, duration) => {
  return SnackbarSubject.next({ message, variant, duration })
}


/**
* @description method to logout the user
* @author Abhishek
* @date 19/04/2021
* @data 
*/
export const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('refreshToken')
}

/**
 * @description method which authenticate the user
 * @author Abhishek
 * @date 19/04/2021
 * @param auth
 * @return {*} 
 */
export const authenticate = (auth) => {
  return new Promise((res, err) => {
    if (auth) {
      return res();
    } else {
      Route.push("/account/login");
      return err();
    }
  });
}


/**
 * @description method to redirect to pages
 * @author Abhishek
 * @date 19/04/2021
 * @param path: String
 */
export const redirectRoute = (path) => {
  close_drawer()
  return Route.push(path)
}

// export /**
//  * @description method to call a function when hit enter
//  * @author Abhishek
//  * @date 26/04/2021
//  * @param funcName : function
//  */
// const keyEnterPress = (funcName, e) => {
//   if()
//   funcName();
// }


/**
 * @description method to toggle menu dropdown
 * @author Abhishek
 * @date 27/04/2021
 */
export const toggleDropdown = () => {
  const open = useSelector(state => state?.store?.isDropdownOpen)
  console.log(open, "opemn");
  return [open]
}


export const triggerNotification = () => {
  
}


// To open snackbar toast notification

export const Toast = (message, type="success", duration=2000)=>{
  snakbar.next({
    message,
    type,
    duration,
  });
};