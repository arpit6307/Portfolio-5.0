import React, { useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    sendPasswordResetEmail,
    onAuthStateChanged 
} from 'firebase/auth';

// NOTE: You must replace these with your actual Firebase project credentials in src/data/constants.js
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwDtoGdImAV0e2IGPHxrQCULsAte6-y5c",
  authDomain: "my-portfolio-db-35df7.firebaseapp.com",
  projectId: "my-portfolio-db-35df7",
  storageBucket: "my-portfolio-db-35df7.firebasestorage.app",
  messagingSenderId: "282476859701",
  appId: "1:282476859701:web:af3374ca1b649a1fd8fc7c",
  measurementId: "G-9QVZ579421"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout and redirect to home (`#about`)
    function logout() {
        return signOut(auth).then(() => {
            window.location.href = '/#about';
        });
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        register,
        login,
        logout,
        resetPassword,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};