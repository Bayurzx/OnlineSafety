import React from 'react'
import LoadingStat from '../../components/LoadingStat'

describe('<LoadingStat />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoadingStat />)
  })
})

