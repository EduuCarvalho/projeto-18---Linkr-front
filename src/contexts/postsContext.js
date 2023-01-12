import axios from "axios";
import React, { createContext, useState } from "react";
import { BASE_URL } from "../constants/urls";

export const postsContext = createContext({});

function PostsProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [recentPosts, setRecentPosts] = useState(null);
    const [loadPostsPhrase, setLoadPostsPhrase] = useState('new posts, load more!');
    const [hashReposts, setHashReposts] = useState({});
    const source = axios.CancelToken.source();
    const URL = `${BASE_URL}/timeline`;

    return (
        <postsContext.Provider value={{ posts, setPosts, loaded, setLoaded, recentPosts, setRecentPosts, loadPostsPhrase, setLoadPostsPhrase, URL, source, hashReposts, setHashReposts }}>
            {children}
        </postsContext.Provider>
    );

}

export default PostsProvider;