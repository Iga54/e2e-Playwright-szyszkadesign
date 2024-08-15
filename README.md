# GUI automatic tests of a page

## Project description and main functionalities

### Goals

The main goals of that project of automatic testing are:

- ensuring the high quality of software by verifying whether the user interface works as expected
- verifying correctness of functionalities on the level of interactions with user
- increasing test coverage - automation allows testers to test more scenarios in a short time
- increasing test effectiveness by time reduction and resources needed to run manual tests
  Automation concerns reduction of repetitive and time-consuming tasks.

### Functionalities

Given project mainly focuses on functional tests of concrete functionalities on website (https://szyszkadesign.pl/), such as interactions with cart, buttons (for example search button) and searching products.

## Page Object Model

Page Object Model was used within project (for files: button.spec.ts and search.spec.ts) to separate the test logic from the page-specific code. This makes the tests more readable and maintainable because any change in the UI of the web page requires only updates in the page object class, not in the test scripts themselves. Each page of the website under test is represented as a class and the various elements on the page, such as buttons.

## Project configuration

1. The first step is to run a command `npm install` in terminal
2. Run the command `npm run test` in terminal

## Frameworks used in the project

The project was written using TypeScript. Main frameworks and their versions are described below:

- "@playwright/test" - framework for test automation for web applications which allows running tests using different browsers (in case of given project - Chromium were exploited)
  In addition, Playwright ensures a support for parallel tests, creenshots, video recording and elements inspection

- "@types/node" - set of type definitions for Node.js, designed for use with TypeScript. These types enable better autocompletion, type checking, and documentation in the IDE

- prettier- useful tool for automatic code formatting and ensuring consistency of code style in a project.
