import { BASE_URL } from "../../constants/urls.js";
import { titleFont } from "../../constants/fonts";

import { UserInfoContext } from "../../contexts/userInfo";

import Header from "../../components/Header/Header";
import Loading from "../../components/loading/loading";
import { DeleteModal } from "../../components/ModalDeletePost/ModalDeletePost";
import { TrendingBox } from "../../components/TrendingBox/TrendingBox";

import Post from "../home/post";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import LoadingSubtitle from "../../components/loading/loadingSubtitle.js";
import UIInfiniteScroll from "../../components/infiniteScroll/infiniteScroll.js";
import swal from "sweetalert";

export default function HashtagPage() {
    const { header } = useContext(UserInfoContext);
    const { hashtag } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [postIdClicked, setClicked] = useState(null);
    const [posts, setPosts] = useState([]);
    const [switchReload, setReload] = useState(false);
    const source = axios.CancelToken.source();

    function openModal(postId) {
        setIsOpen(true);
        setClicked(postId);
    }

    function reloadPosts() {
        setReload(!switchReload);
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/hashtag/${hashtag}`, header)
            .then(response => {
                setPosts([...response.data.posts]);
                setLoaded(true);
            })
            .catch(err => {
                alert('An error occured while trying to fetch the posts, please refresh the page');
                console.log(err.response.data.message);
            });
    }, [header, hashtag, switchReload]);

    async function fetchMore() {
        setLoaded(false);
        const ref = posts[posts.length - 1].id;

        await axios.get(`${BASE_URL}/hashtag/${hashtag}?ref=${ref}`, header, { cancelToken: source.token })
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
        <HashtagPageContainer>
            <Header />

            <DeleteModal
                setIsOpen={setIsOpen}
                postIdClicked={postIdClicked}
                reloadPosts={reloadPosts}
                modalIsOpen={modalIsOpen}
            />

            <main>
                <div id="hashtag">
                    <h1 id="title"># {hashtag.toLowerCase()}</h1>

                    {posts.map((item, index) => (
                        <>
                            <Post post={item} openModal={openModal} reloadPosts={reloadPosts} key={item.id} />

                            {index === posts.length - 1 && (
                                <UIInfiniteScroll fetchMore={fetchMore} />
                            )}
                        </>
                    ))}

                    {loaded && posts.length === 0 && <h1 id="noPosts">There are no posts for this '#' yet</h1>}

                    {!loaded &&
                        (<>
                            <Loading />
                            {posts.length > 0 && <LoadingSubtitle />}
                        </>)
                    }

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
        
        @media (max-width: 700px) {
            margin-top: 10%;
        
            #timeline{
              width: 100%;
            }
        
            #title{
              font-size: 33px;
              margin-inline: 1.7rem;
              margin-bottom: 2rem;
            }
        }
    }
`;
