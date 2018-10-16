/* eslint-env jest */
import React from 'react'
import { shallow } from 'enzyme'
import IndexPage from '../../src/pages/index'
import Features from '../../src/components/features'

const mockData = {
  allDataJson: {
    edges: [
      {
        node: {
          features: [
            {
              title: 'Basic configuration and folder structure',
            },
          ],
          howTo: [
            {
              title: 'Prepare a coffee',
            },
          ],
        },
      },
    ],
  },
}

describe('Index Page', () => {
  const IndexPageDom = shallow(<IndexPage data={mockData} />)
  test('Features populated with data', () => {
    const features = IndexPageDom.find(Features)
    const data = mockData.allDataJson.edges[0].node.features

    expect(features).toHaveLength(1)
    expect(features.props().data).toEqual(data)
  })
})
