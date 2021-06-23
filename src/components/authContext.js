import React, {createContext, useState, useEffect} from "react"
import history from "./history"
import axios from "axios";


const Context = createContext();




function AuthProvider({children}) {
    
    const [authenticated,setAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState({})
    useEffect(() => {
        const token = localStorage.getItem('token')
    
        if(token){
            setAuthenticated(true)
            setUser(JSON.parse(localStorage.getItem('user')))
        }

        setLoading(false)
    },[])

    
    async function handleLogin(e){
        var userData = {email:null, password:null};
        await axios.get("http://localhost:8080/client/email/" + e.email)
            .then(response => {
                userData = response.data
            }).catch(error => {
                console.debug('Erro', error)
            })
        console.log(userData)
        
        if(userData.email === e.email & userData.password === e.password){
            
            localStorage.setItem('token','asdjflaskdfjçlkasdfjçl')
            localStorage.setItem('user',JSON.stringify(userData))
            console.log('Logou')
            setAuthenticated(true)
            setUser(userData)
            console.log(history)
        }else{
            setAuthenticated(false)
            console.log('Usuário ou senha incorreto')
        }
    }

    function handleLogout(e){
        setAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return (
        <Context.Provider value={{authenticated,handleLogin,handleLogout,user,loading}}>
            {children}
        </Context.Provider>
    )
}

export {Context, AuthProvider}