import axios from "axios";
import swal from "sweetalert";

export async function fetchMore(setLoaded, posts, setPosts, URL, header, source) {
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

export function verifyRecentPosts(loaded, posts, setRecentPosts, URL, header, source) {
  if (loaded) {
    let mostRecentPost = 0;

    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id > mostRecentPost) {
        mostRecentPost = posts[i].id;
      }
    }

    axios.get(`${URL}/${posts[0] ? mostRecentPost : 0}`, header, { cancelToken: source.token })
      .then(response => setRecentPosts(response.data.recentPosts))
      .catch(err => console.log(err.response.data.message))
  }
}

export async function reloadPosts(recentPosts = false, setLoadPostsPhrase, setRecentPosts, setPosts, setLoaded,  URL, header, source, setHashReposts) {
  setLoadPostsPhrase('Loading...');
  if (recentPosts) setRecentPosts(0.5);

  await axios.get(URL, header, { cancelToken: source.token })
    .then((response) => {
      setPosts([...response.data.posts]);
      setHashReposts({...response.data.sharesHash});
      setLoaded(true);
      setLoadPostsPhrase('new posts, load more!');
      setRecentPosts(0);
    })
    .catch((err) => {
      swal("An error occured while trying to fetch the posts, please refresh the page");
    });
}