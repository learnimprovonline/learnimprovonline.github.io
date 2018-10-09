import React from 'react'

const foci = require('../data/focus/foci.json')

const FocusPage = () => (
  <div className="container">
    <h1>Activity Focus</h1>
    <p>Skill or technique used to make a performance better and more fun.</p>
    <hr />
    <dl>
      {foci.map(focus => (
        <div key={focus.name}>
          <dt>{focus.name}</dt>
          <dd>{focus.description}</dd>
        </div>
      ))}
    </dl>
  </div>
)

export default FocusPage
