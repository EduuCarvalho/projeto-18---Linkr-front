import { useState } from "react";
import {
  HeaderStyle,
  ProfileStyle,
} from "./HeaderStyles";
import SearchBar from "../SearchBar/SearchBar";

const user_test = {
  picture_url:
    "https://guiaanimal.net/uploads/content/image/59550/Design_sem_nome__38_.png",
};

export default function Header() {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <HeaderStyle>
      <h1>linkr</h1>
      <SearchBar />
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
