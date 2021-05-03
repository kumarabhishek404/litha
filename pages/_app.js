import "bootstrap/dist/css/bootstrap.min.css";
import "../public/css/index.css"
import '../public/scss/index.scss'
import { Provider, useDispatch, useSelector } from "react-redux";
import LangContext from "../context/language";
import NetworkDetector from "../hoc/NetworkDetector";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import withRedux from "next-redux-wrapper";
import createStore from "../redux/store";
import ThemeContext from "../context/ThemeContext";
import { useEffect } from "react";
import { setMobileView } from "../redux/actions/home.action";
import { setCookie, getCookie } from '../lib/session';
import { guestUserApi, getProfileData } from '../services/auth.service';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SnackBar from "../components/snackbar/snackbar";


// import {setLocalStorage} from '../lib/session';

const DialogHoc = dynamic(() => import("../hoc/dialogHoc"), { ssr: false });
const DrawerHoc = dynamic(() => import("../hoc/drawerHoc"), { ssr: false });

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1bb1e6",
    },
  },
});

function MyApp(props) {


  const { Component, pageProps, store } = props;
  const state = store.getState()
  const theme = state?.store?.theme || 'light';

  // const userId = getCookie('userId')
  // const userType = getCookie('userType')
  // const token = getCookie('token')

  // const dataPath = `userId=${userId}&userTypeCode=${userType}`

  // useEffect(() => {
  //   console.log(token, dataPath, "token");
  //   getProfileData(dataPath, token)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       const data = res.data.data
  //       setCookie('firstName', data.firstName)
  //       setCookie('lastName',data.lastName)
  //       setCookie('email', data.email)
  //       setCookie('userType', data.userType)
  //       setCookie('number', data.number)

  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     })
  // }, [])
  // useEffect(()=>{
  //   dispatch(setMobileView(detectDevice()))
  //  },[dispatch])
  const data = {
    deviceId: "1234567890987654",
  }

  const options = {
    timeout: 3000,
    position: positions.BOTTOM_LEFT,
    transition: transitions.SCALE
  }

  useEffect(() => {
    guestUserApi(data)
      .then((res) => {
        const guestToken = res.data.token
        // console.log(guestToken);
        setCookie("token", guestToken)
      })
      .catch(err => console.error(err, "error"))
  })

  console.log('render first times');

  return (
    <>
      <Provider store={store}>
        <LangContext.Provider
          value={{
            langCode: (store.getState() && store.getState().language) || "en",
            lang: store.getState().locale || {},
          }}
        >
          <MuiThemeProvider theme={MuiTheme}>
            <ThemeContext.Provider value={theme}>
              <AlertProvider template={AlertTemplate} {...options}>
                <App />
                <Component {...pageProps} />
              </AlertProvider>

              <DialogHoc></DialogHoc>
              <DrawerHoc></DrawerHoc>
              <SnackBar></SnackBar>

            </ThemeContext.Provider>
          </MuiThemeProvider>
        </LangContext.Provider>
      </Provider>
    </>
  );
}

const App = () => {

  const dispatch = useDispatch();
  const auth = getCookie('isAuthenticate')
  const isAuth = (auth == 'true');
  const userName = getCookie('username')


  // const firstName = getCookie('firstName')
  // const lastName = getCookie('lastName')
  // const userName = `@${firstName.toLowerCase()}`
  // const auth = getCookie('isAuthenticate')

  dispatch({ type: "AUTH", payload: isAuth })
  dispatch({ type: "USERNAME", payload: userName })
  // dispatch({ type: "FIRSTNAME", payload: firstName })
  // dispatch({ type: "LASTNAME", payload: lastName })

  return <>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' />
  </>
}



MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component && Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  let isMobile = false;
  console.log('Mobile', Mobile)
  // isMobile = await detectDevice(ctx);
  // ctx.store.dispatch(setMobileView(isMobile));

  // ctx.store.dispatch(setLanguage(lan));

  return { pageProps, isMobile };
};

export default withRedux(createStore)(
  NetworkDetector(MyApp)
);