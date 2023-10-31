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

- No errors or warnings were found when passing through the official [W3C](https://validator.w3.org/) validator. This was done manually passing the app url to the validator.
- [HTML validation report](https://github.com/luayidriss/politicus/blob/fd874fab08e40ebe8861957d15c16499a6ba144e/validations/html.png)

### CSS Validation:

- [Full CSS Validation Report](https://github.com/luayidriss/politicus/blob/fd874fab08e40ebe8861957d15c16499a6ba144e/validations/css.png)
- For css validation I have used the official [W3C (Jigsaw)](https://jigsaw.w3.org/css-validator/#validate_by_uri) validator

### JS Validation:

- React itself validates the code on each build, and if there were any errors, the application would not be able to run.
- Since it runs correctly, we can consider all the code to be valid.

### Python Validation:

- [Full Python Validation Report](https://github.com/luayidriss/politicus/tree/fd874fab08e40ebe8861957d15c16499a6ba144e/validations/python)
- For python validation I have used the official [PythonChecker](https://www.pythonchecker.com/) validator

---