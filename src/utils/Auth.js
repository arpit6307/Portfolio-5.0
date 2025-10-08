import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    sendPasswordResetEmail as firebaseSendPasswordResetEmail
} from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Naya state admin status ke liye
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  // IMPORTANT: Apna Firebase User UID yahan daalein
  const ADMIN_UID = '6dUymOFyLNUkIZAOVxQF531Woi52'; 
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      // Check karein ki kya logged-in user admin hai
      if (user && user.uid === ADMIN_UID) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [ADMIN_UID]); // Dependency mein ADMIN_UID add karein

  const signup = (email, password) => {
    setError(null);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setError(null);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const sendPasswordResetEmail = (email) => {
    setError(null);
    return firebaseSendPasswordResetEmail(auth, email);
  };

  const value = {
    currentUser,
    isAdmin, // isAdmin ko poore app mein available karayein
    loading,
    signup,
    login,
    logout,
    sendPasswordResetEmail,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

