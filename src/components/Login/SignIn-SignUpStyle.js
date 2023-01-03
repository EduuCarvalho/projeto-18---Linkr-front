import styled from "styled-components";
import { Link } from "react-router-dom";


export const Container = styled.div`
    width:100vw;
    min-height:100vh;
    display:flex;
    justify-content:center;

`
export const LogoContainer = styled.div`
    width:60vw;
    min-height:100vh;
    display:flex;
    flex-direction:column;
    background-color:#151515;
    padding: 20vh 55vw 60vh 10vw;

`
export const Tittle = styled.h1`
            color:#FFFFFF;
            font-weight: 700;
            font-size: 106px;
            line-height: 117px;
            font-style: normal;
            font-family: 'Passion One';
    `
export const SubTittle = styled.h1`
            width:25vw;
            display:flex;
            flex-direction:row;
            font-style: normal;
            font-weight: 700;
            font-size: 43px;
            line-height: 64px;
            font-family: 'Oswald';
            color:#FFFFFF;

`    

export const InputsContainer = styled.div`
    width:40vw;
    min-height:100vh;
    display:flex;
    align-items:center;
    flex-direction:column;
    background-color:#515151;
    padding-top:27vh;


    input {
        width:30vw;
        height:65px;
        background: #FFFFFF;
        border-radius: 6px;
        border: 1px solid #D5D5D5;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        font-family: 'Oswald';
        color: #000000;
        font-style: normal;
        padding-left:16px;
        margin-bottom:13px;
    }

    button {
        width:30vw;
        height:65px;
        background:#1877F2;
        border-radius:6px;
        display:flex;
        justify-content:center;
        align-items:center;
        border: none;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        font-family: 'Oswald';
        color:#FFFFFF;
    }

`

export const StyledLink = styled(Link)`
text-decoration:none;

&:focus, &:hover, &:visited, &:link, &:active {
    text-decoration:none;
}

 h1{
     font-style: normal;
     font-weight: 400;
     font-size: 20px;
     line-height: 24px;
     font-family: 'Lato';
     color:#FFFFFF;
     margin-top:22px;
    }
`