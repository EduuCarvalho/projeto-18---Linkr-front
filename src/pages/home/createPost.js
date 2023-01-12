import axios from "axios";
import { useContext, useState } from "react";
import CreatePostBox from "../../components/posts/createPost";
import { reloadPosts } from "../../components/timeline/functions";
import { postsContext } from "../../contexts/postsContext";
import { UserInfoContext } from "../../contexts/userInfo";

export default function CreatePost() {
    const {userInfo, header} = useContext(UserInfoContext);
    const {setLoadPostsPhrase, setRecentPosts, setPosts, setLoaded,  URL, source} = useContext(postsContext);
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    function sendPost(e) {
        e.preventDefault();
        const userData = { url: link, description };
        
        if (link.substr(0, 8) === 'https://' || link.substr(0, 7) === 'http://') {
            setLoading(true)
            axios.post(URL, userData, header)
                .then(response => {
                    setLoading(false);
                    setDescription('');
                    setLink('');
                    reloadPosts(false, setLoadPostsPhrase, setRecentPosts, setPosts, setLoaded,  URL, header, source);
                })
                .catch(err => {
                    setLoading(false);
                    alert('Houve um erro ao publicar seu link');
                    console.log(err);
                })
        } else {
            alert('Formato de link inválido');
        }
    }

    return (
        <CreatePostBox>
            <div>
                <div id="userImage">
                    <img src={userInfo.picture_url} alt='userImage' />
                </div>
            </div>
            <div id="postInformations">
                <h3>What are you going to share today?</h3>

                <input placeholder="http://..." value={link} onChange={(e) => setLink(e.target.value)} disabled={!loading ? null : 'disabled'} />
                <textarea placeholder="Awesome article about #javascript" value={description} onChange={(e) => setDescription(e.target.value)} disabled={!loading ? null : 'disabled'} />

                <button onClick={sendPost} disabled={!loading ? null : 'disabled'} >{!loading ? 'Publish' : 'Publishing...'}</button>
            </div>
        </CreatePostBox>
    );
}