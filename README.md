# PR-Roundup #
This project was created to allow me to monitor the status of Pull-Requests and Peer-Reviews for various projects on Github.
To configure, in the file `constants.js`, add your pertinent info.
```
USER=<your github username>
API_KEY=<an api key you set up for the app to access your github info. thekey should have unrestricted repo acceess>
ORG_URL=<The github url for your org, with trailing backslash>
PROJECTS=[<an array of the project names for your org that you wish to track>]
```

Use yarn to set up:
```
yarn
npm install -g serve
yarn build --local
serve -s build
```

Changing this file.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
