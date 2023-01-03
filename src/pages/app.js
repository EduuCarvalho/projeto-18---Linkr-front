import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../global/globalStyle";
import { UserProvider } from "../global/userContext";
import Home from "./home/home"; // A pagina "/" é a rota signIn
import SignIn from "../components/Login/SignInPage/Sign-in.js";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn/>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}