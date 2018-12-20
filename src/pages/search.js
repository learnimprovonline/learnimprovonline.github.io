import React from 'react';
import Link from 'gatsby-link';
// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap';
import { Index } from 'elasticlunr';
import { graphql } from 'graphql';

export const searchQuery = graphql`
  query ActivitySearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`;

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.index = Index.load(props.data.siteSearchIndex.index);
    this.state = {
      results: [],
      searchTerm: props.searchTerm,
    };
  }

  componentWillMount() {
    const event = { target: { value: this.state.searchTerm } };
    this.search(event);
  }

  search(event) {
    const query = event.target.value;
    const searchResults = this.index.search(query);
    const pageResults = searchResults.map(({ ref }) => this.index.documentStore.getDoc(ref));
    this.setState({
      results: pageResults,
      searchTerm: query,
    });
  }

  render() {
    const resultsCount = this.state.results.length;

    return (
      <div className="container">
        <form>
          <h1>Search</h1>
          <input
            type="text"
            className="form-control"
            onChange={this.search}
            value={this.state.searchTerm}
          />
        </form>
        <h2>Results</h2>
        {resultsCount > 0 && (
          <ol>
            {this.state.results.map(page => (
              <li key={page.title}>
                <Link to={page.slug}>{page.title}</Link>{' '}
                <span className="badge badge-info">{page.type}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }
}

export default SearchPage;
