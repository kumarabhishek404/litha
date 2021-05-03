import React, { useEffect, useState } from 'react'
import AvatarImg from '../Images/AvatarImg'
import { getCookie } from '../../lib/session';
import { useSelector } from 'react-redux';
import { getProfileData } from '../../services/auth.service';

function ProfileIntro() {
    const profile = useSelector(state => state?.profile?.profileData)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const userId = getCookie('userId')
    const userType = getCookie('userType')
    const token = getCookie('token')
    const data = `userId=${userId}&userTypeCode=${userType}`

    console.log(profile, "prrrrr");
    // const firstName = getCookie('firstName')
    // const lastName = getCookie('lastName')


    const ProfileImg = 'https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'

    useEffect(() => {
        // setFirstNameState(profile.firstName)
        // setLastNameState(profile.lastName)
        // setEmailState(profile.email)
        // setRoleState(profile.role)
        // setMobileState(profile.mobile || "not added")
        // console.log(token, data, "token");
        getProfileData(data, token)
            .then((res) => {
                console.log(res.data.data);
                const data = res.data.data
                setFirstName(data.firstName)
                setLastName(data.lastName)

            })
            .catch((err) => {
                console.error(err);
            })
    }, [profile])

    useEffect(() => {
        setFirstName(profile.firstName || 'firstName')
        setLastName(profile.lastName || 'lastName')
        // window.userAvatar = ProfileImg
    }, [profile])

    return (
        <>
            <div className='profileIntro d-flex'>
                <div className='profileIntro__img'>
                    <AvatarImg profilePic={ProfileImg} width='30px' height='30px' />
                </div>
                <div className='profileIntro__text'>
                    <div className='d-flex'>
                        <p className='m-0 mr-1'>{firstName.toUpperCase()}</p>
                        <p className='m-0'>{lastName.toUpperCase() || 'lastName'}</p>
                    </div>
                    <span className=' m-0'>@{firstName.toLowerCase()}</span>
                </div>
            </div>
        </>
    )
}

export default ProfileIntro;
