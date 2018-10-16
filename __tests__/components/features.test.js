/* eslint-env jest */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { shallow } from 'enzyme'
import FeatureCards, { Card } from '../../src/components/features'

const mockData = [
  { title: 't1', description: 'd1', icon: 'i1' },
  { title: 't2', description: 'd2', icon: 'i2' },
  { title: 't3', description: 'd3', icon: 'i3' },
]

describe('FeatureCards', () => {
  const FeatureDom = shallow(<FeatureCards data={mockData} />)

  test('has header with text "Features"', () => {
    const header = FeatureDom.find('h4')
    expect(header).toHaveLength(1)

    const headerText = header.text()
    expect(headerText).toBe('Features')
  })

  describe('Cards', () => {
    test('one for each data item', () => {
      const cards = FeatureDom.find(Card)
      expect(cards).toHaveLength(mockData.length)
    })
  })
})

describe('Card', () => {
  const CardDom = shallow(<Card icon="test icon" title="my title" description="my description" />)

  test('has FontAwesomeIcon defined from icon props', () => {
    const icon = CardDom.find(FontAwesomeIcon)

    expect(icon).toHaveLength(1)
    expect(icon.props().icon).toBe('test icon')
  })

  test('has card title text from title props', () => {
    const title = CardDom.find('h5')
    const titleText = title.childAt(2).text()

    expect(titleText).toBe('my title')
  })

  test('card body from description props', () => {
    const description = CardDom.find('p')
    const descriptionText = description.text()

    expect(descriptionText).toBe('my description')
  })
})
