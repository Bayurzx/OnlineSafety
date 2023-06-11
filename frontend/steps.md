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
## backend
.     .gitignore  contracts    ##############            package.json  utils
..    LICENSE     delete.md    hardhat.config.js         scripts       #############     
.env  #########   deploy       helper-hardhat-config.js  steps.md      yarn.lock
.###  #####       deployments  node_modules              test


## build-frontend:

``` yaml
jobs:
  build-frontend:
    docker:
      - image: circleci/node:13.8.0
    steps:
      - checkout
      - restore_cache:
          keys: [frontend-build]
      - run:
          name: Build front-end
          command: |
            cd frontend
            yarn
            yarn build
      - save_cache:
          paths: [frontend/node_modules]
          key: frontend-build

```
## build-backend:

```yaml
  build-backend:
    docker:
      - image: circleci/node:13.8.0
    steps:
      - checkout
      - restore_cache:
          keys: [backend-build]
      - run:
          name: Back-end build
          command: |
            cd backend
            yarn
            npm run build
      - save_cache:
          paths: [backend/node_modules]
          key: backend-build

```

## test-frontend:
## test-backend:
## scan-frontend:
## scan-backend:
## deploy-infrastructure:
## configure-infrastructure:
## run-migrations:
## deploy-frontend:
## deploy-backend:
## smoke-test:
## cloudfront-update:
## cleanup:


# Bonus
``` powershell
# to make it readonly
Set-ItemProperty -Path "myDocker_key.pem" -Name Attributes -Value 'ReadOnly'
```