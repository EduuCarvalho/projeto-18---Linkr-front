import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../global/globalStyle";
/* import { UserProvider } from "../global/userContext"; */
/* import Home from "./home/home"; // A pagina "/" é a rota signIn */
import SignIn from "./Login/Sign-in.js"
import SignUp from "./Login/sign-up.js"
import UserInfoProvider from "../contexts/userInfo";
import Home from "./home/home";
import HashtagPage from "./HashtagPage/HashtagPage";
import UserPosts from "./UserPosts/UserPosts";
import PostsProvider from "../contexts/postsContext";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <UserInfoProvider>
          <PostsProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
              <Route path="/users/:id" element={<UserPosts />} />
            </Routes>
          </PostsProvider>
        </UserInfoProvider>
      </BrowserRouter>
    </>
  );
}