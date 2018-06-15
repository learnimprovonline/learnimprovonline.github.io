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
          fields: {
            slug: 'slug1',
          },
          frontmatter: {
            title: 'One',
          },
        },
      },
      {
        node: {
          fields: {
            slug: 'slug2',
          },
          frontmatter: {
            title: 'Two',
          },
        },
      },
      {
        node: {
          fields: {
            slug: 'slug3',
          },
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

  describe('Focus Page Link', () => {
    const focusLink = ActivitiesPageDom.find(Link).at(0)

    test('display text is "Focus"', () => {
      const homeLinkText = focusLink.children().text()

      expect(homeLinkText).toEqual('Focus')
    })

    test('points to the Focus Page', () => {
      const focusPagePath = '/focus/'
      const focusLinkDestination = focusLink.prop('to')

      expect(focusLinkDestination).toEqual(focusPagePath)
    })
  })

  describe('Home Page Link', () => {
    const homeLink = ActivitiesPageDom.find(Link).at(1)

    test('display text is "Go to Home"', () => {
      const homeLinkText = homeLink.children().text()

      expect(homeLinkText).toEqual('Go to Home')
    })

    test('points to the Index Page', () => {
      const homePagePath = '/'
      const homeLinkDestination = homeLink.prop('to')

      expect(homeLinkDestination).toEqual(homePagePath)
    })
  })

  describe('Activity List', () => {
    const activityList = ActivitiesPageDom.find('ul')
    const files = mockData.allMarkdownRemark.edges

    test('should exist', () => {
      expect(activityList.exists()).toBe(true)
    })

    test('should have one list item for each data item', () => {
      expect(activityList.children('li')).toHaveLength(files.length)
    })

    describe('List Items', () => {
      const listItems = activityList.find('li')

      listItems.forEach((listItem, index) => {
        const link = listItem.find(Link)

        test('should contain a link to the data slug', () => {
          const linkDestination = link.prop('to')
          const fileSlug = files[index].node.fields.slug

          expect(link.exists()).toBe(true)
          expect(linkDestination).toEqual(fileSlug)
        })

        test('should have display text of the frontmatter title', () => {
          const linkText = link.children().text()
          const fileTitle = files[index].node.frontmatter.title

          expect(linkText).toEqual(fileTitle)
        })
      })
    })
  })

  test('renders itself as expected', () => {
    const tree = toJson(ActivitiesPageDom)

    expect(tree).toMatchSnapshot()
  })
})
