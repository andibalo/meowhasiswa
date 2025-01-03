# About

Anonymous forum-based social media app targeted for University and School Students. 

<img  src="https://i.redd.it/pa049v3v4tfc1.jpeg"  alt="vro"  width="350"/>

## Installation

Ensure you have the following installed
- Expo
- node >= 21.7.3
- yarn >= 4.5.0 

Install dependencies by running:
```
yarn
```

Run development server by using the command below:
```
npx expo start
```

## Tech Stack

- Redux Toolkit
- Expo
- Expo Router
- Tamagui UI
- Redux Toolkit
- RTK Query
- yup + React Hook Form

## Project Structure

+ **/app** : This folder contains application routes and screens
+ **/components** : This folder contains components for screens
+ **/config** : This folder contains application config, at the moment only contains config for firebase
+ **/constants** : This folder contains application constants such as application name, theme color, etc.
+ **/hooks** : This folder contains reusable hooks such as useToast
+ **/redux** : This folder contains redux related files including root store,slices and RTK Api
+ **/services** : This folder contains functions that calls api such as user api
+ **/types** : This folder contains typescript types for request,response, etc.
+ **/utils** : This folder contains utility functions



