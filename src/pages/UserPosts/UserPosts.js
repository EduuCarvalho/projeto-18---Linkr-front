import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Post from "../home/post";
import { UserInfoContext } from "../../contexts/userInfo";
import Header from "../../components/Header/Header";
import { TrendingBox } from "../../components/TrendingBox/TrendingBox";
import Loading from "../../components/loading/loading";
import { BASE_URL } from "../../constants/urls";
import { useParams } from "react-router-dom";
import { DeleteModal } from "../../components/ModalDeletePost/ModalDeletePost";
import Page from "../../components/timeline/page";
import { hashRepostsNumber } from "../../utils/repostUtils";
import UIInfiniteScroll from "../../components/infiniteScroll/infiniteScroll";
import swal from "sweetalert";
import LoadingSubtitle from "../../components/loading/loadingSubtitle";

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
  const source = axios.CancelToken.source();
  let hashReposts = {};

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
        hashReposts = { ...hashRepostsNumber(response.data.posts) };
      })
      .catch((err) => {
        console.log(err)
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [header, URL, switchReload]);

  async function fetchMore() {
    setLoaded(false);
    const ref = posts[posts.length - 1].id;

    await axios.get(`${URL}?ref=${ref}`, header, { cancelToken: source.token })
      .then((response) => {
        if (response.data !== 'limit rechead') {
          setPosts([...posts, ...response.data.posts]);
        } else {
          swal('Limite atingido');
        }
        setLoaded(true);
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
      <DeleteModal
        setIsOpen={setIsOpen}
        postIdClicked={postIdClicked}
        reloadPosts={reloadPosts}
        modalIsOpen={modalIsOpen}
      />
      <main>
        <div id="timeline">
          <h1 id="title">{`${username}'s posts`}</h1>

          {posts.map((item, index) => (
            <>
              <Post post={item} openModal={openModal} reloadPosts={reloadPosts} key={item.id} />

              {index === posts.length - 1 && (
                <UIInfiniteScroll fetchMore={fetchMore} />
              )}
            </>
          ))}

          {loaded && posts.length === 0 && <h1 id="noPosts">There are no posts yet</h1>}

          {!loaded &&
            (<>
              {posts.length > 0 ?
                (<>
                  <Loading />
                  <LoadingSubtitle />
                </>)
                :
                <Loading />
              }
            </>)
          }
        </div>

        <TrendingBox posts={posts} />
      </main>
    </Page>
  );
}
