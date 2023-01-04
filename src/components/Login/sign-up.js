import { Container, LogoContainer, InputsContainer, Tittle, SubTittle, StyledLink } from "./SignIn-SignUpStyle";


export default function SignUp (){


    

    return(
    <Container>
       <LogoContainer>
                <Tittle>linkr</Tittle>
                <SubTittle>save, share and discover the best links on the web</SubTittle>
            </LogoContainer>
            <InputsContainer>
            <input placeholder="e-mail" type="email" name="email"  required ></input>
            <input placeholder="password" type="password" name="password"  required ></input>
            <input placeholder="username" type="text" name="username" required></input>
            <input placeholder="picture url" type="text" name="pictureUrl" required></input>
            <button type="submit"> Sign Up </button>
            <StyledLink to={"/"}><h1>Switch back to log in</h1></StyledLink>
            </InputsContainer>
    </Container>
    )
}