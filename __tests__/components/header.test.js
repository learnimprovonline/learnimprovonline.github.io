import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import Header from '../../src/components/header.js'

const siteName = 'Site Name'
const HeaderDom = shallow(
  <Header>{siteName}</Header>
)
const link = HeaderDom.find(Link)

test('Header link goes to the main page', () => {
  const rootDestination = "/"
  const linkDestination = link.prop('to')

  expect(linkDestination).toEqual(rootDestination)
})

test('Header title displays the site name', () => {
  const linkText = link.children().text()

  expect(linkText).toEqual(siteName)
})

test('Header renders correctly', () => {
  const tree = toJson(HeaderDom)

  expect(tree).toMatchSnapshot()
})
