import React from 'react'
import { graphql } from 'graphql'
import Features from '../components/features'
import HowTo from '../components/how-to'

const IndexPage = ({ data }) =>
  (<div className="container">
    <div className="alert alert-info" role="alert">
      <h4 className="alert-heading">Early Access Alpha</h4>
      <p>
        Welcome to the future of learning improv. This early access preview gives
        you an inside look into the exciting new features coming to the site. Keep
        in mind everything is in active development and will be changing
        frequently, but do not let that stop you.
      </p>
      <p>Now go do something great.</p>
    </div>

    <h2>Improv Resources At Your Fingertips.</h2>
    <p>
      Learn improv warm-ups and exercises through a variety of written descriptions,
      animated instructionals, and video examples. Empowering you and your team the
      ability to take yourself to the next level.
    </p>
    <hr />
    <Features data={data.allDataJson.edges[0].node.features} />

    <HowTo data={data.allDataJson.edges[0].node.howTo} />
  </div>
  )

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
      allDataJson {
    edges {
      node {
    features {
      title
            description
    icon
  }
          howTo {
      title
    }
    }
  }
}
}
`
