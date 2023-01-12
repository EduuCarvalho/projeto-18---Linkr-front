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