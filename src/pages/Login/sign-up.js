import { Container, LogoContainer, InputsContainer, Tittle, SubTittle, StyledLink } from "./SignIn-SignUpStyle";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

export default function SignUp() {

    let navigate = useNavigate();

    const [userSignUp, setUserSignUp] = useState({
        email:"",
        password:"",
        name:"",
        pictureurl:""
    });

    function handleSignUp(e){
        const {name,value} = e.target;
        setUserSignUp({...userSignUp,[name]:value})
    }

    function signUp(e) {
        e.preventDefault();
        axios.post(`http://localhost:4000/signup`, userSignUp)
            .then((res) => {
                alert("Cadastro feito com sucesso!!!");
                navigate("/");
            })
            .catch((err) => {
                console.log(err)
                swal({
                    title: err.response.data,
                    icon: "error"
                })
            })
    }


    return (
        <Container>
            <LogoContainer>
                <Tittle>linkr</Tittle>
                <SubTittle>save, share and discover the best links on the web</SubTittle>
            </LogoContainer>
            <InputsContainer onSubmit={signUp}>
                <input placeholder="e-maillll" type="email" name="email" value={userSignUp.email} onChange={handleSignUp} required ></input>
                <input placeholder="password" type="password" name="password" value={userSignUp.password} onChange={handleSignUp} required ></input>
                <input placeholder="username" type="text" name="name" value={userSignUp.name} onChange={handleSignUp} required></input>
                <input placeholder="picture url" type="text" name="pictureurl" value={userSignUp.pictureurl} onChange={handleSignUp} required></input>
                <button type="submit"> Sign Up </button>
                <StyledLink to={"/"}><h1>Switch back to log in</h1></StyledLink>
            </InputsContainer>
        </Container>
    )
}