import React from "react"
import { useNavigate } from "react-router-dom"
import { UserInfoContext } from "../../contexts/userInfo"
import { Container, LogoContainer, InputsContainer, Tittle, SubTittle, StyledLink } from "./SignIn-SignUpStyle"
import axios from "axios"

export default function SignIn(){

     /*    const {logInObj, setLogInObj, setUserInfo} = React.useContext(UserInfoContext)
        let navigate = useNavigate();

        function handleLogIn (e){
            const {name,value} = e.target;
            setLogInObj({...logInObj, [name]:value})
        }

        function logIn (e){
            e.preventDefault();
            axios.post(``)
        }
 */
    return (
        <Container> 
            <LogoContainer>
                <Tittle>linkr</Tittle>
                <SubTittle>save, share and discover the best links on the web</SubTittle>
            </LogoContainer>
            <InputsContainer /* onSubmit={logIn} */ >
            <input placeholder="e-mail" type="email" name="email" /* value={logInObj.name} onChange={handleLogIn} */ required ></input>
            <input placeholder="password" type="password" name="password" /* value={logInObj.password} onChange={handleLogIn}  */required ></input>
            <button type="submit"> Log In </button>
            <StyledLink to={"/sign-up"}><h1>First time? Create an account!</h1></StyledLink>
            </InputsContainer>
            
        </Container>
    )
}