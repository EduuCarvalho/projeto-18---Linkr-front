import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserInfoContext } from "../../contexts/userInfo";
import Header from "../../components/Header/Header";
import { BASE_URL } from "../../constants/urls";
import { useParams } from "react-router-dom";
import { DeleteModal } from "../../components/ModalDeletePost/ModalDeletePost";
import Page from "../../components/timeline/page";
import CreatePost from "./createPost";
import Post from "./post";
import { TrendingBox } from "../../components/TrendingBox/TrendingBox";
import Loading from "../../components/loading/loading";
import useInterval from "use-interval";
import { TfiReload } from "react-icons/tfi";

export default function Home({ isMyPage }) {
  const { header } = useContext(UserInfoContext);
  const { id } = useParams();
  const URL = isMyPage ? `${BASE_URL}/timeline` : `${BASE_URL}/users/${id}`;
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postIdClicked, setClicked] = useState(null);
  const [username, setUserName] = useState(undefined);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect((update) => {
    if (recentPosts > 0 || recentPosts === null || update) {
      reloadPosts();
    }
  }, [header, URL, posts]);

  useInterval(() => {
    verifyRecentPosts();
  }, 15000);

  function openModal(postId) {
    setIsOpen(true);
    setClicked(postId);
  }

  function verifyRecentPosts(){
    axios.get(`${URL}/${posts[0] ? posts[0].id : 0}`, header)
      .then(response => setRecentPosts(response.data.recentPosts))
      .catch(err => console.log(err.response.data.mesage))
  }

  function reloadPosts() {
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

      verifyRecentPosts();
  }

  return (
    <Page>
      <Header />
      <DeleteModal setIsOpen={setIsOpen} postIdClicked={postIdClicked} reloadPosts={reloadPosts} modalIsOpen={modalIsOpen} />
      <main>
        <div id="timeline">
          <h1 id="title">{isMyPage ? "timeline" : `${username}'s posts`}</h1>

          {isMyPage && <CreatePost setPosts={setPosts} />}

          {!loaded ? (
            <Loading />
          ) : posts.length > 0 ? (
            recentPosts > 0 ? (
              <>
                <div id="recentPosts" onClick={reloadPosts}>
                  <p>{recentPosts} new posts, load more!</p>
                  <TfiReload />
                </div>
                {
                  posts.map((item) => (
                    <Post postId={item.id} ownerId={item.ownerId} userName={item.name} userImg={item.picture_url} description={item.description} linkTitle={item.linkTitle} linkDescription={item.linkDescription} linkImg={item.linkImg} link={item.url} likes={item.likes} openModal={openModal} reloadPosts={reloadPosts} key={item.id} />
                  ))
                }
              </>
            ) : (
              posts.map((item) => (
                <Post postId={item.id} ownerId={item.ownerId} userName={item.name} userImg={item.picture_url} description={item.description} linkTitle={item.linkTitle} linkDescription={item.linkDescription} linkImg={item.linkImg} link={item.url} likes={item.likes} openModal={openModal} reloadPosts={reloadPosts} key={item.id} />
              ))
            )
          ) : (
            <h1 id="noPosts">There are no posts yet</h1>
          )}
        </div>

        <TrendingBox posts={posts} />
      </main>
    </Page>
  );
}