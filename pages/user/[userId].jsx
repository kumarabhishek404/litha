import { useRouter } from 'next/router'
import React from 'react'

const SingleUserComponent = () => {
    const {query} = useRouter();
    const {userId} = query;
    // console.log('params', userId)
    
    return (
        <div>
            SingleUserComponent
        </div>
    )
}

export default SingleUserComponent
