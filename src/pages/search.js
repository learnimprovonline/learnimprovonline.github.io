import React from 'react'
import { Index } from 'elasticlunr'
import { graphql } from 'graphql'

export const searchQuery = graphql`query
ActivitySearchIndexQuery {
    siteSearchIndex {
      index
    }
}`

class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.search = this.search.bind(this)
    this.index = Index.load(props.data.siteSearchIndex.index)
    this.state = {
      results: [],
    }
  }

  search(event) {
    const query = event.target.value
    const searchResults = this.index.search(query)
    const pageResults = searchResults.map(({ ref }) => this.index.documentStore.getDoc(ref))
    this.setState({
      results: pageResults,
    })
  }

  render() {
    return (<div className="container">
      <form>
        <h1>Search</h1>
        <input type="text" className="form-control" onChange={this.search} />
      </form>
      {this.state.results.length > 0 && <React.Fragment>
        <h2>Results</h2>
        <ol>
          {this.state.results.map(page => (
            <li>
              {page.title}
            </li>
          ))}
        </ol>
      </React.Fragment>}
    </div>)
  }
}

export default SearchPage
