import { Container, LogoContainer, InputsContainer, Tittle, SubTittle, StyledLink } from "./Sign-InStyle"

export default function SignIn(){

    return (
        <Container> 
            <LogoContainer>
                <Tittle>linkr</Tittle>
                <SubTittle>save, share and discover the best links on the web</SubTittle>
            </LogoContainer>
            <InputsContainer>
            <input placeholder="e-mail" type="email" name="email"  required ></input>
            <input placeholder="password" type="password" name="password"  required ></input>
            <button type="submit"> Log In </button>
            <StyledLink><h1>First time? Create an account!</h1></StyledLink>
            </InputsContainer>
            
        </Container>
    )
}