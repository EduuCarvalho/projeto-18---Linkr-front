import PostBox, { UpdateArea } from "../../components/posts/posts";
import { HiHeart } from "react-icons/hi2";
import { BiHeart } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserInfoContext } from "../../contexts/userInfo";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import editIcon from "../../assets/images/edit.png";
import swal from "sweetalert";
import { BASE_URL } from "../../constants/urls";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function Post({
  postId,
  ownerId,
  userName,
  userImg,
  description,
  linkTitle,
  linkDescription,
  linkImg,
  link,
  likes,
  openModal,
  reloadPosts,
}) {
  const { header, userInfo } = useContext(UserInfoContext);
  const URL = "http://localhost:4000/like";
  const likeURL = `http://localhost:4000/like/post/${postId}`;
  const [liked, setLiked] = useState(likes.includes(userName));
  const [personsWhoLiked, setPersonsWhoLiked] = useState("");
  const [updatePost, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  //const textAreaRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    getLikes(liked);
  }, []);

  function getLikes(liked) {
    const likesArr = [];

    if (likes.length > 0) {
      for (let i = 0; i < likes.length; i++) {
        if (liked && i === 0) {
          likesArr.push("Você");
        }

        if (likes[i] !== userInfo.name) {
          likesArr.push(likes[i]);
        }

        if (likesArr.length === 3) {
          break;
        }
      }
    } else {
      if (liked) {
        likesArr.push("você");
      }
    }

    switch (likesArr.length) {
      case 1:
        setPersonsWhoLiked(`${likesArr[0]}`);
        break;

      case 2:
        setPersonsWhoLiked(`${likesArr[0]} and ${likesArr[1]}`);
        break;

      case 3:
        if (!likes.includes(userInfo.name) && likesArr.includes("Você")) {
          setPersonsWhoLiked(
            `${likesArr[0]}, ${likesArr[1]} and other ${
              likes.length - 1
            } people`
          );
        } else {
          setPersonsWhoLiked(
            `${likesArr[0]}, ${likesArr[1]} and other ${
              likes.length - 2
            } people`
          );
        }
        break;

      default:
        setPersonsWhoLiked(``);
        break;
    }
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
          getLikes(!liked);
          setLiked(true);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .delete(likeURL, header)
        .then((response) => {
          setLiked(!liked);
          getLikes(false);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setUpdate(!updatePost);
    }
    if (e.key === "Enter") {
      setLoading(true);
      axios
        .patch(
          `${BASE_URL}timeline/${postId}`,
          { description: e.target.value },
          header
        )
        .then((response) => {
          setLoading(false);
          reloadPosts();
          setUpdate(!updatePost);
        })
        .catch((err) => {
          swal(err.response.data.message);
          setLoading(false);
        });
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
          <LikeTooltip title={personsWhoLiked} arrow>
            <p>{!liked ? likes.length - 1 : likes.length} likes</p>
          </LikeTooltip>
        ) : (
          <LikeTooltip title={personsWhoLiked} arrow>
            <p>{!liked ? likes.length : likes.length + 1} likes</p>
          </LikeTooltip>
        )}
      </div>
      <div id="test" className="postInformations">
        <div>
          <img
            src={editIcon}
            alt="edit"
            onClick={() => setUpdate(!updatePost)}
          />
          <ion-icon
            name="trash-outline"
            onClick={() => openModal(postId)}
          ></ion-icon>
        </div>

        <h3 onClick={() => navigate(`/users/${ownerId}`)}>{userName}</h3>

        {!updatePost ? (
          <ReactTagify
            colors = "#ffffff"
            tagClicked = {tag => tag[0] === "#" && navigate(`/hashtag/${tag.substring(1)}`)}
          >
            <p>{description}</p>
          </ReactTagify>
        ) : (
          <UpdateArea
            cols="70"
            onKeyDown={handleKeyDown}
            defaultValue={description}
            disabled={loading}
            autoFocus
          ></UpdateArea>
        )}

        <a href={link} target={"_blank"}>
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
