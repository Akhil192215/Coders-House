import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const SemiAuthenticate = () => {
    let auth = true
    let user = {
        activate: true
    }
    return !auth ? (
        <Navigate to='/' />) : auth && !user.activate ? (
            <Outlet />
        ) : (<Navigate to='/rooms' />)

}

export default SemiAuthenticate