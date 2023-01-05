import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";
import {
  FormStyle,
  HeaderStyle,
  ProfileStyle,
  ResultSearchDiv,
} from "./headerStyles";

const user_test = {
  picture_url:
    "https://guiaanimal.net/uploads/content/image/59550/Design_sem_nome__38_.png",
};

export default function Header() {
  const [searchName, setSearchName] = useState(null);
  const [usersSearch, setUsersSearch] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  function handleForm(e) {
    setSearchName(e.target.value);
    axios
      .get(`${BASE_URL}users?name=${e.target.value}`)
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
    <HeaderStyle>
      <h1>linkr</h1>
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
            <div key={user.id}>
              <img src={user.picture_url} alt="avatar" />
              <p>{user.name}</p>
            </div>
          ))}
        </ResultSearchDiv>
      </FormStyle>
      <ProfileStyle>
        <ion-icon
          name="chevron-down-outline"
          onClick={() => setShowLogout(!showLogout)}
        ></ion-icon>
        <img src={user_test.picture_url} alt="avatar" />
        {showLogout && <div>Logout</div>}
      </ProfileStyle>
    </HeaderStyle>
  );
}
