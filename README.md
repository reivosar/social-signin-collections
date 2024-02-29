# Social Sign-in Collections

This project is a collection of sample code for implementing social media sign-ins with various platforms such as Twitter, Google, Facebook, LinkedIn, and GitHub. This allows users to log in using their preferred social media accounts.

## Installation

To use this project, you need to clone it to your local machine:

```bash
git clone https://github.com/reivosar/social-signin-collections.git
cd social-signin-collections
```

Then, install the dependencies:

```bash
npm run dev
```

## Usage

1. Navigate to the root directory of the project in your terminal.
2. Run `npm start` to start the application.
3. Open [http://localhost:3000](http://localhost:3000) in your browser and click on the social login buttons.
4. You will be redirected to the login page of the social media platform where you can authenticate.
5. Upon successful authentication, you will be logged into the application.

## Technologies Used

- React.js
- FontAwesome
- OAuth Authentication

## Directory Structure

```
social-signin-collections/
│
├── src/
│   ├── components/
│   │   └── SocialLoginButtons.tsx
│   ├── App.tsx
│   └── index.tsx
│
├── public/
│   ├── index.html
│   └── ...
│
├── package.json
├── package-lock.json
└── ...
```
```
