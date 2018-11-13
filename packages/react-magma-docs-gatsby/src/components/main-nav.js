import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { Router } from '@reach/router'
import styled from 'styled-components'

import { convertTextToId } from '../utils'

const StyledNav = styled.nav`
  grid-area: nav;
`

const SubMenu = ({ headings }) => (
  <ul className="submenu">
    {headings.map((heading, index) => (
      <li key={index}>
        <a href={`#${convertTextToId(heading.value)}`}>{heading.value}</a>
      </li>
    ))}
  </ul>
)

const MainNav = () => (
  <StaticQuery
    query={graphql`
      fragment navFields on MdxEdge {
        node {
          frontmatter {
            title
          }
          fileAbsolutePath
          fields {
            slug
          }
          headings(depth: h2) {
            depth
            value
          }
        }
      }
      query NavQuery {
        designDocs: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/design/**" } }
          sort: { order: ASC, fields: frontmatter___order }
        ) {
          edges {
            ...navFields
          }
        }
        apiDocs: allMdx(
          filter: { fileAbsolutePath: { glob: "**/src/pages/api/**" } }
          sort: { order: ASC, fields: frontmatter___order }
        ) {
          edges {
            ...navFields
          }
        }
      }
    `}
    render={data => (
      <StyledNav>
        <h1>Components</h1>
        <ul>
          {data.apiDocs.edges.map(({ node }) => (
            <li key={node.fields.slug}>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              <Router>
                <SubMenu path={node.fields.slug} headings={node.headings} />
              </Router>
            </li>
          ))}
        </ul>
        <h1>Design Guidelines</h1>
        <ul>
          {data.designDocs.edges.map(({ node }) => (
            <li key={node.fields.slug}>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </StyledNav>
    )}
  />
)

export default MainNav
