import styled from "styled-components";
import { mainFont } from "../../constants/fonts";

export const FormStyle = styled.form`
  input {
    width: 39.1vw;
    height: 3.13vw;
    border: none;
    border-radius: 8px;
    padding-left: 14px;
    ::placeholder {
      color: #c6c6c6;
      opacity: 1;
      font-size: 17px;
      font-weight: 400;
      font-family: ${mainFont};
    }
  }
  button {
    position: absolute;
    top: 1.7vw;
    right: 30.7vw;
    border: none;
    background-color: #ffffff;
    ion-icon {
      width: 1.7vw;
      height: 1.7vw;
      color: #c6c6c6;
    }
  }
  @media (max-width: 700px) {
    height: 19.2vw;
    position: absolute;
    top: 21.9vw;
    input {
      width: 93.3vw;
      height: 12vw;
    }
    button {
      top: 3vw;
      right: 4.5vw;
      ion-icon {
        width: 5vw;
        height: 5vw;
        color: #c6c6c6;
      }
    }
  }
`;

export const ResultSearchDiv = styled.div`
  min-width: 39.1vw;
  background-color: #e7e7e7;
  position: absolute;
  top: 3.7vw;
  right: 29.8vw;
  visibility: ${(props) => (props.visible === "true" ? "visible" : "hidden")};
  div {
    height: 4.5vw;
    font-family: ${mainFont};
    font-weight: 400;
    font-size: 1.32vw;
    color: #515151;
    display: flex;
    align-items: center;
    padding-left: 1.18vw;
    gap: 1vw;
    img {
      width: 2.71vw;
      height: 2.71vw;
      border-radius: 5.9vw;
    }
  }
  @media (max-width: 700px) {
    min-width: 93.3vw;
    top: 10.8vw;
    right: 0;
    div {
      height: 12vw;
      font-size: 4vw;
      padding-left: 3.5vw;
      gap: 3vw;
      img {
        width: 9vw;
        height: 9vw;
        border-radius: 17.5vw;
      }
    }
  }
`;