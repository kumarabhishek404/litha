// import LOGO from '../static/icons/tag.png';
export const THEME = 'dark';
// import brokenImage from '../public/images/bg-images/broken-image.jpg';

// head contents
export const APP_NAME = 'Litha';
export const APP_LOGO = "/images/icons/logo.png";
export const LOGO = "/images/icons/logo.png";
export const DESK_LOGO = "/images/icons/logo.png";
export const WEB_LINK = "https://litha-hkctyp9zc-litha.vercel.app";
export const OG_IMAGE = "/images/bg-images/litha-labs.jpeg"
export const OG_LOGO = OG_IMAGE;
export const FB_APP_ID = "1344493016062063";
export const SMALL_LOGO = "/icons/favicon.png";
export const OG_TITLE = 'Litha Labs';
export const OG_DESC = 'Pioneering Conversational AI'
export const DESCRIPTION = 'Pioneering Conversational AI'

// Default configs
export const DEFAULT_LANGUAGE = "en";
export const API_HOST = 'https://api.litha.org.uk';
export const BASIC_AUTH = 'Basic bWVldC5hcHBzY3JpcEBnbWFpbC5jb206M0VtYmVkMDA3'

// drawer/dialog cofigs
export const DRAWER_CLOSE = "";
export const DRAWER_TOASTER_TIME = 3000;

// All Backgroun images
export const HOME_PAGE_BG_IMAGE = "/images/bg-images/litha-labs.jpeg"
export const LITHALABS_BG_IMAGE = "/images/bg-images/about_litha_labs.jpg"
export const LITHAPSYCHOLOGY_BG_IMAGE = "/images/bg-images/brain_psychology.jpg"
export const LITHATECHOLOGY_BG_IMAGE = "/images/bg-images/brain_technology.jpg"
export const ABOUT_CONVERSATIONERS_BG_IMAGE = "/images/bg-images/about_conversationers.jpg"
export const BUNTY_BG_IMAGE = "/images/bg-images/litha_psychology.jpg"
export const GAILS_BAKERY_BG_IMAGE = "/images/bg-images/gails-bakery.jpg"
export const ABOUT_KNOWLEDGE_EXPERT_BG_IMAGE = "/images/bg-images/litha_technology.jpg"
export const ABOUT_ASSESSMENTS_BG_IMAGE = "/images/bg-images/about_assessments.jpg"
export const WORKING_WITH_ASSESSMENTS_BG_IMAGE = "/images/bg-images/working_with_assessments.jpg"
export const ABOUT_ORIENTERS_BG_IMAGE = "/images/bg-images/about_orienters.jpg"
export const ORIENTERS_BG_IMAGE = "/images/bg-images/orienters.jpg"


//admin pages image
// export const BROKEN_IMAGE = brokenImage

// Regular Expressions (Regex)
/**
 * @description method to validate name entered by user
 * @param name String
 * @return boolean
 */
 export const nameValidator = function (name) {
    let pattern = /^[A-Za-z]{3,15}$/;
    let nameTrimmed = name.trim();
    if (pattern.test(nameTrimmed)) return true;
    else return false;
  };
  

  /**
   * @description method to validate password 
   * @param password String 
   * @return boolean
   */
  export const passwordValidator = function (password) {
    let pattern = /^(?=.*[a-z])(?=.*[0-9])[A-Za-z0-9@!#?$]{8,20}$/;
    if (pattern.test(password)) return true;
    else return false;
  };
  
  
  /**
  * @description method to validate email address
  * @param email Text - email to validate
  * @return boolean
  */
  export const emailValidator = (email) => {
    const mail_ID = email.trim();
    let mail_pattern = /^[A-Za-z]{1}[A-Za-z._0-9]{1,}@[A_Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/;
    if (mail_pattern.test(mail_ID)) return true;
    else return false;
  }
  

  /**
   * @description method to validate DOB
   * @param dob TimeStamps 
   * @return boolean 
   */
  export const DobValidator = function (dob) {
    const input_date_milliseconds = Date.parse(dob);
    const current_age = (Date.now() - input_date_milliseconds) / 1000 / 60 / 60 / 24 / 365;
    if (current_age >= 18) return Boolean('true');
    else return Boolean('false');
  };
  
  
  /**
   * @description method to validate mobile number is 10 digits or not
   * @param number Number
   * @return boolean  
   */
  export const basicMobNumValidator = function (number) {
    let num_pattern = /^[0-9]{10}$/;
    if (num_pattern.test(number)) return true;
    else return false;
  };