import React from 'react'
import styled from 'styled-components'

function LoadingSubtitle() {
    return (
        <Text>
            <p>
                Loading more posts...
            </p>
        </Text>
    )
}

const Text = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #6D6D6D;
    font-size: 22px;
`;

export default LoadingSubtitle
