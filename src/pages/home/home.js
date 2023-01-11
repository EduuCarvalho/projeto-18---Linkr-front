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
import UIInfiniteScroll from "../../components/infiniteScroll/infiniteScroll";

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
  const [loadPostsPhrase, setLoadPostsPhrase] = useState('new posts, load more!');
  let source = axios.CancelToken.source();

  useEffect(() => {
    if (recentPosts > 0 || recentPosts === null) {
      reloadPosts(false);
    }
  }, []);

  useInterval(() => {
    verifyRecentPosts();
  }, 15000);

  function openModal(postId) {
    setIsOpen(true);
    setClicked(postId);
  }

  function verifyRecentPosts() {
    let mostRecentPost = 0;

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id > mostRecentPost) {
        mostRecentPost = posts[i].id;
      }
    }

    axios.get(`${URL}/${posts[0] ? mostRecentPost : 0}`, header)
      .then(response => setRecentPosts(response.data.recentPosts))
      .catch(err => console.log(err.response.data.mesage))
  }

  async function reloadPosts(recentPosts = true) {
    setLoadPostsPhrase('Loading...');
    if (recentPosts) setRecentPosts(0.5);

    await axios.get(URL, header, {
      cancelToken: source.token
    })
      .then((response) => {
        setPosts([...response.data.posts]);
        setUserName(response.data.username);
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

  async function fetchMore() {
    console.log("calma...");
    const ref = posts[posts.length - 1].id;

    await axios.get(`${URL}?ref=${ref}`, header, { cancelToken: source.token })
      .then((response) => {
        setPosts([...posts, ...response.data.posts]);
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
          <h1 id="title">{isMyPage ? "timeline" : `${username}'s posts`}</h1>

          {isMyPage && <CreatePost reloadPosts={reloadPosts} />}

          {!loaded ? (
            <Loading />
          ) : posts.length > 0 ? (
            <>
              {recentPosts > 0 && (
                <div id="recentPosts" onClick={reloadPosts}>
                  <p>{recentPosts === 0.5 ? '' : recentPosts} {loadPostsPhrase}</p>
                  <TfiReload />
                </div>
              )}

              {posts.map((item) => (
                <Post postId={item.id} ownerId={item.ownerId} userName={item.name} userImg={item.picture_url} description={item.description} linkTitle={item.linkTitle} linkDescription={item.linkDescription} linkImg={item.linkImg} link={item.url} likes={item.likes} openModal={openModal} reloadPosts={reloadPosts} key={item.id} />
              ))}

              <UIInfiniteScroll fetchMore={fetchMore} />
            </>
          ) : (
            <h1 id="noPosts">There are no posts yet</h1>
          )}
        </div>

        <TrendingBox posts={posts} />
      </main>
    </Page>
  );
}