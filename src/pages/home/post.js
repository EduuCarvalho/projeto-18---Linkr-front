import PostBox from "../../components/posts/posts";
import { HiHeart } from "react-icons/hi2";
import { BiHeart } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserInfoContext } from "../../contexts/userInfo";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import editIcon from "../../assets/images/edit.png";

export default function Post({
  postId,
  userName,
  userImg,
  description,
  linkTitle,
  linkDescription,
  linkImg,
  link,
  likes,
  setIsOpen
}) {
  const { header, userInfo } = useContext(UserInfoContext);
  const URL = "http://localhost:4000/like";
  const likeURL = `http://localhost:4000/like/post/${postId}`;
  const [liked, setLiked] = useState(likes.includes(userName));
  const [personsWhoLiked, setPersonsWhoLiked] = useState([]);

  useEffect(() => {
    getLikes(liked);
  }, []);

  function getLikes(liked) {
    const likesArr = [];
    for (let i = 0; i < likes.length || likesArr.length === 3; i++) {
      if (liked && !likes.includes("você")) {
        likesArr.push("você");
      }

      if (personsWhoLiked.length < 3 && userName !== userInfo.name) {
        likesArr.push(likes[i]);
      }
    }

    setPersonsWhoLiked([...likesArr]);
  }

  const LikeTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  function changeLike() {
    if (!liked) {
      axios
        .post(URL, { postId }, header)
        .then((response) => {
          console.log(response);
          setLiked(!liked);
          getLikes(!liked);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .delete(likeURL, header)
        .then((response) => {
          setLiked(!liked);
          getLikes(!liked);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <PostBox linkImg={linkImg}>
      <div className="imageAndLikes">
        <div className="userImage">
          <img src={userImg} alt="userImage" />
        </div>

        {!liked ? (
          <BiHeart
            color="white"
            cursor={"pointer"}
            size={30}
            onClick={changeLike}
          />
        ) : (
          <HiHeart
            color="red"
            cursor={"pointer"}
            size={30}
            onClick={changeLike}
          />
        )}

        {likes.includes(userName) ? (
          <LikeTooltip title={personsWhoLiked}>
            <p>{!liked ? likes.length - 1 : likes.length} likes</p>
          </LikeTooltip>
        ) : (
          <LikeTooltip
            title={personsWhoLiked.length > 0 ? personsWhoLiked : null}
          >
            <p>{!liked ? likes.length : likes.length + 1} likes</p>
          </LikeTooltip>
        )}
      </div>
      <div id="test" className="postInformations">
        <div>
          <img src={editIcon} alt="edit" />
          <ion-icon name="trash-outline" onClick={() => setIsOpen(true)}></ion-icon>
        </div>

        <a href={link} target={"_blank"}>
          <h3>{userName}</h3>

          <p>{description}</p>

          <div className="linkData">
            <div className="linkInformations">
              <p className="linkTitle">{linkTitle}</p>

              <p className="linkDescription">{linkDescription}</p>

              <p className="link">{link}</p>
            </div>

            <div className="linkImg">
              <img src={linkImg} alt="Imagem do link" />
            </div>
          </div>
        </a>
      </div>
    </PostBox>
  );
}
