import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../global/globalStyle";
import { UserProvider } from "../global/userContext";
/* import Home from "./home/home"; // A pagina "/" é a rota signIn */
import SignIn from "../components/Login/Sign-in.js";
import SignUp from "../components/Login/sign-up.js";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/sign-up" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}