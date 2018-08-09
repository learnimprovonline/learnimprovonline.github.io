import React from 'react';
import Link from 'gatsby-link';
import { graphql } from 'graphql';

const ActivitesPage = props => (
  <div className="container">
    <h1>Activities</h1>
    <p>
      Learn improv warm-ups and exercises through a variety of written
      descriptions, animated instructionals, and video examples. Empowering you
      and your team the ability to take yourself to the next level.
    </p>
    <Link to="/focus/">Focus</Link>
    <hr />
    <ul>
      {props.data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.frontmatter.title}>
          <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default ActivitesPage;

export const query = graphql`
  query ActivityList {
    allMarkdownRemark(
      sort: { fields: [frontmatter___title], order: ASC}
    ) {
      edges {
        node {
          frontmatter {
            title
            type
            foci
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
