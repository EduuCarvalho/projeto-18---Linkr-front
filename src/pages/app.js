import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../global/globalStyle";
import { UserProvider } from "../global/userContext";
import Home from "./home/home";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home page='/' />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}