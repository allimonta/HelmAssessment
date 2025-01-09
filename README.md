Automation Framework - Playwright (JavaScript)
This is an automation framework built using Playwright in JavaScript for testing the Sauce Labs website. The framework is organized into three primary directories: tests, utils, and pages. It utilizes a .env file for managing environment variables and configurations.

Folder Structure
├── tests
│   ├── cart.spec.js
│   ├── checkout.spec.js
│   ├── inventory.spec.js
│   └── login.spec.js
├── utils
│   ├── constants.js
│   ├── functions.js
│   └── pom-setup.js
├── pages
│   ├── cart.js
│   ├── checkout.js
│   ├── inventory.js
│   ├── products.js
│   ├── checkoutCompleted.js
│   ├── checkoutOverview.js
│   └── login.js
└── .env

Overview
tests:
This directory contains all of your test scripts. Each test file should include a series of automated actions using Playwright to test the functionality of the Sauce Labs site. Example files include:
cart.spec.js
checkout.spec.js
inventory.spec.js
login.spec.js

pages:
This folder houses Page Object Model (POM) files that represent different pages of the Sauce Labs site. Each POM class defines methods to interact with UI elements on specific pages. The POM classes are:
cart.js
checkout.js
inventory.js
products.js
checkoutCompleted.js
checkoutOverview.js
login.js

utils:
This folder contains essential utility functions, constants, and configuration for page objects:
constants.js: Defines all constants used throughout the framework.
functions.js: Includes common, reusable functions like generating random data, waiting for elements, etc.
pom-setup.js: Configures Playwright fixtures and makes POM classes available for use within the tests.

Purpose of pom-setup.js
Setting up Page Object Models (POMs): This file defines and configures the POM classes (such as Login, Inventory, Cart, Product, etc.) that represent various pages of the application you're testing.
Using Playwright Fixtures: It extends Playwright’s fixture functionality, making the page object instances available to tests. Each fixture initializes a page object instance and injects it into the test.
Creates a Browser Context: The context fixture launches the browser, creates a new context, and ensures proper cleanup after the tests run.
Creates Page Objects (POM): Each fixture creates a new page and links it to the corresponding page object for interaction with UI elements.
Dependency Injection in Tests: By injecting page object instances (e.g., Login, Inventory, etc.) into the tests via fixtures, the tests can interact with the UI without directly accessing page elements.

Setup
1. Install Dependencies
Ensure you have Node.js installed. Then, install the required dependencies by running: npm install
2. Install Playwright Automation Framework
To initialize Playwright, run: npm init playwright@latest
3. Install Playwright UI in VSCode
To make it easier to interact with Playwright in VSCode:
Go to the Extensions tab in VSCode.
Search for Playwright UI and install it.
4. Install Playwright Runner in VSCode
Similarly, install the Playwright Runner extension for better test execution management in VSCode.
5. Setup Environment Variables
Install the DotEnv extension in VSCode, and create a .env file in the root directory of your project. In the .env file, define the necessary environment variables.

Running Tests
To run all tests: npx playwright test
To run a specific test: npx playwright test -g "User is able to add products to remove products from the cart"

Notes
Ensure that all sensitive information (such as credentials or tokens) is securely stored in the .env file and not exposed in the code.
This framework uses Playwright to interact with the Sauce Labs application, providing fast and reliable browser automation for testing.
Playwright is highly efficient in automating and testing modern web applications across various browsers.
