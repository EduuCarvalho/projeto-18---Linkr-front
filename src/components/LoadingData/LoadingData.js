import styled from "styled-components";
import { RotatingLines } from "react-loader-spinner";

export default function LoadingData() {
  return (
    <SearchingStyle>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </SearchingStyle>
  );
}

const SearchingStyle = styled.main`
  margin: 13.31vh 4.5vw;
  height: 73.38vh;
  display: flex;
  justify-content: center;
  margin-top: 30vh;
`;
