import { useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
import { authenticate, redirectRoute, handleLogout, close_drawer } from '../../lib/global';
import ProfileIntro from '../profileIntro/index';
import { logoutUserApi } from '../../services/auth.service';
import { getCookie, setCookie } from '../../lib/session';
import { useState } from 'react';
import { useRouter } from 'next/router';
// import { useAlert, positions, types, transitions } from 'react-alert'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from '../../lib/global';



const headerData = () => {

    const refreshToken = getCookie('refreshToken');
    const token = getCookie('token');
    const userId = getCookie('userId');
    const sessionId = getCookie('sessionId');
    const userType = getCookie('userType');
    // const alert = useAlert()

    const Route = useRouter()
    console.log(Route.pathname)

    const data = {
        userType: userType,
        refreshToken: refreshToken,
        userId: userId,
        sessionId: sessionId
    }

    const [auth] = useAuth();
    const dispatch = useDispatch()

    const logoutHandler = () => {
        close_drawer()

        logoutUserApi(data, token)
            .then((res) => {
                // console.log(res, 'logout')
                dispatch({ type: "AUTH", payload: false })
                dispatch({ type: "IS_LOADING", payload: true })
                // redirectRoute("account")
                setCookie('isAuthenticate', false)
                setTimeout(() => {
                    Route.push('/')
                    dispatch({ type: "IS_LOADING", payload: false })
                }, 3000);
                Toast('Logout Success', 'Success');
                // alert.success('Logout Successfully', {
                //     timeout: 500,
                //   })
                // alert.show(`LogOut Successfully...`,
                //     {
                //         type: types.SUCCESS,
                //     })
            })
            .catch((err) => {
                console.error(err)
                dispatch({ type: "IS_LOADING", payload: false })
                Toast('Login Error', 'error');
                // alert.show(`LogOut Failed...`,
                //     {
                //         type: types.ERROR,
                //     })
            })
    }


    const headData = {
        aboutItems: [
            {
                icon: "",
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "About Litha Labs",
                onClick: () => {
                    close_drawer()
                    return Route.pathname != "/about_litha_labs"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("about_litha_labs")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: "",
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Litha Psychology",
                onClick: () => {
                    return Route.pathname != "/litha_psychology"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("litha_psychology")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: "",
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Litha Technology",
                onClick: () => {
                    return Route.pathname != "/litha_technology"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("litha_technology")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            }
        ],
        conversationItems: [
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "About Conversationers",
                onClick: () => {
                    return Route.pathname != "/about_conversationers"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("about_conversationers")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Bunty",
                onClick: () => {
                    return Route.pathname != "/bunty"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("bunty?bot=bunty")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Dreams Expert",
                onClick: () => {
                    return Route.pathname != "/about_dreams_expert"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        &&  redirectRoute("about_dreams_expert?bot=dreams_expert")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Knowledge Expert",
                onClick: () => {
                    return Route.pathname != "/about_knowledge_expert"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("about_knowledge_expert")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            }
        ],
        assessorsItems: [
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "About Assessors",
                onClick: () => {
                    return Route.pathname != "/about_assessors"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("about_assessors")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Working With Assessors",
                onClick: () => {
                    return Route.pathname != "/working_with_assessors"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("working_with_assessors")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "PHQ-2",
                onClick: () => {
                    return Route.pathname != "/phq-2"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        &&  redirectRoute("phq-2?bot=PHQ_2")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "PHQ-9",
                onClick: () => {
                    return Route.pathname != "/phq-9"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        &&  redirectRoute("phq-9?bot=PHQ-9")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "GAD-2",
                onClick: () => {
                    return Route.pathname != "/gad-2"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        &&  redirectRoute("gad-2?bot=GAD_2")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "GAD-7",
                onClick: () => {
                    return Route.pathname != "/gad-7"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        &&  redirectRoute("gad-7?bot=GAD_7")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "PTSD-5",
                onClick: () => {
                    return Route.pathname != "/ptsd-5"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        &&  redirectRoute("ptsd-5?bot=PTSD_5")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: <i className="fa fa-comments-o" aria-hidden="true"></i>,
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "SAVE-9",
                onClick: () => {
                    return Route.pathname != "/save-9"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        &&  redirectRoute("save-9?bot=SAVE_9")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            }
        ],
        orientersItems: [
            {
                icon: '',
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "About Human Orienters",
                onClick: () => {
                    return Route.pathname != "/about_human_orienters"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("about_human_orienters")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: '',
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Working With Orienters",
                onClick: () => {
                    return Route.pathname != "/working_with_orienters"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("working_with_orienters")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            }
        ],
        accountItems: [
            {
                icon: '',
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Sign In",
                onClick: () => {
                    return Route.pathname != "/account"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("account")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            }
        ],
        profileItems: [
            {
                jsxComp: <ProfileIntro />,
                type: "jsxComp"
            },
            {
                icon: '',
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Profile",
                onClick: () => {
                    return Route.pathname != "/dashboard/profile"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("/dashboard/profile")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: '',
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Dashboard",
                onClick: () => {
                    return Route.pathname != "/dashboard"
                        ? dispatch({ type: "IS_LOADING", payload: true })
                        && redirectRoute("dashboard")
                            .then(() => setTimeout(() => {
                                dispatch({ type: "IS_LOADING", payload: false })
                            }, 500))
                        : null
                }
            },
            {
                icon: '',
                iconWidth: "",
                iconHeight: "",
                type: "itemComp",
                label: "Logout",
                onClick: () => {
                    logoutHandler();
                }
            }
        ],

    }

    return headData
}

export default headerData;