#!/bin/bash

output="ConnectChain.jsx Countdown.jsx Footer.jsx LoadingPage.jsx ConnectWallet.jsx EnterGame.jsx GameStat.jsx Intro.jsx LoadingStat.jsx PlayerStat.jsx"

# Split the output into an array of filenames
IFS=' ' read -ra files <<< "$output"

# Iterate over the filenames
for file in "${files[@]}"; do
  # Extract the component name without the extension
  component=$(basename "$file" .jsx)

  # Generate the content with the component name
  content="import React from 'react'
import $component from '../../components/$component'

describe('<$component />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<$component />)
  })
})
"

  # Create a new file with the generated content
  echo "$content" > "$component.cy.js"

  echo "Created $component.cy.js"
done
