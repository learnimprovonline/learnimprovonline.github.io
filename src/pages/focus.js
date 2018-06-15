import React from 'react'
import Link from 'gatsby-link'
const foci = require('../../content/focus/foci.json')

const FocusPage = () =>
    <div>
        <h1>Activity Focus</h1>
        <p>Skill or technique used to make a performance better and more fun.</p>
        <Link to='/activities/'>Activities</Link>
        <br />
        <Link to='/'>Go to Home</Link>
        <hr />
        <dl>
            {foci.map(foci => (
                <div key={foci.name}>
                    <dt>{foci.name}</dt>
                    <dd>{foci.description}</dd>
                </div>
            ))}
        </dl>
    </div>

export default FocusPage