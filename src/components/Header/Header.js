import { useState, useContext } from "react";
import {
  HeaderStyle,
  ProfileStyle,
} from "./HeaderStyles";
import SearchBar from "../SearchBar/SearchBar";
import { UserInfoContext } from "../../contexts/userInfo";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  const navigate = useNavigate();

  function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("picture_url ");
    localStorage.removeItem("user_id");
    navigate("/");
    window.location.reload();
  }

  function logoClick() {
    navigate("/home");
    window.location.reload();
  }

  return (
    <HeaderStyle>
      <h1 onClick={logoClick}>linkr</h1>
      <SearchBar />
      <ProfileStyle>
        <ion-icon
          name="chevron-down-outline"
          onClick={() => setShowLogout(!showLogout)}
        ></ion-icon>
        <img src={userInfo.picture_url} alt="avatar" />
        {showLogout && <div onClick={logout}>Logout</div>}
      </ProfileStyle>
    </HeaderStyle>
  );
}
