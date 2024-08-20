# Changelog

## Latest - v3.9.0 (08/20/24):

### Enhancements:

- [GP-API] Added support for ACH, APM and EBT

## v3.8.2 (08/14/24):

### Enhancements:

- [Portico] Added support for incremental Auth.


## v3.8.1 (08/05/24):

### Enhancements:

- [Portico] Added support for lvl iii transactions.
- [Portico] Fix to tokenAction block scope issue.


## v3.8.0 (07/16/24):

### Enhancements:

- [GP-API] Add disputes feature
- [GP-ECOM] Add HPP capture article updates
- [Other] Switch automated tests from Ava to Jest

## v3.7.0 (06/18/24):

### Enhancements:

- [GP-API] Add deposits feature
- [GP-API] Fix authorization code mapping
- [GP-API] Improve testing
- [Validations] Improve validations mechanism
- [Portico] Added support for unique MUT request.

## v3.6.2 (06/07/24):

### Enhancements:

- [Portico] Fix code to conform to linting rules.

## v3.6.1 (06/04/24):

### Enhancements:

- [Portico] Add 'update token expiry' and 'delete token' functionality.

## v3.6.0 (05/30/24):

### Enhancements:

- [GP-API] Add 3D Secure features

## v3.5.3 (05/23/24):

### Fix:

- [Portico] Handle async response for debit reversal testcase.
- [Package.json]  Added files configuration to be included in npm publish due to a change.

##  v3.5.2 (05/21/24):

### Enhancements:

- [Portico] Added DebitReversal portico support with fromId.

## v3.5.1-fix-4 (04/26/24):

### Fix:

- Fix issue on Npm registry with missing lib folder.

## v3.5.0 (04/10/24):

### Enhancements:

- [GP-API] Add Transaction API methods

## v3.4.0 (03/12/24):

### Enhancements:

- [GP-API] Add stored payments and reports for stored payments

## v3.3.3 (02/27/24):

### Enhancements:
- PayPlan Enhancements: - Added payment methods to customer response
                        - Cardtype, NameOnAccount , and Last4 of both credit card and ACH are included in payment response 
                        - Fix for Processor Configuration error response message
                        - Added 204 as a success code when Request is successful; but response contains no data

## v3.3.2 (02/22/24):

### Enhancements:

- Code cleanup

## v3.3.1 (02/08/24):

### Enhancements:

- [RequestLogger] Backfill request logger on missing places

## v3.3.0 (01/31/24):

### Enhancements:

- [RequestLogger] Add request logger implementation on GpEcom and GpApi

## v3.2.0 (01/18/24):

### Enhancements:

- [UPA-MIC] Add MiC connector for UPA via GP-API

## v3.1.0 (10/31/23)

### Enhancements:

- [GP-API] Generate Access Token for GP API users
  - https://developer.globalpay.com/api/access-token

### Bug Fixes:

- Change tslint with eslint and fix existing lint errors

## v3.0.0 (10/03/23)

### Enhancements:

- Upgrade Typescript to v5 to use latest functionalities

## v2.0.0 (09/21/23)

### Enhancements:

- [GP-ECOM] Add configuration and use it in existing functionality
- From now on we are going to use containers in order to configure the services in Node SDK.

## v1.4.9 (05/17/23)

#### Profac Enhancements

- Profac Implementation - Implement profac functionality.

#### Reporting Enhancements

- SdkNameVersion Identifier: Name and Version of the SDK used for integration, where applicable. 

## v1.4.8 (12/13/22)

#### Enhancements

- Portico Connector: WalletData element added to process ApplePay/GooglePay Transactions using 
  Digital Tokens

## v1.4.7 (11/17/22)
