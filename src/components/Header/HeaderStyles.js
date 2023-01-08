import styled from "styled-components";
import { logoFont, mainFont } from "../../constants/fonts";

export const HeaderStyle = styled.header`
  width: 100vw;
  height: 5vw;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.18vw 0 1.94vw;
  h1 {
    font-family: ${logoFont};
    font-size: 3.4vw;
    color: #ffffff;
    cursor: pointer;
  }
  @media (max-width: 700px) {
    height: 19.2vw;
    padding: 0 4vw 0 4.5vw;
    h1{
      font-size: 12vw;
    } 
  }
`;

export const ProfileStyle = styled.div`
  color: #ffffff;
  width: 6.26vw;
  height: 3.68vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ion-icon {
    width: 3vw;
    height: 2vw;
    cursor: pointer;
  }
  img {
    width: 3.68vw;
    height: 3.68vw;
    border-radius: 1.84vw;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 5vw;
    right: 0;
    width: 9.24vw;
    height: 3.26vw;
    background-color: #171717;
    font-size: 1.18vw;
    font-weight: 700;
    font-family: ${mainFont};
    border-radius: 0 0 0 1.39vw;
    cursor: pointer;
  }
  @media (max-width: 700px) {
    width: 17vw;
    height: 11vw;
    ion-icon {
      width: 16vw;
      height: 12vw;
    }
    img {
      width: 11vw;
      height: 11vw;
      border-radius: 7.05vw;
    }
    div {
      top: 19.2vw;
      width: 34.7vw;
      height: 11.5vw;
      font-size: 4vw;
      border-radius: 0 0 0 5.33vw;
    }
  }
`;