import React from 'react'
import { Index } from 'elasticlunr'
import { graphql } from 'graphql'

export const searchQuery = graphql`query
ActivitySearchIndexQuery {
    siteSearchIndex {
      index
    }
}`
// TODO: Add links to search results
class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.index = Index.load(props.data.siteSearchIndex.index)
    this.state = {
      results: [],
      searchTerm: props.searchTerm,
    }
  }

  componentWillMount() {
    const event = { target: { value: this.state.searchTerm } }
    this.search(event)
  }

  search(event) {
    const query = event.target.value
    const searchResults = this.index.search(query)
    const pageResults = searchResults.map(({ ref }) => this.index.documentStore.getDoc(ref))
    this.setState({
      results: pageResults,
      searchTerm: query,
    })
  }

  render() {
    const resultsCount = this.state.results.length

    return (<div className="container">
      <form>
        <h1>Search</h1>
        <input type="text" className="form-control" onChange={this.search} value={this.state.searchTerm} />
      </form>
      <h2>Results</h2>
      {resultsCount > 0 && <ol>
        {this.state.results.map(page => (
          <li key={page.title}>
            {page.title}
          </li>
        ))}
      </ol>}
    </div>)
  }
}

export default SearchPage
