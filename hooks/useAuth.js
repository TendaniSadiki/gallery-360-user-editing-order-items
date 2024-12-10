import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, firestore } from '../services/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import useAlert from './useAlert'



const useAuth = () => {
    const alert = useAlert()
    const [authSession, setAuthSession] = useState({
        isLoading: null,
        isLoggedIn: null,
        user: {
            email: null,
            uid: null,
            photoUrl: null,
            fullName: null
        },
        profileSet: null
    })
    useEffect(() => {
        // console.log({ authSession });

    }, [authSession])
    const getUserState = () => {
        setAuthSession(state => {
            return {
                ...state,
                // isLoading: true,
            }
        })
        auth.onAuthStateChanged(user => {
            if (user) {
                const { email, uid } = user
                // console.log({ email, uid, });
                // setLoggedIn(true)
                getUserDetails(user.uid)
            } else {
                setAuthSession(state => {
                    return {
                        ...state,
                        isLoading: false,
                        isLoggedIn: false
                    }
                })
            }
        })
    }
    const getUserDetails = (uid) => {
        // console.log({ uid });
        
        firestore.collection('users').doc(uid).get().then(doc => {
            if (doc.exists) {
                const data = doc.data()
                setAuthSession(state => {
                    return {
                        ...state,
                        isLoading: false,
                        isLoggedIn: true,
                        isProfileSet: data.profileSet ? true : false,
                        user: {
                            photoUrl: data.photoURL,
                            fullName: data.fullName,
                            uid: uid,
                            email: data.email
                        }
                    }
                })
            } else {
                setAuthSession(state => {
                    return {
                        ...state,
                        isLoading: false,
                        isLoggedIn: true,
                        isProfileSet: false
                    }
                })
            }
        })
    }
    const register = async(email, password) => {
        setAuthSession(state => {
            return {
                ...state,
                // isLoading: true
            }
        })
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return firestore
                    .collection("users")
                    .doc(user.uid)
                    .set({
                        uid: user.uid,
                        fullName: fullName,
                        email: user.email,
                        photoUrl:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU",
                    })
                    .then(() => {
                        setAuthSession(state => {
                            return {
                                ...state,
                                isLoading: false,
                                isLoggedIn: true,
                                isProfileSet: user.profileSet ? true : false,
                                user: {
                                    photoUrl: user.photoURL,
                                    fullName: user.fullName,
                                    uid: user.uid,
                                    email: user.email
                                }
                            }
                        })
                        return data
                    })
                    .catch((error) => {
                        console.error(error);
                        setAuthSession(state => {
                            return {
                                ...state,
                                isLoading: false
                            }
                        })
                        alert('Error signing up', error.code)

                        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
                    });
            })
    }
    const logIn = async (email, password) => {
        console.log({ email, password});
        
        setAuthSession(state => {
            return {
                ...state,
                // isLoading: true
            }
        })
        signInWithEmailAndPassword(auth, email, password)
            .then(data => {
                getUserDetails(data.user.uid)
                // toggleUserState(true, { email: user.email, uid: user.uid })
                return 'logged in'
            }).catch(error => {
                console.log({ error });
                
                // return error
                alert('Error signing in', error.message)
                setAuthSession(state => {
                    return {
                        ...state,
                        isLoggedIn: false,
                        isLoading: false
                    }
                })
            })
    }
    const logOut = async () => {
        await auth.signOut().then(data => {
            setAuthSession(state => {
                return {
                    ...state,
                    isLoading: false,
                    isLoggedIn: false,
                    isProfileSet: false,
                    user: null
                }
            })
        }).catch(error => {
            console.warn(error);
            alert('Error logging out', error.code)
        })
    }
    useEffect(() => {
        // console.log('getting user state');
        // console.log({ profileSet });
        
        getUserState()
    }, [])
    const { isLoggedIn, isLoading, isProfileSet, user } = authSession
    return {
        isLoggedIn, isLoading, isProfileSet, user, logIn, logOut, register
    } 
}

export default useAuth

const styles = StyleSheet.create({})