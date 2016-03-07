# Form Based Authentication

This repo relates to the Learning Experience of the same name. It covers most of the basic ideas you need to understand if you want users to be able to log in to your application. That includes:

* Authentication
* Authorization
* Cryptographic Hashing
* Cookies
* Session


### Setup

1. Fork/clone this repo
1. Run `npm install`
1. Work through the learning experience and complete each section as prompted.


### Sections

* [Encryption](#encryption)
* [Cookies](#cookies)
* [Sessions](#sessions)
* [Auth](#auth)


### Encryption

Inside of the encryption route, do the following:

1. Install [md5](https://github.com/pvorb/node-md5):
  ```
  npm install --save md5
  ```

1. Create a `/md5` route that returns a simple password encrypted via md5.
  * What happens when you refresh the page? Is the salt the same?

1. Go to [CrackStation](https://crackstation.net/) and enter in the result from the previous step. Is it able to decrypt your password?

1. Install [bcrypt](https://www.npmjs.com/package/bcrypt):
  ```
  npm install --save bcrypt
  ```

1. Create a `/salt` route that returns a salt to the page.
  * What happens when you refresh the page? Is the salt the same?
  * What happens when you change the `rounds` parameter? What is noticeably different?

1. Create a `/hash` route that returns a hashed password.
  * What happens when you refresh the page? Is the hash the same?

1. Create a `/compare` route that compares a hashed password against its non-hashed counterpart.
  * What happens when you refresh the page? Does the result change without you changing the password?
  * What gets returned if the hashed password and its plain counterpart don't match?


### Cookies

Inside of the cookies route, do the following:

1. Open up your web inspector and navigate to the __Resources__ tab. Open up the 'Cookies' sub-menu and click on __localhost__.
  * Do you have any cookies set already? Make sure to clear them out now.

1. Create a `/set` route that sets a cookie name and a rating. It should then return all stored cookies as the result. For example:
  ```javascript
  router.get('/set', function(req, res, next) {
    res.cookie('chocolateChip', 8);
    var result = JSON.stringify(req.cookies);
    
    res.render('index', { title: 'Cookies', result: result });
  });
  ```

  * What changes in your __Resources__ tab?
  * Is the rating an integer or a string in terms of how it is stored as a cookie?

1. Change the above route so that it takes two query parameters: `cookie` and `rating`. Allow for the user to set the cookie name and the rating. For example
  ```
  http://localhost:5000/cookies/set?cookie=oatmeal&rating=3
  ```

  * How might you set a default so that when you initially go to the route, a cookie is still set?

1. Create a `/clear` route that clears _all_ the cookies. Return all the cookies as part of the result to make sure everything is cleared.

  * There is not a native way to do this; how would you identify all possible cookies and remove them all?
  * Go to your `/set` route and then right back to your `/clear` route. Have the cookies cleared? What is shown on the page? Why?

1. Create a '/set-secret' route that adds additional security features to the cookie being sent back. Use the method particular to signed cookies in order to pass back a result.
  * How has the cookie changed from the `/set` route? Take a look in the web inspector to see.


### Sessions

Inside of the sessions route, do the following:

1. Open up your web inspector and navigate to the __Resources__ tab. Open up the 'Cookies' sub-menu and click on __localhost__.
  * Do you have any cookies set already? Make sure to clear them out now.

1. Install [cookie-session](https://www.npmjs.com/package/cookie-session) and [dotenv](https://www.npmjs.com/package/dotenv):
  ```
  npm install --save cookie-session dotenv
  ```

1. Require both __cookie-session__ and __dotenv__ in your `app.js`. Require __cookieSession__ and set it up as middleware. For __cookieSession__, set a session name and at least three keys. Load __dotenv__.

1. Create a `.env` file and add it to your .gitignore.

1. Extract out your keys to the `.env` file and load them with `process.env.[VAR NAME]`.

1. Create a route called `/set` that sets up a `user` session key that associates to some user session data. For example:
  ```javascript
  router.get('/set', function(req, res, next) {
    req.session.user = { username: 'myname', id: '11' };
    var result = JSON.stringify(req.session);

    res.render('index', { title: 'Sessions', result: result });
  });
  ```
  * What cookies are created on your page when you do this?

1. Create two new routes: `/get-username` and `/get-id`. Each should return as the result the username and id, respectively, to the page.

1. Create a `/clear` route that removes all session information. Go back to your other routes and make sure the pages load in the event the session is not set.


### Auth

Inside of the auth route, do the following:

1. At the top of the file, create an array of objects that holds user information including at least a username and a password. Use bcrypt to hash the password and store it in your `.env` file. For example:
  ```javascript
  var userInfo = [
    { name: 'Tony Stark', username: 'tony.stark', password: process.env.TONY_PASS }
  ];
  ```

1. Create a `/find-by-username` route that takes a username query parameter and uses it to search through your userInfo array for a matching username. If the username is there, return the whole user object as the result.

1. Create a `/verify-password` route that takes a username and password query parameter. Search through the userInfo array for the matching username and, using bcrypt, check the password against the hashed version. If everything matches up, return the whole user object.