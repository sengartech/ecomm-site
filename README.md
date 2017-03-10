# Project Title

MVC based REST Api Ecommerce Website.

## Description

This project contains Admin-End and User-End ecommerce website.
Based on mvc designed pattern.
Implemented in NodeJs,Express,MongoDB as Backend.
HTML5,Javascript,CSS as frontend.

## Prerequisites

NodeJs
NPM
MongoDB

## Running

(Note: these instructions are for Ubuntu Linux based OS. Assuming nodejs, npm and mongodb is already installed).

  running mongodb:
```
    1). Open Terminal and change directory to where mongodb is installed in bin folder.
    2). user@linux: ~/path/to/mongodb/bin $ ./mongod --dbpath ~/path/to/data/db
    3). press enter database server will start.
```
  unzipping and installing dependencies:
```
    1). Unzip the downloaded file.
    2). Open the extracted folder.
    3). Right click somewhere in folder and select Open in Terminal.
    4). Type Command : npm install and press enter. This will install all dependencies shown in package.json file.
```
  running project:
```
for admin:
  Step 1: Install all dependencies by : npm install
  Step 2: Open Postman and type (use POST method) : http://localhost:9000/admin/create
  Step 3: provide : username , firstName , lastName, email , password.
  Step 4: admin is created . Now Login. http://localhost:9000/admin/login
  Step 5: create some product to show at user end.

for user:
  Step 1: Install all dependencies by : npm install
  Step 2: open site at. http://localhost:3000
  Step 3: you are good to go now. Create account,shop, add to cart, checkout, orders,settings.
```
## Built With

OS : Ubuntu 16.04 LTS (64-bit).

Google Chrome Extension : Postman 4.10.3.

Editor : Atom 1.14.4 (64-bit).

Browser : Mozilla Firefox 51.0.1 (64-bit).
          Google Chrome 56.0.2924.87 (64-bit).

## Third Party Libraries

front-end : Bootstrap- for responsive site,
            elegant-icons- for icons.
            jQuery- required for js functions,
            movetop.js - for providing move to top icon at bottom right corner.

## Version

This is first version 0.0.1

## Authors

Designed and Developed by: Rishabh Singh.
