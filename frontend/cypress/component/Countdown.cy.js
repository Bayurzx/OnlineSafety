import React from 'react'
import Countdown from '../../components/Countdown'

describe('<Countdown />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Countdown />)
  })
})

