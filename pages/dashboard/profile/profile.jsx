import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ProfileLayout from '../../../components/Layout/profileLayout';
import Profile from '../../../components/profile/index';
import { Toast } from '../../../lib/global';
import { getCookie } from '../../../lib/session';
import { getProfileData } from '../../../services/auth.service';

function profile() {

    const dispatch = useDispatch()
    const userId = getCookie('userId')
    const userType = getCookie('userType')
    const token = getCookie('token')
    
    const [edit, setEdit] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [mobile, setMobile] = useState('')
    
    const data = `userId=${userId}&userTypeCode=${userType}`
    
    const profile = useSelector(state => state?.profile?.profileData)
    useEffect(() => {
        console.log(profile, "profile deaaaa");
        setFirstName(profile.firstName)
        setLastName(profile.lastName)
        setEmail(profile.email)
        setRole(profile.role)
        setMobile(profile.mobile)
    }, [profile])

    useEffect(() => {
        console.log(token, data, "token");
        getProfileData(data, token)
            .then((res) => {
                console.log(res.data.data);
                const data = res.data.data
                // setFirstName(data.firstName)
                // setLastName(data.lastName)
                // setEmail(data.email)
                // setRole(data.userType)
                // setMobile(data.number || "not added")

                const profileData = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    role: data.userType,
                    email: data.email,
                    mobile: data.number
                }

                dispatch({ type: "PROFILE", payload: profileData })
                Toast('Profile data fetch Success', 'Success');

            })
            .catch((err) => {
                // const profileData = {
                //     firstName: "Abhishek",
                //     lastName: "Kumar",
                //     role: "Admin",
                //     email: "abhi@gmail.com",
                //     mobile: "6397308499"
                // }

                // dispatch({ type: "PROFILE", payload: profileData })
                console.error(err);
                Toast('Profile data fetch failed', 'error');
            })
    }, [])

    return (
        <ProfileLayout>
            <Profile />
        </ProfileLayout>
    )
}

export default profile
