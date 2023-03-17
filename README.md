# InsightCorner - Project NC News

Link to deployed version : https://insightcorner.netlify.app/

## Overview

NC News is a full-stack news aggregation and discussion forum application built with React, Bootstrap, Node.js, Express, and PostgreSQL. Users can browse articles, sort articles by votes, comments, and dates, post new comments and vote on articles and comments. You can also create new articles and topics.

## Usage

- To post articles or comments, users must switch from guest accounts to registered accounts.
- Browse articles by clicking on the "All" link in the navigation bar or by a specific topic.
- Sort articles by votes, comments, or dates using the dropdown menu at the top of the page.
- Change order to ascending or descending.
- Change the theme of the application to dark or light with a click of a button
- Click on an article to view its details, including comments and votes.
- Post a new comment by clicking on the "Add Comment" button and filling out the form.
- Vote on an article or comment by clicking on the upvote or downvote next to its score.
- Create a new article or topic by clicking on the "Create Article" or "Create Topic" button in the navigation bar and filling out the form.

This repository contains the front-end client application, which communicates with the back-end RESTful API hosted on render.

Link for Backend Repo : https://github.com/IzaanD98/be-nc-news

Link for hosted version: https://project-nc-news-db.onrender.com/api - Returns all available endpoints.

### Prerequisites

To run the project locally, you must have Node.js installed on your machine. The minimum version of Node.js required is v14.17.6.

### Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/IzaanD98/fe-nc-news.git
```

2. Change into the project directory:

```
cd fe-nc-news
```

3. Install the dependencies:

```
npm install
```

4. To start the development server, run the following command:

```
npm start
```

The application should now be available at http://localhost:3000.

### Built With

React - JavaScript library for building user interfaces
Node.js - JavaScript runtime built on Chrome's V8 JavaScript engine
Express - Fast, unopinionated, minimalist web framework for Node.js
PostgreSQL - Powerful, open-source object-relational database syst
