import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Post from "../home/post";
import { UserInfoContext } from "../../contexts/userInfo";
import Header from "../../components/Header/Header";
import { TrendingBox } from "../../components/TrendingBox/TrendingBox";
import Loading from "../../components/loading/loading";
import { BASE_URL } from "../../constants/urls";
import { useParams } from "react-router-dom";
import { ActionModal } from "../../components/ActionModalPost/ActionModalPost";
import Page from "../../components/timeline/page";
import UIInfiniteScroll from "../../components/infiniteScroll/infiniteScroll";
import swal from "sweetalert";
import LoadingSubtitle from "../../components/loading/loadingSubtitle";
import { fetchMore } from "../../components/timeline/functions";
import { FollowButtonStyle } from "../../components/posts/posts";

export default function UserPosts() {
  const { header } = useContext(UserInfoContext);
  const { id } = useParams();
  const URL = `${BASE_URL}/users/${id}`
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postIdClicked, setClicked] = useState(null);
  const [switchReload, setReload] = useState(false);
  const [username, setUserName] = useState(undefined);
  const [hashReposts, setHashReposts] = useState({});
  const source = axios.CancelToken.source();

  function openModal(postId, modalType) {
    setIsOpen(modalType);
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
        setHashReposts({...response.data.sharesHash});
        setUserName(response.data.username);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err)
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [header, URL, switchReload]);

  async function callFetchMore(){
    fetchMore(setLoaded, posts, setPosts, URL, header, source);
  }

  return (
    <Page>
      <Header />
      <FollowButtonStyle>Follow</FollowButtonStyle>
      <ActionModal setIsOpen={setIsOpen} postIdClicked={postIdClicked} reloadPosts={reloadPosts} modalIsOpen={modalIsOpen} />
      <main>
        <div id="timeline">
          <h1 id="title">{`${username}'s posts`}</h1>

          {posts.map((item, index) => (
            <>
              <Post post={item} shares={hashReposts[item.id] ?? 0} openModal={openModal} reloadPosts={reloadPosts} key={item.id} />

              {index === posts.length - 1 && (
                <UIInfiniteScroll fetchMore={callFetchMore} />
              )}
            </>
          ))}

          {loaded && posts.length === 0 && <h1 id="noPosts">There are no posts yet</h1>}

          {!loaded &&
            (<>
              <Loading />
              {posts.length > 0 && <LoadingSubtitle />}
            </>)
          }
        </div>

        <TrendingBox posts={posts} />
      </main>
    </Page>
  );
}
