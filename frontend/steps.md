MoralisProvider must wrap the topmost level of the app

feat: Added two headers components
- Header1.jsx is built from scratch
- Header2.js is from web3kitUI

feat: Added two headers components`n`n- Header1.jsx is built from scratch`n- Header2.js is from web3kitUI

``` yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
workflows:
  test:
    jobs:
      - cypress/run:
          cypress-command: 'npx cypress run --component'

```

``` yaml
version: 2.1
orbs:
  cypress: cypress-io/cypress@3
workflows:
  test:
    jobs:
      - cypress/run:
          package-manager: 'yarn'
          start-command: 'yarn cypress'
        #   start-command: 'yarn start'

```

