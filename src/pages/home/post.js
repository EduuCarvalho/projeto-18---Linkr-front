import PostBox, { Comment, CommentInsert, CommentsBox, RepostInfo, UpdateArea } from "../../components/posts/posts";
import { HiHeart } from "react-icons/hi2";
import { BiHeart } from "react-icons/bi";
import { AiOutlineComment } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
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
import imageNotFound from "../../assets/images/imageNotFound.webp"
import { postsContext } from "../../contexts/postsContext";
import { getTrendings } from "../../components/timeline/functions";

export default function Post({ post, shares, openModal, isHome }) {
  const { id: postId, ownerId, name: userName, picture_url: userImg, linkTitle, linkDescription, linkImg, url: link, likes, who_shared_name } = post;
  const { header, userInfo } = useContext(UserInfoContext);
  const { setTrending } = useContext(postsContext);
  const URL = `${BASE_URL}/like`;
  const likeURL = `${BASE_URL}/like/post/${postId}`;
  const [liked, setLiked] = useState(likes.includes(userInfo.name));
  const [personsWhoLiked, setPersonsWhoLiked] = useState("");
  const [updatePost, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const navigate = useNavigate();
  const [description, setDescription] = useState(post.description);
  const isRepost = who_shared_name !== null;
  const [newComment, setNewComment] = useState("");
  const [postComments, setPostComments] = useState([]);
  const [reloadComments, setReloadComments] = useState(false);

  useEffect(() => {
    getLikes(liked);
  }, [liked]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/comments/${postId}`, header)
      .then((res) => setPostComments(res.data))
      .catch(err => console.log(err));
  }, [reloadComments, header, postId]);

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
            `${likesArr[0]}, ${likesArr[1]} and other ${likes.length - 1
            } people`
          );
        } else {
          setPersonsWhoLiked(
            `${likesArr[0]}, ${likesArr[1]} and other ${likes.length - 2
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
          `${BASE_URL}/timeline/${postId}`,
          { description: e.target.value },
          header
        )
        .then((response) => {
          setLoading(false);
          setDescription(e.target.value);
          setUpdate(!updatePost);
          getTrendings(header, setTrending);
        })
        .catch((err) => {
          swal(err.response.data);
          setLoading(false);
        });
    }
  }

  function handleComment(e) {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/comment`, { post_id: postId, user_id: Number(userInfo.userId), comment: newComment }, header)
      .then(() => {
        setNewComment("");
        setReloadComments(!reloadComments);
      })
      .catch(err => console.log(err));
  }
  return (
    <>
      {(who_shared_name && isHome) && (
        <RepostInfo>
          <div>
            <FaRetweet color="white" cursor={"pointer"} size={23} />
            <p>Re-posted by <strong>{who_shared_name === userInfo.name ? "you" : who_shared_name}</strong></p>
          </div>
        </RepostInfo>
      )}

      <PostBox linkImg={linkImg}>
        <div className="imageAndActivity">
          <div className="userImage">
            <img src={userImg} alt="userImage" />
          </div>

          <div className="activity">
            {!liked ? (
              <BiHeart
                color="white"
                cursor={"pointer"}
                size={23}
                onClick={() => (!isRepost || !isHome) && changeLike()}
              />
            ) : (
              <HiHeart
                color="red"
                cursor={"pointer"}
                size={23}
                onClick={() => (!isRepost || !isHome) && changeLike()}
              />
            )}

            {likes.includes(userInfo.name) ? (
              <LikeTooltip title={personsWhoLiked} arrow>
                <p>{!liked ? likes.length - 1 : likes.length} likes</p>
              </LikeTooltip>
            ) : (
              <LikeTooltip title={personsWhoLiked} arrow>
                <p>{!liked ? likes.length : likes.length + 1} likes</p>
              </LikeTooltip>
            )}

            <AiOutlineComment
              color="white"
              cursor={"pointer"}
              size={23}
              onClick={() => (!isRepost || !isHome) && setOpenComments(!openComments)}
            />

            <p>
              {postComments.length} comment{postComments.length != 1 && "s"}
            </p>

            <FaRetweet color="white" cursor={"pointer"} size={23} onClick={() => (!isRepost || !isHome) && openModal(postId, "repost")} />
            <p>
              {shares} re-post{shares > 1 && "s"}
            </p>
          </div>
        </div>
        
        <div className="postInformations">
          {ownerId === parseInt(userInfo.userId) ? (
            <div className="editPost">
              <img
                src={editIcon}
                alt="edit"
                onClick={() => setUpdate(!updatePost)}
              />
              <ion-icon name="trash-outline" onClick={() => openModal(postId, "delete")} />
            </div>
          ) : null}

          <h3 onClick={() => navigate(`/users/${ownerId}`)}>{userName}</h3>

          {!updatePost ? (
            <ReactTagify colors="#ffffff" tagClicked={tag => tag[0] === "#" && navigate(`/hashtag/${tag.substring(1)}`)}>
              <p className="description">{description}</p>
            </ReactTagify>
          ) : (
            <UpdateArea
              cols="70"
              onKeyDown={handleKeyDown}
              defaultValue={description}
              disabled={loading}
              autoFocus
            />
          )}

          <a href={link} target={"_blank"}>
            <div className="linkData">
              <div className="linkInformations">
                <p className="linkTitle">{linkTitle}</p>

                <p className="linkDescription">{linkDescription}</p>

                <p className="link">{link}</p>
              </div>

              <div className="linkImg">
                <img
                  src={linkImg === "" ? imageNotFound : linkImg}
                  alt="Imagem do link"
                />
              </div>
            </div>
          </a>
        </div>
      </PostBox>
      <CommentsBox openComments={openComments}>
        {postComments.map(
          comment =>
            <Comment key={comment.comment_id}>
              <img alt={`${comment.username}`} src={comment.user_picture_url} />
              <p>
                <span>{comment.user_name}</span> <span>{comment.author_post && " • post's author"} {comment.is_following && " • following"}</span>
                <br />
                <span>{comment.comment}</span>
              </p>
            </Comment>
        )}
        <CommentInsert onSubmit={handleComment}>
          <img alt="userImage" src={userInfo.picture_url} />
          <input
            onChange={e => setNewComment(e.target.value)}
            placeholder="write a comment..."
            required
            type="text"
            value={newComment}
          />
          <button>
            <IoPaperPlaneOutline color="white" cursor={"pointer"} size={16} />
          </button>
        </CommentInsert>
      </CommentsBox>
    </>
  );
}
