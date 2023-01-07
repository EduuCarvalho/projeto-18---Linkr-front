import styled from "styled-components";
import { mainFont } from "../../constants/fonts";

export default function DeleteConfirmation({setIsOpen}) {
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
        <ButtonStyle color="#ffffff" background="#1877f2" onClick={() => setIsOpen(false)}>
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
