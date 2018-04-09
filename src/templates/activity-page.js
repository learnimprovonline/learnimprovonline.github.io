import React from 'react'

export default ({ data }) => {
  const activity = data.markdownRemark
  return (
    <div>
      <h1>{activity.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: activity.html }} />
    </div>
  )
}

export const query = graphql`
  query ActivityQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
