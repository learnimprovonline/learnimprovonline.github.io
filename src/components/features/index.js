import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faVideo, faFilm } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import './_features.scss'

// TODO: Dynamic icon imports
library.add([faSearch, faVideo, faFilm])

const FeatureCards = props =>
  (<section className="container">
    <h4>Features</h4>
    <div className="row">
      {props.data.map(item => (
        <div className="col-4" key={item.title}>
          <Card icon={item.icon} title={item.title} description={item.description} />
        </div>
      ))}
    </div>
  </section>)

export const Card = props => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title"><FontAwesomeIcon icon={props.icon} /> {props.title}</h5>
      <p className="card-text">{props.description}</p>
    </div>
  </div>
)

export default FeatureCards
