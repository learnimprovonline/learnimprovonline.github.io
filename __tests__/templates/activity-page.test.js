import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import ActivityPage, {
  NewDurationDisplayText,
} from '../../src/templates/activity-page'

const mockData = {
  markdownRemark: {
    frontmatter: {
      title: 'Activity Title',
      type: 'Activity Type',
      foci: ['Focus One', 'Focus Two'],
      minimumPeople: 3,
      duration: 4,
    },
  },
}

describe('Activity Page Template', () => {
  const ActivityPageDom = shallow(<ActivityPage data={mockData} />)

  describe('Page Heading', () => {
    test('display text is the activity title', () => {
      const pageHeading = ActivityPageDom.find('h1')
      const pageHeadingText = pageHeading.text()
      const activityTitle = mockData.markdownRemark.frontmatter.title

      expect(pageHeadingText).toEqual(activityTitle)
    })
  })

  describe('Attribute List', () => {
    const attributeList = ActivityPageDom.find('dl')
    const terms = attributeList.find('dt')
    const definitions = attributeList.find('dd')

    test('should have a list item for Type', () => {
      const termText = terms.at(0).text()
      const definitionText = definitions.at(0).text()
      const activityType = mockData.markdownRemark.frontmatter.type

      expect(termText).toEqual('Type')
      expect(definitionText).toEqual(activityType)
    })

    test('should have a list item for Foci', () => {
      const termText = terms.at(1).text()
      const definitionText = definitions.at(1).text()
      const fociText = mockData.markdownRemark.frontmatter.foci.join(', ')

      expect(termText).toEqual('Foci')
      expect(definitionText).toEqual(fociText)
    })

    test('should have a list item for Minimum People', () => {
      const termText = terms.at(2).text()
      const definitionText = definitions.at(2).text()
      const minimumPeopleText = mockData.markdownRemark.frontmatter.minimumPeople.toString()

      expect(termText).toEqual('Minimum People')
      expect(definitionText).toEqual(minimumPeopleText)
    })

    describe('Duration List Item', () => {
      test('should have display text of "Duration"', () => {
        const termText = terms.at(3).text()

        expect(termText).toEqual('Duration')
      })

      test('should have a list item for Duration', () => {
        const definitionText = definitions.at(3).text()
        const duration = mockData.markdownRemark.frontmatter.duration
        const durationText = `${duration} minutes`

        expect(definitionText).toEqual(durationText)
      })
    })
  })

  describe('Activities Page Link', () => {
    const activitiesLink = ActivityPageDom.find(Link)

    test('display text is "Back to Activities"', () => {
      const activitiesLinkText = activitiesLink.children().text()

      expect(activitiesLinkText).toBe('Back to Activities')
    })

    test('points to the Activities Page', () => {
      const activitiesLinkDestination = activitiesLink.prop('to')
      const activitiesPageDestination = '/activities/'

      expect(activitiesLinkDestination).toEqual(activitiesPageDestination)
    })
  })

  test('renders itself as expected', () => {
    const tree = toJson(ActivityPageDom)

    expect(tree).toMatchSnapshot()
  })
})

describe('NewDurationDisplayText', () => {
  test('should create the correct text for Constant type', () => {
    const duration = 5
    const displayText = NewDurationDisplayText(duration, 'constant')
    const constantDisplayText = '5 minutes'

    expect(displayText).toEqual(constantDisplayText)
  })

  test('should display the correct text for Linear type', () => {
    const duration = 5
    const displayText = NewDurationDisplayText(duration, 'linear')
    const linearDisplayText = '5 minutes per person'

    expect(displayText).toEqual(linearDisplayText)
  })

  test('should display the correct text for Step type', () => {
    const duration = 5
    const peoplePerScene = 2
    const displayText = NewDurationDisplayText(duration, 'step', peoplePerScene)
    const stepDisplayText = '5 minutes per 2 people'

    expect(displayText).toEqual(stepDisplayText)
  })

  test('should display "minute" when the duration is one', () => {
    const duration = 1
    const displayText = NewDurationDisplayText(duration, 'constant')
    const singularDisplayText = '1 minute'

    expect(displayText).toEqual(singularDisplayText)
  })
})
