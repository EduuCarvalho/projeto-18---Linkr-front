import React, {createContext, useState} from "react";


export const UserInfoContext = createContext ({});

function UserInfoProvider ({children}) {
    const [ userInfo, setUserInfo] = useState({
        token:localStorage.getItem("token"),
        name:localStorage.getItem("name")
    })

    const config = {
        headers:{
            Authorization: `Bearer ${userInfo.token}`
        }
    }

    const [logInObj, setLogInObj] = useState({
        email:"",
        password:""
    })

    return(
        <UserInfoContext.Provider valuer={{userInfo, setUserInfo, config, logInObj, setLogInObj}}>
            {children}
        </UserInfoContext.Provider>
    )

}

export default UserInfoProvider;