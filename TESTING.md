# TESTING

## Testing User Stories

**Manual Testing per User Story**

| User Story                                              | Test Steps                                                 | Expected Outcome                            | Result  |
|--------------------------------------------------------|------------------------------------------------------------|--------------------------------------------|---------|
| Navigation & Authentication                            | 1. Navigate to the website from the home page.            | Website loads successfully.                | Passed  |
|                                                        | 2. Click on the navigation bar links.                    | Pages load without page refresh.            | Passed  |
|                                                        | 3. Sign up for a new account.                             | Account is created successfully.            | Passed  |
|                                                        | 4. Sign in with the newly created account.               | Sign-in successful, access granted.         | Passed  |
|                                                        | 5. Verify the logged-in status.                         | User is shown as logged in.                 | Passed  |
|                                                        | 6. Stay logged in, test refresh behavior.               | User experience is maintained.              | Passed  |
|                                                        | 7. Log out from the user account.                       | User is logged out.                         | Passed  |
|                                                        | 8. Verify that sign-in and sign-up options are visible for logged-out users. | Options are displayed.  | Passed  |
| Adding Questions                                       | 1. Log in with a user account.                          | Sign-in successful.                        | Passed  |
|                                                        | 2. Navigate to the 'Ask a Question' page.               | Page loads successfully.                   | Passed  |
|                                                        | 3. Create and post a new question.                     | Question is added to the platform.           | Passed  |
|                                                        | 4. View the newly created question.                    | Question details are displayed.            | Passed  |
| The Questions Page                                    | 1. View the 'Latest Questions' page.                    | Page loads with the most recent questions. | Passed  |
|                                                        | 2. Perform a keyword search for questions.             | Relevant questions are displayed.          | Passed  |
|                                                        | 3. Filter questions by followed users.                 | Questions from followed users are shown.   | Passed  |
|                                                        | 4. Scroll down the page to test infinite scroll.        | Questions load without clicking 'next page'. | Passed  |
| The Question Page                                      | 1. Click on a question to view its details.              | Question details and responses are shown.  | Passed  |
|                                                        | 2. Edit the question title and description.             | Changes are saved successfully.             | Passed  |
|                                                        | 3. Add a response to the question.                     | Response is posted and displayed.            | Passed  |
|                                                        | 4. Verify that the response date is displayed.         | Response timestamp is visible.             | Passed  |
|                                                        | 5. Read responses on the question.                     | Responses by other users are shown.         | Passed  |
|                                                        | 6. Delete a response that you created.                 | Response is removed from the question.      | Passed  |
|                                                        | 7. Edit a response that you created.                   | Response is updated successfully.           | Passed  |
| The Profile Page                                      | 1. Visit another user's profile.                        | Profile details and activity are displayed. | Passed  |
|                                                        | 2. View user statistics on the profile.                | User's bio and stats are visible.           | Passed  |
|                                                        | 3. Follow and unfollow another user.                   | Follow status is updated accordingly.       | Passed  |
|                                                        | 4. View all questions and responses by a specific user. | User's posts are shown.                   | Passed  |
|                                                        | 5. Edit your own profile.                              | Profile information is updated.             | Passed  |
|                                                        | 6. Update your username and password.                  | Changes are saved successfully.             | Passed  |



## Validation

### HTML Validation:

- No errors or warnings were found when passing through the official [W3C](https://validator.w3.org/) validator. This checking was done manually by copying the view page source code (Ctrl+U) and pasting it into the validator for logged in user and the rest of the pages were checked by the URL validation.
- [HTML validation report](documentation/testing/html_validation.pdf)

### CSS Validation:

- [Full CSS Validation Report](documentation/testing/css_validation.pdf)
- For css validation I have used the official [W3C (Jigsaw)](https://jigsaw.w3.org/css-validator/#validate_by_uri) validator

### JS Validation:

- Since the application's frontend is written in React, I could not use the JSHint validator to validate the application. As you can down below, JSHint just doesn't understand JSX syntax.

![JSHint freaks out](documentation/testing/jshint_freak_out.png)

- But React itself validates the code on each build, and if there were any errors, the application would not be able to run.
- Since it runs correctly, we can consider all the code to be valid.



### Python Validation:

- [Full Python Validation Report](documentation/testing/python_validation.pdf)
- For python validation I have used the official [Pep8Online](http://pep8online.com/) validator

---

## Project assessment criteria

| Requirement    | Done           |  Comments    |
|-------------|------------------------|------------------|
| at least 3 original custom models with associated functionalities, markedly different from those present in the Boutique Ado walkthrough project if they have been used as a basis for your project.     |          Y              |   10 original custom models |
| at least one form on the front end, which provides either admin or regular users with CRUD functionality without having to access the admin panel. |           Y            |  |
| at least one UI element on the front end, which allows either admin or regular users to delete records in the database without having to access the admin panel. |          Y            |     |
| evidence of agile methodologies followed during the development of your project in the GitHub repository. |  Y   |                  |
| a robots.txt file. |  Y   |     |
| a sitemap.xml file. |   Y  |     |
| descriptive meta tags in the HTML. |   Y  |     |
| at least one link to an external resource, which makes use of a rel attribute.  |  Y  |     |
| a custom 404 error page. |  Y  |     |
| evidence of either a real Facebook business page, or mockup of one, for the purposes of digital marketing. |  Y  |  Mockup pages for Facebook |
| evidence of a newsletter signup form for the purposes of digital marketing. |  Y  |     |
| a description of the e-commerce business model including marketing strategies in the README file. | Y  |     |
| DEBUG mode set to False. | Y  |    |
| working functionality for users to register and log in and out of the application without issues. | Y  |     |
| working E-commerce functionality for users to make purchases within the application. | Y  |     |
| detailed testing write ups, beyond results of validation tools. | Y  |     |

---

## Automated testing

### Django testing

- Due to the lack of time, automated testing was done only for several apps with the use of the Django unit testing.

![Django testing report](documentation/testing/django_unit_testing.png)

### JavaScript testing (react)

- Due to the lack of time and documentation, automated testing was done only for the Home page with the use of the Jest testing library.

![React testing report](documentation/testing/jest_unit_testing.png)

---





## BUGS

### Known bugs

- The project's WebRTC video meeting functionality hits a huge wall of using the public STUN and TURN servers, and free tier Redis Channel Layer, provided by Heroku. The free tier Redis Channel Layer does not allow to handle multiple requests simultaneously. At the same time the negotiation between the peers sometimes require a HUGE amount of requests and responses. Also, public STUN and TURN servers are not reliable enough, and could provide not enough ICE candidates to establish a connection. At the same time, OS and browser firewalls can block the ports used by ICE. Therefore the video meeting functionality is not reliable enough and can fail to establish a connection. The only way to fix this is to use a paid Redis Channel Layer and a paid STUN and TURN servers or to build custom servers that would handle only this app's requests, which is too expensive and time consuming for a student project.

- There is a possibility of errors logged in browser's console on failed requests to the server. This is because I am using a custom build JWT authentication system, which makes requests to the server to see if the user is logged in or not on every page load. This is not quite a bug, because, if the access token cookie is expired, browser receives a 401 error, but the app makes the attempt to refresh the token at the same time, and if it is successful, the user is still logged in. So, browser just automatically logs the request error to the console, because it does not know that the app is trying to refresh the token. This is not a bug, because the app is still working as intended.

### Fixed bugs

- The WebRTC connection could not be established between 2 peers when I was using standard RTCPeerConnection without `trickle` option, because the signalling server's timeout was shorter than the ICE gathering process. I switched to the simple-peer library, which is a wrapper around RTCPeerConnection, add `trickle: true` to the peer options, and it started to work.

- After unsuccessful payment the membership was still created for the user. It was because I was creating the membership in the wrong webhook event. I was creating it in the `subscription.created` event, but it should be created in the `invoice.paid` or `invoice.finalized` events. I fixed it by creating the membership in the `invoice.paid` event.

- There were multiple bugs with frontend pages not loading correctly for a logged in user. It's all was because I am very new to React and I was not using the `useState`, `useEffect`, `useRef` hooks, and redux store state management correctly. The page was trying to load with the information it doesn't have yet or doesn't have already, and it was causing errors. I fixed it by learning more about React page loading lifecycle and using all the function calls in the right order.

- User was receiving multiple emails about the same purchase. It was because of the typo in the webhook event listener. Code was breaking after the email sent, but before the webhook returned 200 response to Stripe. So, Stripe tried to send the webhook again, and it was causing the email to be sent again. I fixed the typo and now the code is working as intended.

- When the host of a meeting pressed `Mute All` button, all current participants were muted, but new participants were not muted. I fixed it by adding code for each peer in the room to share information about the current room state with the new peer.

- When opening pages with a lot of scrollable content, scrolling down, and then opening another page, the scroll position was not reset to the top of the page. I fixed it by adding `window.scrollTo(0, 0)` in the `useEffect` hook to such pages.