# Custom Video Chat with React and Vonage Video API

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to start

### 1. Before starting the app

- Register and create a [Vonage Video API account](https://tokbox.com/account/user/signup)
- In the Video API account, create a new project and save the PROJECT API KEY
- In the project page, create and save a Session ID and token

### 2. Add the credentials

In the root directory of this repo, rename the `sample.env` to `.env` and add your Video API credentials.

**.env**

```.env
REACT_APP_TOKBOX_API_KEY='XXXX'
REACT_APP_TOKBOX_SESSION_ID='XXXX'
REACT_APP_TOKBOX_TOKEN='XXXX'
```

### 3. Install and run the app


```
$ npm install
$ npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## About this code

I wrote an article about this code in Japanese.

- [CPaaSのVonageとReactでビデオ通話アプリを作る](https://qiita.com/miya-start/items/8076d95ea8ff8597946f)