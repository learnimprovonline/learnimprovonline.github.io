import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Link from 'gatsby-link'
import Header from '../../src/components/header.js'

const HeaderDom = shallow(
  <Header>{'Site Name'}</Header>
)
const link = HeaderDom.find(Link)

describe('Header', () => {

  test('link goes to the main page', () => {
    const rootDestination = "/"
    const linkDestination = link.prop('to')
  
    expect(linkDestination).toEqual(rootDestination)
  })
  
  test('display text is passed in as children', () => {
    const linkText = link.children().text()
  
    expect(linkText).toEqual('Site Name')
  })
  
  test('renders itself correctly', () => {
    const tree = toJson(HeaderDom)
  
    expect(tree).toMatchSnapshot()
  })
})

