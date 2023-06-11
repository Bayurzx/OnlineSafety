import React from 'react'
import ConnectWallet from '../../components/ConnectWallet'

describe('<ConnectWallet />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ConnectWallet />)
    
  })

  
})