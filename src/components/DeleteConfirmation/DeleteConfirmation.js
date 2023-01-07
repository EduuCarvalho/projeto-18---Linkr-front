import { useState, useContext } from "react";
import { UserInfoContext } from "../../contexts/userInfo";
import styled from "styled-components";
import { mainFont } from "../../constants/fonts";
import { BASE_URL } from "../../constants/urls";
import swal from "sweetalert";
import LoadingData from "../LoadingData/LoadingData";
import axios from "axios";

export default function DeleteConfirmation({ setIsOpen, postIdClicked, reloadPosts }) {
  const [isLoading, setLoading] = useState(false);
  const { header } = useContext(UserInfoContext);
  function deletePost() {
    setLoading(true);
    axios
      .delete(`${BASE_URL}timeline/${postIdClicked}`, header)
      .then((response) => {
        swal(response.data.message);
        setIsOpen(false);
        setLoading(false);
        reloadPosts();
      })
      .catch((err) => {
        setLoading(false);
        setIsOpen(false);
        swal(err.response.data.message);
      });
  }
  if(isLoading){
    return <LoadingData />
  }
  return (
    <ConfirmationContainer>
      <p>
        Are you sure you want
        <br />
        to delete this post?
      </p>
      <div>
        <ButtonStyle
          color="#1877f2"
          background="#ffffff"
          onClick={() => setIsOpen(false)}
        >
          No, go back
        </ButtonStyle>
        <ButtonStyle
          color="#ffffff"
          background="#1877f2"
          onClick={deletePost}
        >
          Yes, delete it
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
