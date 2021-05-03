import React from 'react'
import Route from 'next/router';

const HomePageContainer = () => {
    React.useEffect(()=>{
        Route.replace('/account/login')
    },[])
    return (
        <div></div>
    )
}

export default HomePageContainer
