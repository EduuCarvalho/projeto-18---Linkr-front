import React, {createContext, useState} from "react";


export const UserInfoContext = createContext ({});

function UserInfoProvider ({children}) {
    const [ userInfo, setUserInfo] = useState({
        userId: localStorage.getItem("user_id"),
        token:localStorage.getItem("token"),
        name:localStorage.getItem("name"),
        picture_url :localStorage.getItem("picture_url ")
    })

    const header = { headers: { "Authorization": `Bearer ${userInfo.token}` } };

    const [logInObj, setLogInObj] = useState({
        email:"",
        password:""
    });

    return(
        <UserInfoContext.Provider value={{userInfo, setUserInfo, logInObj, setLogInObj, header}}>
            {children}
        </UserInfoContext.Provider>
    );

}

export default UserInfoProvider;