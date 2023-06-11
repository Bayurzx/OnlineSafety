import React from 'react'
import Intro from '../../components/Intro'

describe('<Intro />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Intro />)
  })
})

