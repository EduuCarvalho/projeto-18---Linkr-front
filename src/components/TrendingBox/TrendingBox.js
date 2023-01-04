import { mainFont, titleFont } from "../../constants/fonts.js";

import styled from "styled-components";

export default function TrendingBox() {
    return (
        <TrendingBoxContainer>
            <TrendingBoxTitle>
                trending
            </TrendingBoxTitle>

            <TrendingBoxLine />
            
            <TrendingBoxList>
                # javascript <br />
                # react <br />
                # react-native <br />
                # material <br />
                # web-dev <br />
                # mobile <br />
                # css <br />
                # html <br />
                # node <br />
                # sql
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
