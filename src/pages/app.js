import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../global/globalStyle";
import SignIn from "../components/Login/Sign-in.js";
import SignUp from "../components/Login/sign-up.js";
import UserInfoProvider from "../contexts/userInfo";
import Home from "./home/home";
import HashtagPage from "./HashtagPage/HashtagPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
        <BrowserRouter>
          <UserInfoProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Routes>
          </UserInfoProvider>
        </BrowserRouter>
    </>
  );
}