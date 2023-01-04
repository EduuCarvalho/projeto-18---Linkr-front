import { mainFont, titleFont } from "../../constants/fonts.js";
import { BASE_URL } from "../../constants/urls.js";

import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function TrendingBox() {
    const [trending, setTrending] = useState(undefined);

    function handleTrending() {
        if (!trending) {
            return "Loading...";
        } else if (trending.length === 0) {
            return "there aren't any trending topics yet";
        } else {
            return (
                <ul>
                    {trending.map(
                        (hashtag, index) => <li key={index}>{hashtag.lower}</li>
                    )}
                </ul>
            );
        }
    }

    useEffect(() => {
        // TODO: get token/config by provider

        const config = {
            headers: {
                "Authorization": `Bearer 1`
            }
        };
        
        axios
            .get(`${BASE_URL}/trending`, config)
            .then(
                res => setTrending(res.data)
            )
            .catch(
                err => {
                    console.error(
                        err.response.data.message || err.response.data
                    );
                }
            );
    }, []);

    return (
        <TrendingBoxContainer>
            <TrendingBoxTitle>
                trending
            </TrendingBoxTitle>

            <TrendingBoxLine />
            
            <TrendingBoxList>
                {handleTrending()}
            </TrendingBoxList>
        </TrendingBoxContainer>
    );
}

const TrendingBoxContainer = styled.div`
    color: #ffffff;
`;

const TrendingBoxLine = styled.div`
    background-color: #484848;
    height: 1px;
    width: 300px;
`;

const TrendingBoxList = styled.div`
    align-items: center;
    background-color: #171717;
    border-radius: 0 0 16px 16px;
    display: flex;
    font-family: ${mainFont};
    font-size: 19px;
    font-weight: 700;
    height: 345px;
    letter-spacing: 0.05em;
    line-height: 30px;
    padding-left: 15px;
    width: 300px;

    ul {
        list-style: none;
        margin-left: 0;
        padding-left: 0;
    }
      
    li {
        padding-left: 1em;
        text-indent: -1em;
    }
      
    li:before {
        content: "#";
        padding-right: 5px;
    }
`;

const TrendingBoxTitle = styled.div`
    align-items: center;
    background-color: #171717;
    border-radius: 16px 16px 0 0;
    display: flex;
    font-family: ${titleFont};
    font-size: 27px;
    height: 60px;
    padding-left: 15px;
    width: 300px;
`;
