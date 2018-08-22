import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'graphql'

export const NewDurationDisplayText = (
  duration,
  durationType,
  peoplePerScene,
) => {
  let displaySuffix
  switch (durationType) {
    case 'linear':
      displaySuffix = ' per person'
      break
    case 'step':
      displaySuffix = ` per ${peoplePerScene} people`
      break
    default:
      displaySuffix = ''
      break
  }

  const plural = duration > 1 ? 's' : ''

  return `${duration} minute${plural}${displaySuffix}`
}

export default ({ data }) => {
  const activity = data.markdownRemark.frontmatter
  return (
    <div className="container">
      <h1>{activity.title}</h1>
      <dl>
        <dt>Type</dt>
        <dd>{activity.type}</dd>
        <dt>Foci</dt>
        <dd>{activity.foci.join(', ')}</dd>
        <dt>Minimum People</dt>
        <dd>{activity.minimumPeople}</dd>
        <dt>Duration</dt>
        <dd>
          {NewDurationDisplayText(
            activity.duration,
            activity.durationType,
            activity.peoplePerScene,
          )}
        </dd>
      </dl>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <Link to="/activities/">Back to Activities</Link>
    </div>
  )
}

export const query = graphql`
  query ActivityQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        type
        foci
        minimumPeople
        duration
        durationType
        peoplePerScene
      }
    }
  }
`
