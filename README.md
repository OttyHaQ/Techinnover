This guide provides steps to execute tests for the Cypress Assessment project.

Prerequisites: 
• A GitHub account (if forking) 
• Node.js and npm installed on your machine (check with node -v, and npm -v commands)
Typescript installed

Steps:

Fork or Clone the Repository to your local machine: If you haven't already, fork this repository on GitHub or clone it using HTTPS.

                                  https://github.com/OttyHaQ/Techinnover.git

If familiar with git, you can use

                                  git clone https://github.com/OttyHaQ/Techinnover.git


Open each Project in an IDE.

Install Dependencies: Open a terminal window and navigate to your local copy of the repository. Run the following command to install the project's dependencies:

                                    npm install

Update Cypress Configuration (if applicable):

Install ajv for schema validation

                                    npm install ajv

Run Cypress Tests: Once the dependencies are installed, you can run each tests using:

                                    npm run cypress:run
This will launch the Cypress Test Runner and execute all tests in the project in headless mode. 


You can also use the commands to run in the Cypress test runner GUI

                            npm run cypress:open ( to open cypress test runner GUI)
                            Click on E2E testing
                            Select a browser
                            Click the “Start E2E Testing in <browser>” button
                            Click on the spec file 

Viewing Test Results After test execution is completed, Cypress Test Runner will display the results in an interactive interface.



NOTES: 
Used Fixtures for my POM instead of Pages, locators are saved in fixtures folder to minimize the number of imports in the spec files. 
Created custom commands (helper methods) to reduce the lines of codes in some of the spec files. 
Saved baseUrl and other sensitive information as an environment variables.
The folders are independent of each other.

