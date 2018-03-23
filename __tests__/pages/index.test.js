import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import IndexPage from '../../src/pages/index.js'

const IndexPageDom = shallow(<IndexPage />)

describe('Index Page', () => {
  describe('Page Heading', () => {
    test('display text is "Early Access Alpha"', () => {
      const pageTitle = 'Early Access Alpha'
      const pageHeading = IndexPageDom.find('h1')
      const pageHeadingText = pageHeading.children().text()

      expect(pageHeadingText).toEqual(pageTitle)
    })
  })

  describe('Activities Link', () => {
    const activitiesLink = IndexPageDom.find(Link)

    test('display text is "Go to Activities"', () => {
      const activitiesLinkText = activitiesLink.children().text()

      expect(activitiesLinkText).toEqual('Go to Activities')
    })

    test('points to the Activities Page', () => {
      const activitiesPageDestination = '/activities/'
      const activitiesLinkDestination = activitiesLink.prop('to')

      expect(activitiesLinkDestination).toEqual(activitiesPageDestination)
    })
  })

  test('renders itself', () => {
    const tree = toJson(IndexPageDom)

    expect(tree).toMatchSnapshot()
  })
})
