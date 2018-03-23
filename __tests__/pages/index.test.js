import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import IndexPage from '../../src/pages/index.js'

const activitiesPageDestination = '/activities/'
const pageTitle = 'Early Access Alpha'

const IndexPageDom = shallow(
    <IndexPage />
)

const activitiesLink = IndexPageDom.find(Link)

test('Index Page contains a page heading with the page title', () => {
    const pageHeading = IndexPageDom.find('h1')
    const pageHeadingText = pageHeading.children().text()

    expect(pageHeadingText).toEqual(pageTitle)
})

test('Index Page contains a link to the Activities Page', () => {
    const activitiesLinkDestination = activitiesLink.prop('to')

    expect(activitiesLinkDestination).toEqual(activitiesPageDestination)
})

test('Index Page contains a "Go to Activities" link', () => {
    const activitiesLinkText = activitiesLink.children().text()

    expect(activitiesLinkText).toEqual('Go to Activities')
})

test('Index Page renders correctly', () => {
    const tree = toJson(IndexPageDom)

    expect(tree).toMatchSnapshot()
})