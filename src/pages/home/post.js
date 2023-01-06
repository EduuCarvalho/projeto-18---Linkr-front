import PostBox from '../../components/posts/posts';
import { HiHeart } from 'react-icons/hi2';
import { BiHeart } from 'react-icons/bi';
import { useContext, useState } from "react";
import axios from 'axios';
import { UserInfoContext } from '../../contexts/userInfo';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


export default function Post({ postId, userName, userImg, description, linkTitle, linkDescription, linkImg, link, likes }) {
    const { header } = useContext(UserInfoContext);
    const URL = "http://localhost:4000/like"
    const likeURL = `http://localhost:4000/like/post/${postId}`;
    const [liked, setLiked] = useState(likes.includes(userName));

    const LikeTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 11,
        },
    }));

    function changeLike() {
        if (!liked) {
            axios.post(URL, { postId }, header)
                .then(response => {
                    console.log(response)
                    setLiked(!liked)
                })
                .catch(err => console.log(err))
        } else {
            axios.delete(likeURL, header)
                .then(response => {
                    setLiked(!liked)
                })
                .catch(err => console.log(err))
        }
    }

    const personsWhoLiked = [];
    
    for(let i = 0; i < likes.length; i ++){
        if(liked && !personsWhoLiked.includes('você')){
            personsWhoLiked.push('você');
        }

        if(personsWhoLiked.length < 3 && userName){
            personsWhoLiked.push(likes[i]);
        }
    }


    return (
        <PostBox linkImg={linkImg}>
            <div className="imageAndLikes">
                <div className="userImage">
                    <img src={userImg} alt='userImage' />
                </div>

                {!liked ? (
                    <BiHeart color="white" cursor={'pointer'} size={30} onClick={changeLike} />
                ) : (
                    <HiHeart color="red" cursor={'pointer'} size={30} onClick={changeLike} />
                )}

                {
                    likes.includes(userName) ? (
                        <LikeTooltip title="Add">
                            <p id='likedButton'>{!liked ? likes.length - 1 : likes.length} likes</p>
                        </LikeTooltip>
                    ) : (
                        <LikeTooltip title="Add" placement="top-start">
                            <p id='likeButton'>{!liked ? likes.length : likes.length + 1} likes</p>
                        </LikeTooltip>
                    )
                }

            </div>
            <div id='test' className="postInformations">

                <a href={link} target={'_blank'}>
                    <LikeTooltip title={personsWhoLiked}>

                        <h3>{userName}</h3>
                    </LikeTooltip>



                    <p>{description}</p>

                    <div className="linkData">

                        <div className="linkInformations">
                            <p className="linkTitle">{linkTitle}</p>

                            <p className="linkDescription">{linkDescription}</p>

                            <p className="link">{link}</p>
                        </div>

                        <div className='linkImg'>
                            <img src={linkImg} alt="Imagem do link" />
                        </div>

                    </div>
                </a>
            </div>
        </PostBox>
    );
}