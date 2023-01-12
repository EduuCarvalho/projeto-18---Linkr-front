import styled from "styled-components";

export default function Loading() {
    return (
        <LoadingPosition>
            <LoadingGif ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></LoadingGif>
        </LoadingPosition>
    )
}

const LoadingPosition = styled.div`
    margin: 5rem 0 5rem 0;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingGif = styled.div`
    width: 5.75rem;
    height: 5.75rem;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0; /* see note above */

    div {
        position: absolute;
        width: 5.75rem;
        height: 5.75rem;
        border: 5px solid #6d6d6d;
        border-top-color: transparent;
        border-radius: 50%;
    }

    div {
        animation: ldio-nc63zyl6z5j 1.282051282051282s linear infinite;
        top: 5rem;
        left: 3rem
    }

    div { box-sizing: content-box; }
    
    @keyframes ldio-nc63zyl6z5j {
        0% { transform: translate(-50%,-50%) rotate(0deg); }
        100% { transform: translate(-50%,-50%) rotate(360deg); }
    }
`;