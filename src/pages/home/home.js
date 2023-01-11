import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserInfoContext } from "../../contexts/userInfo";
import Header from "../../components/Header/Header";
import { BASE_URL } from "../../constants/urls";
import { DeleteModal } from "../../components/ModalDeletePost/ModalDeletePost";
import Page from "../../components/timeline/page";
import CreatePost from "./createPost";
import Post from "./post";
import { TrendingBox } from "../../components/TrendingBox/TrendingBox";
import Loading from "../../components/loading/loading";
import useInterval from "use-interval";
import { TfiReload } from "react-icons/tfi";

export default function Home() {
  const { header } = useContext(UserInfoContext);
  const URL = `${BASE_URL}/timeline`;
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postIdClicked, setClicked] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);
  const [loadPostsPhrase, setLoadPostsPhrase] = useState('new posts, load more!')

  useEffect(() => {
    if (recentPosts > 0 || recentPosts === null) {
      reloadPosts();
    }
  }, [posts]);

 useInterval(() => {
    verifyRecentPosts();
  }, 15000);

  function openModal(postId) {
    setIsOpen(true);
    setClicked(postId);
  }

  function verifyRecentPosts() {
    axios.get(`${URL}/${posts[0] ? posts[0].id : 0}`, header)
      .then(response => setRecentPosts(response.data.recentPosts))
      .catch(err => console.log(err.response.data.message))
  }

  async function reloadPosts() {
    setLoadPostsPhrase('Loading...');
    setRecentPosts(0.5)

    await axios.get(`${BASE_URL}/timeline`, header)
      .then((response) => {
        setPosts([...response.data.posts]);
        setLoaded(true);
        setLoadPostsPhrase('new posts, load more!');
        setRecentPosts(0);
      })
      .catch((err) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }

  return (
    <Page>
      <Header />
      <DeleteModal setIsOpen={setIsOpen} postIdClicked={postIdClicked} reloadPosts={reloadPosts} modalIsOpen={modalIsOpen} />
      <main>
        <div id="timeline">
          <h1 id="title">timeline</h1>

          <CreatePost reloadPosts={reloadPosts} />

          {!loaded ? (
            <Loading />
          ) : posts.length > 0 ? (
            recentPosts > 0 ? (
              <>
                <div id="recentPosts" onClick={reloadPosts}>
                  <p>{recentPosts === 0.5 ? '' : recentPosts} {loadPostsPhrase}</p>
                  <TfiReload />
                </div>
                {
                  posts.map((item) => (
                    <Post post={item} openModal={openModal} reloadPosts={reloadPosts} key={item.id} />
                  ))
                }
              </>
            ) : (
              posts.map((item) => (
                <Post post={item} openModal={openModal} reloadPosts={reloadPosts} key={item.id} />
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