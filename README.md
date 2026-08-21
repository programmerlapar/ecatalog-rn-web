# ecatalog-rn-web

E-Catalog React Native Web

This project using React Native, React Native Web, React Router, React Reveal and Expo

## Web deployment

Netlify should use `yarn build:web` as its build command and publish the generated `dist`
directory. The web build does not run the native prebuild step, so it can run in a deploy
environment without Android or iOS toolchains.

## Native development

Install Android Studio for Android development or Xcode for iOS development. The first
`npm start` runs `npx expo prebuild` automatically when the native projects are missing.
Build and install the development client before starting Metro:

```sh
npm install
npx expo run:android # or: npx expo run:ios
npm start
```

After native configuration changes, rerun `npx expo prebuild` and rebuild the development
client. `npm start` requires that a compatible development-client binary is installed on
the simulator, emulator, or connected device; it does not run in Expo Go.

Deploy site: 
https://cafe-menu-react-native-web.netlify.app/

Screens: 
<img src="https://github.com/imanesaurus/ecatalog-rn-web/blob/master/assets/screens.png?raw=true" />
