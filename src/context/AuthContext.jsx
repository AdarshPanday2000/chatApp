import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from '../firebase'

export const AuthContext = createContext();

export function  AuthContextProvider ({ children }){
    const [currentUser, setCurrentUser] = useState({})

    //to check wheater we have a user or not
    useEffect(() => {
        //firebase fn
      const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user) //if there is a user set it
            // console.log(user)
        })

        return () => {   //cleanup function to prevent memory lekage
            unsub()
        }
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
          {children} 
        </AuthContext.Provider>
    )
   
}
