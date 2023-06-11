import React from 'react'
import ConnectChain from '../../components/ConnectChain'

describe('<ConnectChain />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ConnectChain />)
  })
})

