import styled from "styled-components";

const CreatePostBox = styled.div`
    width: 100%;
    height: 21rem;
    background-color: var(--white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    padding: 1.6rem 2.2rem 1.6rem 1.8rem;
    margin-bottom: 1.4rem;

    #userImage{
        height: 5rem;
        width: 5rem;
        border-radius: 100%;
        overflow: hidden;
        margin-right: 1.8rem;

        img{
            height: 100%;
            width: 100%;
        }
    }

    #postInformations{
        width: 100%;
        height: 100%;
        position: relative;

        h3{
            font-size: 20px;
            font-weight: 300;
            color: #707070;
        }
        
        input, textarea{
            width: 100%;
            height: 6.6rem;
            margin-top: .5rem;
            border: none;
            border-radius: 5px;
            background-color: #EFEFEF;
            padding: .6rem 1.2rem;
        }

        input::placeholder, textarea::placeholder{
            font-size: 15px;
            font-weight: 300;
            color: #949494;
        }

        input:nth-child(2){
            margin-top: 1.8rem;
            height: 3rem;
        }

        button{
            right: 0;
            bottom: 0;
            position: absolute;
            width: 11.2rem;
            height: 3.1rem;
            background-color: #1877F2;
            border: none;
            border-radius: 5px;
            font-weight: 700;
            color: var(--white);
        }

        button:hover{
            cursor: pointer;
            filter: brightness(1.4);
        }
    }
`;

export default CreatePostBox;