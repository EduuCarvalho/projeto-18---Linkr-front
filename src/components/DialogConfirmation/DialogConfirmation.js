import { useState, useContext } from "react";
import { UserInfoContext } from "../../contexts/userInfo";
import styled from "styled-components";
import { mainFont } from "../../constants/fonts";
import { BASE_URL } from "../../constants/urls";
import swal from "sweetalert";
import LoadingData from "../LoadingData/LoadingData";
import axios from "axios";
import { reloadPosts } from "../timeline/functions";
import { postsContext } from "../../contexts/postsContext";

export default function DialogConfirmation({
  setIsOpen,
  postIdClicked,
  typeModal,
}) {
  const [isLoading, setLoading] = useState(false);
  const { header } = useContext(UserInfoContext);
  const {
    setLoadPostsPhrase,
    setRecentPosts,
    setPosts,
    setLoaded,
    URL,
    source,
  } = useContext(postsContext);
  const itsDelete = typeModal === "delete";

  function successfulRequest(response) {
    swal(response.data.message);
    setIsOpen(false);
    setLoading(false);
    reloadPosts(
      false,
      setLoadPostsPhrase,
      setRecentPosts,
      setPosts,
      setLoaded,
      URL,
      header,
      source
    );
  }

  function requestError(err) {
    setLoading(false);
    setIsOpen(false);
    console.log(err);
  }

  function deletePost() {
    setLoading(true);
    axios
      .delete(`${BASE_URL}/timeline/${postIdClicked}`, header)
      .then(successfulRequest)
      .catch(requestError);
  }

  function sharePost() {
    setLoading(true);
    axios
      .post(`${BASE_URL}/share/${postIdClicked}`, {}, header)
      .then(successfulRequest)
      .catch(requestError);
  }

  if (isLoading) {
    return <LoadingData />;
  }
  return (
    <ConfirmationContainer>
      <p>
        {itsDelete ? "Are you sure you want" : "Do you want to re-post"}
        <br />
        {itsDelete ? "to delete this post?" : "this link?"}
      </p>
      <div>
        <ButtonStyle
          color="#1877f2"
          background="#ffffff"
          onClick={() => setIsOpen(false)}
        >
          {itsDelete ? "No, go back" : "No, cancel"}
        </ButtonStyle>
        <ButtonStyle
          color="#ffffff"
          background="#1877f2"
          onClick={() => (itsDelete ? deletePost() : sharePost())}
        >
          {itsDelete ? "Yes, delete it" : "Yes, share!"}
        </ButtonStyle>
      </div>
    </ConfirmationContainer>
  );
}

const ConfirmationContainer = styled.div`
  font-family: ${mainFont};
  font-weight: 700;
  width: 45.46vw;
  height: 18.2vw;
  border-radius: 3.47vw;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5vw;
  p {
    font-size: 2.37vw;
    color: #ffffff;
    text-align: center;
  }
  div {
    display: flex;
    gap: 1.5vw;
  }
`;

const ButtonStyle = styled.button`
  font-weight: 700;
  width: 9.3vw;
  height: 2.6vw;
  border-radius: 0.35vw;
  font-size: 1.25vw;
  color: ${(props) => props.color};
  background-color: ${(props) => props.background};
  border: none;
  cursor: pointer;
`;
