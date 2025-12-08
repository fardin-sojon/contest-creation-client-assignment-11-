import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";
import Loading from "../components/Loading";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email");
    googleProvider.addScope("https://www.googleapis.com/auth/userinfo.profile");
    googleProvider.setCustomParameters({
        prompt: "select_account"
    });

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        }).then(() => {
            setUser(prev => ({ ...prev, displayName: name, photoURL: photo }));
        });
    }

    // if(!user) return <Loading/>

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            
            if (currentUser && !currentUser.email && currentUser.providerData && currentUser.providerData.length > 0) {
                 const providerEmail = currentUser.providerData[0].email;
                 if(providerEmail){
                    try {
                        Object.defineProperty(currentUser, 'email', {
                            value: providerEmail,
                            writable: true
                        });
                    } catch (e) {
                         console.warn("Could not patch user email", e);
                    }
                 }
            }

            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
