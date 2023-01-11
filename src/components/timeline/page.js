import styled from "styled-components";
import { titleFont } from "../../constants/fonts";

const Page = styled.div`
background-color: #333333;
max-width: 100vw;
min-height: 100vh;
padding-bottom: 5rem;
display: flex;
flex-direction: column;
gap: 5.3rem;

main {
  display: flex;
  justify-content: center;
  gap: 2.5rem;

  #timeline {
    width: 61rem;
    display: flex;
    flex-direction: column;
  }

  #title {
    font-size: 43px;
    color: var(--white);
    font-family: ${titleFont};
    font-weight: 700;
    margin-bottom: 4.3rem;
  }

  #noPosts {
    margin-top: 10rem;
    color: #9b9595;
    align-self: center;
  }

  #recentPosts{
    width: 100%;
    height: 6rem;
    background-color: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: var(--white);
  }

  #recentPosts:hover{
    cursor: pointer;
    filter: brightness(1.4);
  }

  & > div:nth-child(2) {
    margin-top: 10.7rem;
  }

  @media (max-width: 700px) {
    margin-top: 10%;

    #timeline{
      width: 100%;
    }

    #title{
      font-size: 33px;
      margin-inline: 1.7rem;
      margin-bottom: 2rem;
    }
  }
}
`;

export default Page;