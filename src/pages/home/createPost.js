import axios from "axios";
import { useContext, useState } from "react";
import CreatePostBox from "../../components/posts/createPost";
import { UserInfoContext } from "../../contexts/userInfo";

export default function CreatePost({setPosts}) {
    const URL = "http://localhost:4000/timeline";
    const {userImage, header} = useContext(UserInfoContext);
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
                    reload();
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

    function reload(){
        axios.get(URL, header)
            .then(response => setPosts([...response.data]))
            .catch(err => console.log(err.response.data.message));
    }

    return (
        <CreatePostBox>
            <div>
                <div id="userImage">
                    <img src={userImage} alt='userImage' />
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