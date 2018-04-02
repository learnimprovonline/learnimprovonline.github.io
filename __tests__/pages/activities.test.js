import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import ActivitiesPage from '../../src/pages/activities'

const mockData = {
  allMarkdownRemark: {
    edges: [
      {
        node: {
          frontmatter: {
            title: 'One',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title: 'Two',
          },
        },
      },
      {
        node: {
          frontmatter: {
            title: 'Three',
          },
        },
      },
    ],
  },
}

const ActivitiesPageDom = shallow(<ActivitiesPage data={mockData} />)

describe('Activities Page', () => {
  describe('Page Heading', () => {
    test('display text is "Activites"', () => {
      const pageTitle = 'Activities'
      const pageHeading = ActivitiesPageDom.find('h1')
      const pageHeadingText = pageHeading.children().text()

      expect(pageHeadingText).toEqual(pageTitle)
    })
  })

  describe('Index Link', () => {
    const indexLink = ActivitiesPageDom.find(Link)

    test('display text is "Go to Home" link', () => {
      const indexLinkText = indexLink.children().text()

      expect(indexLinkText).toEqual('Go to Home')
    })

    test('points to the Index Page', () => {
      const indexPageDestination = '/'
      const indexLinkDestination = indexLink.prop('to')

      expect(indexLinkDestination).toEqual(indexPageDestination)
    })
  })

  describe('Activity List', () => {
    const activityList = ActivitiesPageDom.find('ul')

    test('should exist', () => {
      expect(activityList.exists()).toEqual(true)
    })
    test('list items populated from site data', () => {
      const listItems = activityList.find('li')
      const files = mockData.allMarkdownRemark.edges

      expect(listItems).toHaveLength(files.length)
      expect(listItems.at(0).text()).toEqual(files[0].node.frontmatter.title)
      expect(listItems.at(1).text()).toEqual(files[1].node.frontmatter.title)
      expect(listItems.at(2).text()).toEqual(files[2].node.frontmatter.title)
    })
  })

  test('renders itself as expected', () => {
    const tree = toJson(ActivitiesPageDom)

    expect(tree).toMatchSnapshot()
  })
})
