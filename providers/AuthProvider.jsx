import { createContext, useContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";

export const UserContext = createContext({
    isLoggedIn: null,
    isProfileSet: null,
    user: {
        email: null,
        uid: null,
        username: null,
        photoUrl: null
    },
    isLoading: null,
    toggleUserState: () => { },
    logIn: () => {},
    logOut: () => {},
    register: () => {}
})
export const useSession = () => {
    const session = useContext(UserContext)
    return session
}

export const AuthProvider = ({ children }) => {
    const { isLoggedIn, isLoading, logIn, logOut, register, user, isProfileSet } = useAuth()
    useEffect(() => {
        // console.log({ isLoggedIn, isLoading });

    }, [])
    return (
        <UserContext.Provider value={{
            isLoggedIn, isLoading, isProfileSet, user, isLoading,
            logIn: (email, password) => logIn(email, password),
            logOut: logOut,
            register: (email, password) => register(email, password)
        }}

        >
            {children}
        </UserContext.Provider>
    )
}
// export const UserContext = createContext(false)