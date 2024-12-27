#**App Automation Test**

## Must have before start

- Git
- Docker
- Node.js

### Setting

1. Pull the docker image containing the web app
`docker pull automaticbytes/demo-app`

2. Run the image
`docker run -p 3100:3100 automaticbytes/demo-app`

3. Verify the app is shown in below url and set it as the base url for the tests.
`http://localhost:3100`

4. Install dependencies
`npm install`

5. Install latest version of Playwright
`npm init playwright@latest`

### Running tests 

Execute all the tests on background
`npx playwright test`

To run your tests in headed mode, use the --headed flag. This will give you the ability to visually see how Playwright interacts with the website.
`npx playwright test --headed`

To run a single test file, pass in the name of the test file that you want to run.
`npx playwright test login.spec.js`

### Debugging tests 

Debug tests with the Playwright Inspector
`npx playwright test --debug`

Debug one test file
`npx playwright test login.spec.js --debug`

### Reporting
Test report, screenshots and videos are saved in test-results folder

Open test results
`npx playwright show-report`