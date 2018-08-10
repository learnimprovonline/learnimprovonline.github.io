import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import Header from '../../src/components/header'

const HeaderDom = shallow(<Header>{'Site Name'}</Header>)

describe('Header', () => {

  describe('Site Title', () => {
    const siteTitle = HeaderDom.find('.header-logo')
    const titleLink = siteTitle.find(Link)

    test('link goes to the main page', () => {
      const rootDestination = '/'

      const linkDestination = titleLink.prop('to')
      expect(linkDestination).toEqual(rootDestination)
    })

    test('display text is passed in as children', () => {
      const linkText = titleLink.children().text()

      expect(linkText).toEqual('Site Name')
    })
  })

  describe('Navigation', () => {
    const navigationItems = HeaderDom.find('.header-nav-list-item')

    test('should have three navigation items', () => {
      expect(navigationItems).toHaveLength(3)
    })

    describe('Activities', () => {
      const activitiesLink = navigationItems.at(0).find(Link)

      test('link goes to Activities page', () => {
        const activitesPageDestination = '/activities'
        const linkDestination = activitiesLink.prop('to')

        expect(linkDestination).toEqual(activitesPageDestination)
      })
      test('display text is "Activities"', () => {
        const linkText = activitiesLink.children().text()

        expect(linkText).toEqual('Activities')
      })
    })

    describe('FAQ', () => {
      const faqLink = navigationItems.at(1).find(Link)

      test('link goes to FAQ page', () => {
        const faqPageDestination = '/faq'
        const linkDestination = faqLink.prop('to')

        expect(linkDestination).toEqual(faqPageDestination)
      })
      test('display text is "FAQ"', () => {
        const linkText = faqLink.children().text()

        expect(linkText).toEqual('FAQ')
      })
    })

    describe('Contact', () => {
      const contactLink = navigationItems.at(2).find(Link)

      test('link goes to Contact page', () => {
        const contactPageDestination = '/contact'
        const linkDestination = contactLink.prop('to')

        expect(linkDestination).toEqual(contactPageDestination)
      })
      test('display text is "Contact"', () => {
        const linkText = contactLink.children().text()

        expect(linkText).toEqual('Contact')
      })
    })
  })

  test('renders itself correctly', () => {
    const tree = toJson(HeaderDom)

    expect(tree).toMatchSnapshot()
  })
})
