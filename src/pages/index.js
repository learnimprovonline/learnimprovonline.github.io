import React from 'react'
import { graphql } from 'graphql'
import Features from '../components/features'

const IndexPage = ({ data }) =>
  (<div className="container">
    <div className="alert alert-info" role="alert">
      <h4 className="alert-heading">Early Access Alpha</h4>
      <p>
        Welcome to the future of learning improv. This early access preview gives
        you an inside look into the exciting new features coming to the site. Keep
        in mind everything is in active development and will be changing
        frequently, but don&apos;t let that stop you.
      </p>
      <p>Now go do something great.</p>
    </div>

    <h2>Improv Resources At Your Fingertips</h2>
    <p>
      Learn improv warm-ups and exercises through a variety of written descriptions,
      animated instructionals, and video examples. Empowering you and your team the
      ability to take yourself to the next level.
    </p>
    <hr />
    <section>
      <h3>High-Quality Content</h3>
      <p>
        Stop wasting time searching for the exercises you need and start rehearsing
        effectively today. Our curated selection of activities has been peer-reviewed
        to ensure each is meaningful and educational.
      </p>
      <p>
        Each is categorized and tagged with the skills it focuses on so you can choose
        the exercise which is right for you. Use the comprehensive glossary to cross
        reference terms and ideas across the site along with accompanying definitions
        and usages.
      </p>
      <hr />
    </section>
    <Features data={data.allDataJson.edges[0].node.features} />
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
