import { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { titleFont } from "../../constants/fonts";
import CreatePost from "./createPost";
import Post from "./post";
import { UserInfoContext } from "../../contexts/userInfo";
import Header from "../../components/Header/Header";
import { TrendingBox } from "../../components/TrendingBox/TrendingBox";
import Loading from "../../components/loading/loading";
import { BASE_URL } from "../../constants/urls";
import { useParams } from "react-router-dom";
import { DeleteModal } from "../../components/ModalDeletePost/ModalDeletePost";

export default function Home({ isMyPage }) {
  const { header } = useContext(UserInfoContext);
  const { id } = useParams();
  const URL = isMyPage ? `${BASE_URL}timeline` : `${BASE_URL}users/${id}`;
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postIdClicked, setClicked] = useState(null);
  const [switchReload, setReload] = useState(false);
  const [username, setUserName] = useState(undefined);

  function openModal(postId) {
    setIsOpen(true);
    setClicked(postId);
  }

  function reloadPosts() {
    setReload(!switchReload);
  }

  useEffect(() => {
    axios
      .get(URL, header)
      .then((response) => {
        setPosts([...response.data.posts]);
        setUserName(response.data.username);
        setLoaded(true);
      })
      .catch((err) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [header, URL, switchReload]);

  return (
    <Page>
      <Header />
      <DeleteModal
        setIsOpen={setIsOpen}
        postIdClicked={postIdClicked}
        reloadPosts={reloadPosts}
        modalIsOpen={modalIsOpen}
      />
      <main>
        <div id="timeline">
          <h1 id="title">{isMyPage ? "timeline" : `${username}'s posts`}</h1>

          {isMyPage && <CreatePost setPosts={setPosts} />}

          {!loaded ? (
            <Loading />
          ) : posts.length > 0 ? (
            posts.map((item) => (
              <Post
                postId={item.id}
                userName={item.name}
                userImg={item.picture_url}
                description={item.description}
                linkTitle={item.linkTitle}
                linkDescription={item.linkDescription}
                linkImg={item.linkImg}
                link={item.url}
                likes={item.likes}
                openModal={openModal}
                reloadPosts={reloadPosts}
              />
            ))
          ) : (
            <h1 id="noPosts">There are no posts yet</h1>
          )}
        </div>

        <TrendingBox posts={posts} />
      </main>
    </Page>
  );
}

const Page = styled.div`
  background-color: #333333;
  max-width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 5.3rem;

  main {
    display: flex;
    justify-content: center;
    gap: 2.5rem;

    #timeline {
      width: 61rem;
      display: flex;
      flex-direction: column;
    }

    #title {
      font-size: 43px;
      color: var(--white);
      font-family: ${titleFont};
      font-weight: 700;
      margin-bottom: 4.3rem;
    }

    #noPosts {
      margin-top: 10rem;
      color: #9b9595;
      align-self: center;
    }

    & > div:nth-child(2) {
      margin-top: 10.7rem;
    }
  }
`;
