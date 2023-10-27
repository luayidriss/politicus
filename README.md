# Politicus

## About

Politicus is an information-sharing platform where users can ask questions about global political affairs and get responses from other users.

## User Stories

### Navigation & Authentication

1. **Navigation**: As a user, I can view a navbar from every page so that I can navigate easily between pages.
2. **Routing**: As a user, I can navigate through pages quickly so that I can view content seamlessly without page refresh.
3. **Authentication - Sign up**: As a user, I can create a new account so that I can access all the features for signed-up users.
4. **Authentication - Sign in**: As a user, I can sign in to the app so that I can access functionality for logged-in users.
5. **Authentication - Logged in Status**: As a user, I can tell if I am logged in or not so that I can log in if I need to.
6. **Authentication - Refreshing access tokens**: As a user, I can maintain my logged-in status until I choose to log out so that my user experience is not compromised.
7. **Navigation - Conditional rendering**: As a logged-out user, I can see sign-in and sign-up options so that I can sign in/sign up.

### Adding Questions

1. **Create questions**: As a logged-in user, I can ask questions so that I can share my inquiries with others.
2. **View a question**: As a user, I can view the details of a single question so that I can learn more about it.

### Feed

1. **View most recent questions**: As a user, I can view all the most recent questions, ordered by the latest postings so that I am up to date with the newest inquiries.
2. As a user, I can search for questions with keywords, so that I can find the questions and user profiles I am most interested in.
3. **View questions of followed users**: As a logged-in user, I can view content filtered by users I follow so that I can keep up to date with what they are posting about.
4. **Infinite scroll**: As a user, I can keep scrolling through the questions on the site that are loaded for me automatically so that I don't have to click on "next page," etc.

### The Question Page

1. **Question page**: As a user, I can view the questions page so that I can read the responses about the questions.
2. **Edit post**: As a question owner, I can edit my question title and description so that I can make corrections or update my question after it was created.
3. **Create a response**: As a logged-in user, I can add responses to a question so that I can share my thoughts about the question.
4. **Comment date**: As a user, I can see how long ago a response was made so that I know how old a response is.
5. **View responses**: As a user, I can read responses on questions so that I can read what other users think about the questions.
6. **Delete responses**: As an owner of a response, I can delete my response so that I can control the removal of my response from the application.
7. **Edit a response**: As an owner of a response, I can edit my response so that I can fix or update my existing response.

### The Profile Page

1. **Profile page**: As a user, I can view other users' profiles so that I can see their questions and learn more about them.
2. **User profile - user stats**: As a user, I can view statistics about a specific user: bio, the number of questions, responses, follows, and users followed so that I can learn more about them.
3. **Follow/Unfollow a user**: As a logged-in user, I can follow or unfollow other users so that I can see and remove questions by specific users in my posts feed.
4. **View all questions and responses by a specific user**: As a user, I can view all the questions and responses by a specific user so that I can catch up on their latest posts or decide I want to follow them.
5. **Edit profile**: As a logged-in user, I can edit my profile so that I can change my profile picture and bio.
6. **Update username and password**: As a logged-in user, I can update my username and password so that I can change my display name and keep my profile secure.

## Features

### Authentication

- **Sign-In, Sign-Out, and Registration**: Politicus provides a seamless authentication system that allows users to sign in, sign out, and register new accounts.

### Navigation & User Experience

- **User-Friendly Navigation**: A consistent and user-friendly navigation experience is offered with a top navigation bar on every page for easy access.
- **Responsive Routing**: Smooth page transitions and routing ensure that content loads seamlessly without page refresh, enhancing the overall user experience.

### Information Sharing

- **Ask Questions**: Logged-in users can create and post questions, allowing them to share their inquiries with the community.
- **Question Detail**: Users can explore individual questions to gain in-depth insights and participate in discussions.

### Content Discovery

- **View Recent Questions**: Politicus offers a comprehensive view of the most recent questions, ordered by the latest postings.
- **Keyword Search**: Users can search for questions and user profiles using keywords to discover content that aligns with their interests.
- **Followed Users**: Logged-in users can filter content based on the users they follow to stay updated on their posts.
- **Infinite Scroll**: To improve the user experience, an infinite scroll feature loads questions automatically, eliminating the need to navigate through multiple pages.

### Interaction & Engagement

- **Add Responses**: Users can engage with questions by posting responses to share their thoughts and insights.
- **Response Management**: Response creators can edit or delete their responses, giving them control over their contributions.
- **View Responses**: Users can read responses to questions to gain a better understanding of the community's perspectives.

### User Profiles

- **Explore User Profiles**: Users can visit the profiles of other users to learn more about their contributions and interests.
- **User Stats**: Detailed statistics on user profiles include bios, the number of questions, responses, followers, and users followed.
- **Follow/Unfollow**: Logged-in users can follow or unfollow other users to customize their content feed.
- **Edit Profile**: Users can personalize their profiles by updating their profile picture and bio.
- **Security**: Users can update their username and password to manage their display name and account security effectively.

## Design

- **Colors**: Simple off-white-grey background and dark navbar.

## Database

**Tables**:
- Followers:

| Field Name | Field Type                                |
|------------|------------------------------------------|
| follower   | ForeignKey to `CustomUser` (related_name='following_set') |
| following  | ForeignKey to `CustomUser`  (related_name='followers_set') |

- Questions:

| Field Name | Field Type                                |
|------------|------------------------------------------|
| question   | CharField with a maximum length of 255  |
| description | TextField                            |
| user       | ForeignKey to `CustomUser` with `on_delete=models.CASCADE` (default=1) |

- Responses:

| Field Name | Field Type                                |
|------------|------------------------------------------|
| response   | TextField                                |
| question   | ForeignKey to the `Question` model with `on_delete=models.CASCADE` |
| user       | ForeignKey to `CustomUser` with `on_delete=models.CASCADE` (default=1) |
| additional_resources | URLField that is nullable and blank |

- User Profiles:

| Field Name | Field Type                                |
|------------|------------------------------------------|
| profile_picture | CloudinaryField for profile pictures with a custom folder 'politicus_avatars' |
| bio        | TextField with a maximum length of 500, nullable and blank |
| email      | EmailField with a maximum length of 254, unique |
| username   | CharField with a maximum length of 150, unique |
| birth_date | DateField, nullable and blank           |
| first_name | CharField with a maximum length of 50, nullable |
| last_name  | CharField with a maximum length of 50, nullable |
| country    | CharField with a maximum length of 100, nullable |
| Custom manager `CustomUserManager` to create users and superusers |


## Testing
Please refer to the [TESTING.md](TESTING.md) file for all test-related documentation.


## Deployment

- The app was deployed to [Heroku](https://heroku.com/).

- **The app can be reached by the [link](https://dr-meetings.onrender.com/).**


## Credits

- GitHub for giving me the platform to design my project.
- Django for the framework.
- Django Rest Framework for the API functionality.
- Render for providing a free database.

## Acknowledgements

I would like to thank my Mentor, Alex Konovalov, for his detail oriented work and his consistent support.

I would also like to thank my sister, for her unwavering emotional support.