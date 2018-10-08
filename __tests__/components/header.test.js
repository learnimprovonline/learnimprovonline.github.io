/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import Link, * as gatsbyLink from 'gatsby-link'
import Header, { handleSubmit } from '../../src/components/header'

const handleSearchMock = jest.fn()
const HeaderDom = shallow(<Header handleSearch={handleSearchMock}>{'Site Name'}</Header>)
jest.mock('gatsby-link')

describe('Header', () => {
  describe('handleSubmit', () => {
    const preventDefaultMock = jest.fn()
    const resetMock = jest.fn()
    let navigateToSpy
    const event = {
      preventDefault: preventDefaultMock,
      target: {
        reset: resetMock,
      },
    }

    beforeAll(() => {
      navigateToSpy = jest.spyOn(gatsbyLink, 'navigateTo')
      handleSubmit(event)
    })

    afterAll(() => {
      preventDefaultMock.mockClear()
      navigateToSpy.mockClear()
    })

    test('prevents form submission', () => {
      expect(preventDefaultMock).toHaveBeenCalledTimes(1)
    })

    test('calls navigateTo with "/search"', () => {
      expect(navigateToSpy).toHaveBeenCalledWith('/search')
    })

    test('resets the form', () => {
      expect(resetMock).toHaveBeenCalledTimes(1)
    })
  })
  describe('component', () => {
    describe('Site Title', () => {
      const titleLink = HeaderDom.find('.navbar-brand')

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
      const navigationItems = HeaderDom.find('.nav-item')

      test('should have three navigation items', () => {
        expect(navigationItems).toHaveLength(3)
      })

      describe('Activities', () => {
        const activitiesLink = navigationItems.at(0)

        test('link goes to Activities page', () => {
          const activitesPageDestination = '/activities'
          const linkDestination = activitiesLink.prop('to')

          expect(activitiesLink.type()).toEqual(Link)
          expect(linkDestination).toEqual(activitesPageDestination)
        })
        test('display text is "Activities"', () => {
          const linkText = activitiesLink.children().text()

          expect(linkText).toEqual('Activities')
        })
      })

      describe('FAQ', () => {
        const faqLink = navigationItems.at(1)

        test('link goes to FAQ page', () => {
          const faqPageDestination = '/faq'
          const linkDestination = faqLink.prop('to')

          expect(faqLink.type()).toEqual(Link)
          expect(linkDestination).toEqual(faqPageDestination)
        })
        test('display text is "FAQ"', () => {
          const linkText = faqLink.children().text()

          expect(linkText).toEqual('FAQ')
        })
      })

      describe('Contact', () => {
        const contactLink = navigationItems.at(2)

        test('link goes to Contact page', () => {
          const contactPageDestination = '/contact'
          const linkDestination = contactLink.prop('to')

          expect(contactLink.type()).toEqual(Link)
          expect(linkDestination).toEqual(contactPageDestination)
        })
        test('display text is "Contact"', () => {
          const linkText = contactLink.children().text()

          expect(linkText).toEqual('Contact')
        })
      })
    })

    describe('Search Form', () => {
      const searchForm = HeaderDom.find('form')

      test('exists', () => {
        expect(searchForm).toHaveLength(1)
      })

      test('has onSubmit set to handleSubmit', () => {
        expect(searchForm.props().onSubmit).toBe(handleSubmit)
      })

      describe('Input Field', () => {
        const searchField = searchForm.find('input')

        test('is type of Search', () => {
          expect(searchField.props().type).toBe('search')
        })

        test('has onChange passed from props', () => {
          expect(searchField.props().onChange).toBe(handleSearchMock)
        })
      })

      describe('Search Button', () => {
        const searchButton = searchForm.find('button')

        test('exists', () => {
          expect(searchButton).toHaveLength(1)
        })

        test('is type "submit"', () => {
          expect(searchButton.props().type).toBe('submit')
        })

        test('has display text of "Search"', () => {
          expect(searchButton.children().text()).toBe('Search')
        })
      })
    })
  })
})
