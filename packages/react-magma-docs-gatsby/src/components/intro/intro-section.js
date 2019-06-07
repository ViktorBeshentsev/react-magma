import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import ScrollAnimation from 'react-animate-on-scroll';
import { ThemeContext } from 'react-magma-dom';

export const StyledSection = styled.section`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: auto;
    max-width: 1335px;
    margin: 0 auto;
    padding: 80px 5%;

    @media (min-width: ${props => props.theme.sizeXs}) {
        flex-direction: row;
        height: 100vh;
        padding: 0 10%;
    }
`;

const ImgContainer = styled(ScrollAnimation)`
    flex-shrink: 0;
    width: 100%;

    @media (min-width: ${props => props.theme.sizeXs}) {
        margin-right: 30px;
        width: 30%;
    }
`;

const IntroSection = ({ children, id, image, afterAnimatedIn }) => (
    <ThemeContext.Consumer>
        {theme => (
            <StyledSection id={id} theme={theme}>
                { image && 
                    <ImgContainer
                        afterAnimatedIn={(v) => {afterAnimatedIn(id, v)}}
                        animateIn="fadeInLeft"
                        duration={1.2}
                        theme={theme}>
                        {image}
                    </ImgContainer>
                }
                <div>
                    {children}
                </div>
            </StyledSection>
        )}
    </ThemeContext.Consumer>
);

IntroSection.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.node,
    afterAnimatedIn: PropTypes.func.isRequired
}

export default IntroSection

