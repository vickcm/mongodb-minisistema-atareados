import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import {useNavigate} from 'react-router-dom'
import profileService from '../service/profile.service'
import authService from '../service/autentication.service.js'

const SessionContext = createContext()

function useSession(){
    return useContext(SessionContext)
}

function useProfile(){
    const {profile, setProfile} = useSession()
    return {profile, setProfile}
}

function SessionProvider({children}){

    const [profile, setProfile] = useState({})
    const navigate = useNavigate()

    const onLogout = useCallback(() => {
        authService.logout()
        localStorage.removeItem('token')
        navigate('/login', {replace: true})
    }, [navigate])

    useEffect(() => {
        profileService.getProfile()
        .then((profile) => {
            setProfile(profile)
        })
    }, []) 

    const value = useMemo(()=>{
        return {
            profile,
            onLogout,
            setProfile
        }
    }, [ profile, onLogout])
    
    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}


export {
    useSession,
    SessionProvider,
    useProfile
}