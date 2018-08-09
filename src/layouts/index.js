import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from '../components/header';
import Footer from '../components/footer';
import { graphql } from 'graphql';

import '../../sass/style.scss';

const TemplateWrapper = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: data.site.siteMetadata.description },
        { name: 'keywords', content: data.site.siteMetadata.keywords },
      ]}
    />
    <Header>{data.site.siteMetadata.title}</Header>
    {children()}
    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
  data: PropTypes.object,
};

export default TemplateWrapper;

export const query = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
        description
        keywords
      }
    }
  }
`;
