import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import ActivitiesPage from '../../src/pages/activities'

const pageTitle = 'Activities'
const indexPageDestination = '/'

const ActivitiesPageDom = shallow(
  <ActivitiesPage />
)

const indexLink = ActivitiesPageDom.find(Link)

test('Activites Page contains a page heading with the page title', () => {
  const pageHeading = ActivitiesPageDom.find('h1')
  const pageHeadingText = pageHeading.children().text()

  expect(pageHeadingText).toEqual(pageTitle)
});

test('Activites Page contains a link to the Index Page', () => {
  const indexLinkDestination = indexLink.prop('to')

  expect(indexLinkDestination).toEqual(indexPageDestination)
});

test('Activites Page contains a "Go to Activities" link', () => {
  const indexLinkText = indexLink.children().text()

  expect(indexLinkText).toEqual('Go to Home')
})

test('Activites Page renders correctly', () => {
  const tree = toJson(ActivitiesPageDom)

  expect(tree).toMatchSnapshot()
})