import { useState } from "react";
import styled from "styled-components";
import { logoFont, mainFont } from "../../constants/fonts";

export default function Header() {
  const [searchName, setSearchName] = useState(null);
  function submitSearch(e) {
    e.preventDefault();
  }
  return (
    <HeaderStyle>
      <h1>linkr</h1>
      <FormStyle onSubmit={submitSearch}>
        <InputStyle
          placeholder="Search for people"
          onChange={(e) => setSearchName(e.target.value.toLowerCase())}
          value={searchName}
        />
        <button type="submit">
          <ion-icon name="search-outline"></ion-icon>
        </button>
      </FormStyle>
      <div>
        <ion-icon name="chevron-down-outline"></ion-icon>
        <p>Imagem</p>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
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
  }
  div {
    color: #ffffff;
    width: 6.26vw;
    height: 3.68vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ion-icon {
      width: 1.28vw;
      height: 0.86vw;
    }
  }
`;

const FormStyle = styled.form`
  position: relative;
  button {
    width: 2.36vw;
    height: 2.36vw;
    position: absolute;
    top: 0.39vw;
    right: 0.52vw;
    border: none;
    background-color: #ffffff;
  }
  ion-icon {
    width: 1.46vw;
    height: 1.46vw;
    color: #c6c6c6;
  }
`;

const InputStyle = styled.input`
  width: 39.1vw;
  height: 3.13vw;
  border: none;
  border-radius: 0.56vw;
  padding-left: 0.97vw;
  ::placeholder {
    color: #c6c6c6;
    opacity: 1;
    font-size: 1.32vw;
    font-family: ${mainFont};
  }
`;
