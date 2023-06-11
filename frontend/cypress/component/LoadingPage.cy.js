import React from 'react'
import LoadingPage from '../../components/LoadingPage'

describe('<LoadingPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LoadingPage />)
  })
})

