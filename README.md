# TribalScale Coding Challenge

## Getting Started


### To Run Locally

First, clone the project:

```bash
$ git clone https://github.com/Loncarich/react-redux-starter-kit.git
$ cd react-redux-starter-kit
```

Then install dependencies and check to see it works

```bash
$ npm install                   # Install project dependencies
$ npm start                     # Compile and launch
$ npm run dev                   # Run Dev Server
```
Then navigate to localhost:3000 in browser.

## About

### Tech Stack

Project uses React-Redux Starter Kit found at https://github.com/davezuko/react-redux-starter-kit. Starter Kit comes pre-configured with Webpack and Babel. Project built using React, Bootstrap, HTML5, and CSS3 and runs on the Webpack dev server provided by the Starter Kit.

### Project Description

On app load, a request is sent to Random User Generator API and 60 results are retrieved from API. Those 60 results are then rendered in the app. These results are displayed alphabetically by last name (initially) and are grouped by first letter of the last name (initially).

App contains a 'Sort By' feature that allows users to select 'First Name' or 'Last Name' radio button. On selecting 'First Name', the results will be sorted alphabetically by first name and will be grouped by first letter of first name. On selecting 'Last Name', the results will be sorted alphabetically by last name and will be grouped by first letter of last name.

App also contains a 'Search' feature. If 'Last Name' radio button is selected and user begins typing search query into search input, the app will filter results and render only those results with last name matching search query. Similarly, if 'First Name' radio button is selected and user begins typing search query into search input, the app will filter results and render only those results with first name matching search query.

Lastly, App contains a 'Modal' feature. On clicking any of the individual result cards, a Modal will appear displaying additional information for that result/user. User can click 'Close' button or anywhere outside of modal to close modal.

