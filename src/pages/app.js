import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../global/globalStyle";
import { UserProvider } from "../global/userContext";
/* import Home from "./home/home"; // A pagina "/" é a rota signIn */
import SignIn from "./Login/Sign-in.js"
import SignUp from "./Login/sign-up.js"
import UserInfoProvider from "../contexts/userInfo";
import Home from "./home/home";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <UserInfoProvider>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </UserInfoProvider>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}