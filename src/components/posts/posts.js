import styled from "styled-components";

const PostBox = styled.div`
    width: 100%;
    max-width: 61rem;
    height: 27.6rem;
    background-color: #171717;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    margin-top: 1.6rem;
    padding: 1.6rem 1.8rem 1.6rem 1.8rem;
    position: relative;
    z-index: 1;

    .imageAndActivity{
        display: flex;
        flex-direction: column;
        height: 100%;
        color: var(--white);
        font-size: 11px;
    }

    .activity{
        margin-left: -1.8rem;

        svg{
            margin: 2rem auto .4rem auto;
            display: flex;
            justify-content: center;
        }

        p{
            text-align: center;
        }
    }

    .userImage{
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

    .postInformations{
        width: 100%;
        height: 100%;
        position: relative;

        h3{
            font-size: 20px;
            font-weight: 400;
            color: var(--white);
            cursor: pointer;
        }
        
        p{
            margin-top: .7rem;
            font-weight: 400;
            font-size: 17px;
            color: #B7B7B7;
            word-break: break-all; 
        }

        .description{
            max-height: 5rem;
            overflow-y: scroll;

            ::-webkit-scrollbar{
                width: 3px;
                height: 3px;
            }

            ::-webkit-scrollbar-track{
                background: transparent;
            }

            ::-webkit-scrollbar-thumb{
                background: #4D4D4D;
                border-radius: 10px;
            }
        }

        & > div{
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
                height: 120%;
                word-break: break-all;
                overflow-y: scroll;

                ::-webkit-scrollbar{
                    width: 3px;
                    height: 3px;
                }

                ::-webkit-scrollbar-track{
                    background: transparent;
                }

                ::-webkit-scrollbar-thumb{
                    background: #4D4D4D;
                    border-radius: 10px;
                }

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

    @media (max-width: 700px) {
        border-radius: 0;
        margin-top: 0;
        margin-bottom: 1.6rem;

        .imageAndActivity{
            font-size: 9px;

            svg{
                margin: 1.7rem 2.6rem 1.2rem 2.6rem;
            }
        }

        .userImage{
            height: 4rem;
            width: 4rem;
            margin-right: 1.4rem;
        }

        .postInformations{
            h3{
                font-size: 17px;
            }
            
            p{
                font-size: 15px;
            }

            .editPost{
                display: none;
            }

            .linkData{
                padding: .7rem 1rem;
                width: 100%;

                .linkInformations{
                    width: 65%;
                    word-break: break-all;

                    .linkDescription, .link{
                        font-size: 10px;
                    }
                }

                .linkImg{
                    width: 35%;
                }
            }    
    }
    }
`;

export default PostBox;

export const UpdateArea = styled.textarea`
    width: 503px;
    min-height: 22px;
    border-radius: 7px;
    padding: 4px 0 0 9px;
    font-size: 14px;
    color: #4c4c4c;
    box-sizing: border-box;
`

export const CommentsBox = styled.div`
    background-color: #1e1e1e;
    border-radius: 0 0 16px 16px;
    display: ${({ openComments }) => openComments ? "" : "none"};
    margin-top: -16px;
    padding: 16px 2rem 1rem 2rem;

    img {
        border-radius: 100%;
        height: 4rem;
        margin: 0 2rem 0 1rem;
        overflow: hidden;
        width: 4rem;
    }
`;

export const Comment = styled.div`
    align-items: center;
    border-bottom: 1px solid #353535;
    display: flex;
    height: 75px;
    line-heigth: 17px;

    span:nth-child(1) {
        color: var(--white);
    }

    span:nth-child(2) {
        color: #565656;
    }

    span {
        color: #acacac;
    }
`;

export const CommentInsert = styled.form`
    align-items: center;
    display: flex;
    height: 75px;
    position: relative;

    button {
        background: none;
        border: none;
        position: absolute;
        right: 1.5rem;
    }

    input {
        background-color: #252525;
        border: none;
        border-radius: 8px;
        color: #575757;
        font-family: inherit;
        font-size: 14px;
        font-style: italic;
        height: 4rem;
        letter-spacing: 0.05em;
        padding: 0 1rem;
        width: calc(100% - 7rem);
    }
`;

export const RepostInfo = styled.div`
    width: 100%;
    height: 55px;
    margin-bottom: -40px;
    margin-top: 20px;
    padding: 5px 0 0 10px;
    border-radius: 16px;
    background-color : #1e1e1e;
    z-index: 0;
    box-sizing: border-box;
    color: #FFFFFF;
    font-size: 11px;
    font-weight: 400;
    div{
        display: flex;
        align-items: center;
        gap: 5px;
    }
`

export const FollowButtonStyle = styled.button`
    width: 112px;
    height: 31px;
    background-color: #1877F2;
    color: #ffffff;
    position: absolute;
    top: 141px;
    right: 262px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
;
`