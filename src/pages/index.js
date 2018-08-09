import React from 'react';
import Link from 'gatsby-link';
import { graphql } from 'graphql';
import Features from '../components/features';
import HowTo from '../components/how-to';

const IndexPage = ({ data }) =>
  (<div className="container">
    <h1>Early Access Alpha</h1>
    <p>
      Welcome to the future of learning improv. This early access preview gives
      you an inside look into the exciting new features coming to the site. Keep
      in mind everything is in active development and will be changing
      frequently, but don't let that stop you.
    </p>
    <p>Now go do something great.</p>
    <Link to="/activities/">Go to Activities</Link>

    <Features data={data.allDataJson.edges[0].node.features} />
    <HowTo data={data.allDataJson.edges[0].node.howTo} />
  </div>);

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allDataJson {
      edges {
        node {
          features {
            title
          }
          howTo {
            title
          }
        }
      }
    }
  }
`;
