MVC based REST Api Ecommerce Website.

GitHub Link : https://github.com/sengartech/BlogApi.git

This assignment is created and tested in the following environment:

OS : Ubuntu 16.04 LTS (64-bit).

Google Chrome Extension : Postman 4.10.3.

Editor : Atom 1.14.4 (64-bit).

Browser : Mozilla Firefox 51.0.1 (64-bit).
          Google Chrome 56.0.2924.87 (64-bit).

Third Party Libraries:
 front-end : Bootstrap- for responsive site,
             elegant-icons- for icons.
             jQuery- required for js functions,
             movetop.js - for providing move to top icon at bottom right corner.

Implementation:

  This app is mvc based pattern.
  App has Admin and User end implemented.

  Admin-end works at (port:9000) : http://localhost:9000/admin

  User-end works at (port:3000) : http://localhost:3000/


How to run:

for admin:
  Step 1: Install all dependencies by : npm install
  Step 2: Open Postman and type (use POST method) : http://localhost:9000/admin/create
  Step 3: provide : username , firstName , lastName, email , password.
  Step 4: admin is created . Now Login. http://localhost:9000/admin/login
  Step 5: create some product to show at user end.

for user:
  Step 1: Install all dependencies by : npm install
  Step 2: open site at. http://localhost:3000/
  Step 3: you are good to go now. Create account,shop, add to cart, checkout, orders,settings.


Thats all about it. Thanks :)
