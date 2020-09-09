import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { ThemeContext } from 'react-magma-dom'

const StyledHeading = styled.h2`
  && {
    color: inherit;
    font-family: ${props => props.theme.bodyFont};
    font-size: ${props => (props.isCta ? '2em' : '2.4em')};
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    margin-top: -200px;
    padding-top: 220px;

    &:focus {
      border-bottom: 2px dotted ${props => props.theme.colors.neutral08};
    }

    @media (min-width: ${props => props.theme.breakpoints.small}) {
      text-align: ${props => (props.isCta ? 'center' : 'left')};
    }
  }
`

const HeadingNum = styled.span`
  display: block;
  font-family: 'Abel', sans-serif;
  font-weight: normal;
  font-size: 17px;
  margin-bottom: 15px;
`

const IntroHeading = ({ id, isCta, name, number }) => (
  <ThemeContext.Consumer>
    {theme => (
      <StyledHeading id={id} isCta={isCta} tabIndex={-1} theme={theme}>
        {number && <HeadingNum>{number}</HeadingNum>}
        {name}
      </StyledHeading>
    )}
  </ThemeContext.Consumer>
)

IntroHeading.propTypes = {
  isCta: PropTypes.bool,
  name: PropTypes.string.isRequired,
  number: PropTypes.string,
}

export default IntroHeading
