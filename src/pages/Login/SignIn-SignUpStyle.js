import styled from "styled-components";
import { Link } from "react-router-dom";


export const Container = styled.div`
    width:100vw;
    min-height:100vh;
    display:flex;
    justify-content:center;

    @media (max-width: 600px) {
        display:flex;
        flex-direction:column;
    }

`
export const LogoContainer = styled.div`
    width:60vw;
    height:100vh;
    display:flex;
    flex-direction:column;
    background-color:#151515;
    padding: 20vh 55vw 60vh 10vw;


    @media (max-width:600px){
        max-height:175px;
        width:100vw;
        padding:0px 0px 0px 0px;
        align-items:center;
        justify-content:center;
    }

`
export const Tittle = styled.h1`
            color:#FFFFFF;
            font-weight: 700;
            font-size: 106px;
            line-height: 117px;
            font-style: normal;
            font-family: 'Passion One';

            @media (max-width: 600px){
                font-style: normal;
                font-weight: 700;
                font-size: 76px;
                line-height: 84px;
                font-family: 'Passion One';
            }

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

            @media (max-width: 600px){
                width:70vw;
                font-style: normal;
                font-weight: 700;
                font-size: 23px;
                line-height: 34px;
                text-align: center;
                font-family: 'Oswald';
            }
`    

export const InputsContainer = styled.form`
    width:40vw;
    min-height:100vh;
    display:flex;
    align-items:center;
    flex-direction:column;
    background-color:#373737;
    padding-top:27vh;

    @media (max-width:600px){
        width:100vw;
        padding-top:15vh;
    }

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

        @media (max-width:600px){
        width:90vw;
      
    }
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
        @media (max-width:600px){
        width:90vw;
    }
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