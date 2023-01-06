import styled from "styled-components";

const PostBox = styled.div`
    width: 100%;
    height: 27.6rem;
    background-color: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    margin-top: 1.6rem;
    padding: 1.6rem 1.8rem 1.6rem 1.8rem;

    .imageAndLikes{
        display: flex;
        flex-direction: column;
        height: 100%;
        color: var(--white);
        font-size: 11px;
        
        svg:nth-child(2){
            margin: 2rem 0 .4rem .85rem;
        }

        p{
            margin-left: .85rem;
        }

    }

    .userImage{
        height: 5rem;
        width: 5rem;
        border-radius: 100%;
        overflow: hidden;
        margin-right: 1.8rem;
    }

    .postInformations{
        width: 100%;
        height: 100%;
        position: relative;

        h3{
            font-size: 20px;
            font-weight: 400;
            color: var(--white);
        }
        
        p{
            margin-top: .7rem;
            font-weight: 400;
            font-size: 17px;
            color: #B7B7B7;
        }

        > div{
            position: absolute;
            right: 0.5vw;
            top: 0.5vw;
            display: flex;
            gap: 1vw;
            img{
                width: 1.6vw;
                height: 1.6vw;
                cursor: pointer;
            }
            ion-icon{
                width: 1.6vw;
                height: 1.6vw;
                color: #ffffff;
                cursor: pointer;
            }
        }

        .linkData{
            margin-top: 1rem;
            padding: 2.4rem 0 2.3rem 2rem;
            width: 50rem;
            height: 15.5rem;
            border: 1px solid #4D4D4D;
            border-radius: 15px;
            position: relative;

            .linkInformations{
                width: 30rem;

                .linkTitle, .link{
                    color: #CECECE !important;
                }

                .linkDescription, .link{
                    color: #9B9595;
                    font-size: 11px;
                }
            }

            .linkImg{
                position: absolute;
                top: 0;
                right: 0;
                height: 100%;
                width: 15rem;
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                border-radius: 0 15px 15px 0;
            }
        }
    }
`;

export default PostBox;