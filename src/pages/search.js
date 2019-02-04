import React from 'react';
import Link from 'gatsby-link';
// eslint-disable-next-line no-unused-vars
import bootstrap from 'bootstrap';
import { Index } from 'elasticlunr';
import { graphql } from 'graphql';

import './_search.scss';

export const searchQuery = graphql`
  query ActivitySearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`;

export function SearchResult(props) {
  const activity = props.activity;
  const displayText = ` ${activity.focus.join(', ')}`;

  return (
    <span>
      <Link to={props.slug}>{activity.title}</Link>{' '}
      <span className="badge badge-info">{activity.type}</span>
      {displayText}
    </span>
  );
}

export function SearchResultsList(props) {
  const searchResults = props.results.map((page) => {
    const activity = {
      title: page.title,
      type: page.type,
      focus: page.focus,
    };

    return (
      <li key={page.title}>
        <SearchResult slug={page.slug} activity={activity} />
      </li>
    );
  });

  const searchResultsList = <ol>{searchResults}</ol>;

  return searchResultsList;
}

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
        <form className="searchForm">
          <h1>Search</h1>
          <input
            type="text"
            className="form-control"
            onChange={this.search}
            value={this.state.searchTerm}
          />
        </form>
        <h2>Results</h2>
        {resultsCount > 0 && <SearchResultsList results={this.state.results} />}
      </div>
    );
  }
}

export default SearchPage;
