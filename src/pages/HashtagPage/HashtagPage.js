import { BASE_URL } from "../../constants/urls.js";
import { titleFont } from "../../constants/fonts";

import { UserInfoContext } from "../../contexts/userInfo";

import Header from "../../components/Header/Header";
import Loading from "../../components/loading/loading";
import TrendingBox from "../../components/TrendingBox/TrendingBox";

import Post from "../home/post";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export default function HashtagPage() {
    const { config } = useContext(UserInfoContext);
    const { hashtag } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}hashtag/${hashtag}`, config)
            .then(response => {
                setPosts([...response.data]);
                setLoaded(true);
            })
            .catch(err => {
                alert('An error occured while trying to fetch the posts, please refresh the page');
                console.log(err.response.data.message);
            });
    }, [hashtag]);

    return (
        <HashtagPageContainer>
            <Header />

            <main>
                <div id="timeline">
                    <h1 id="title"># {hashtag}</h1>

                    {!loaded ? (
                        <Loading />
                    ) : (
                        posts.length > 0 ? (
                            posts.map((item) => (
                                <Post postId={item.id} userName={item.name} userImg={item.picture_url} description={item.description} linkTitle={item.linkTitle} linkDescription={item.linkDescription} linkImg={item.linkImg} link={item.url} likes={item.likes} />
                            ))
                        ) : (
                            <h1 id="noPosts">There are no posts yet</h1>
                        )
                    )}

                </div>

                <TrendingBox posts={posts} />
            </main>

        </HashtagPageContainer>
    );
}

const HashtagPageContainer = styled.div`
    background-color: #333333;
    max-width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;
    padding-bottom: 5rem;
    display: flex;
    flex-direction: column;
    gap: 5.3rem;

    main{
        display: flex;
        justify-content: center;
        gap: 2.5rem;

        #timeline{
            width: 61rem;
            display: flex;
            flex-direction: column;
        }
        
        #title{
            font-size: 43px;
            color: var(--white);
            font-family: ${titleFont};
            font-weight: 700;
            margin-bottom: 4.3rem;
        }

        #noPosts{
            margin-top: 10rem;
            color: #9B9595;
            align-self: center;
        }

        & > div:nth-child(2){
            margin-top: 10.7rem;
        }
    }
`;
