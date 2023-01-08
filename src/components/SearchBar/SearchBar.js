import axios from "axios";
import { useState, useContext } from "react";
import { DebounceInput } from "react-debounce-input";
import { BASE_URL } from "../../constants/urls";
import { FormStyle, ResultSearchDiv } from "../SearchBar/SearchBarStyles";
import { UserInfoContext } from "../../contexts/userInfo";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchName, setSearchName] = useState(null);
  const [usersSearch, setUsersSearch] = useState(null);
  const { header } = useContext(UserInfoContext);
  const navigate = useNavigate();
  function handleForm(e) {
    setSearchName(e.target.value);
    axios
      .get(`${BASE_URL}users?name=${e.target.value}`, header)
      .then((res) => {
        setUsersSearch(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  function submitSearch(e) {
    e.preventDefault();
  }
  return (
    <FormStyle onSubmit={submitSearch}>
      <DebounceInput
        minLength={3}
        debounceTimeout={300}
        placeholder="Search for people"
        onChange={handleForm}
      />
      <button type="submit">
        <ion-icon name="search-outline"></ion-icon>
      </button>
      <ResultSearchDiv
        visible={searchName !== "" && searchName !== null ? "true" : "false"}
      >
        {usersSearch?.map((user) => (
          <div
            key={user.id}
            onClick={() => {
              navigate(`/users/${user.id}`);
              setSearchName("");
            }}
          >
            <img src={user.picture_url} alt="avatar" />
            <p>{user.name}</p>
          </div>
        ))}
      </ResultSearchDiv>
    </FormStyle>
  );
}
