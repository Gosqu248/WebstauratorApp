# WebstauratorApp

A cross-platform mobile application for restaurant browsing, ordering, and delivery, built with React Native and Expo. This app is the client for the Webstaurator platform. For backend/server details, see the [Webstaurator main repository](https://github.com/Gosqu248/Webstaurator).

## Features
- Restaurant listing and search
- Restaurant details and menu browsing
- Basket/cart management
- User authentication (login/register)
- Order placement and order history
- Location search and address management
- Payment integration (PayU)
- Multi-language support (i18n)
- Modern UI with navigation drawer and bottom sheets

## Project Structure
- `App.tsx`: Main entry point, navigation setup
- `src/screens/`: App screens (Home, Login, Register, Basket, Orders, etc.)
- `src/components/`: UI components (side menu, headers, basket, etc.)
- `src/services/`: API and business logic (auth, menu, order, payment, etc.)
- `src/zustand/`: State management (auth, cart, restaurant, etc.)
- `src/language/`: Internationalization (i18n)
- `assets/`: Images, icons, fonts, and animations

## Getting Started

### Prerequisites
- Node.js (>= 16.x)
- npm (>= 8.x)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/Gosqu248/WebstauratorApp
   cd WebstauratorApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the App
- Start the Expo development server:
  ```sh
  npm start
  ```
- To run on Android:
  ```sh
  npm run android
  ```
- To run on iOS:
  ```sh
  npm run ios
  ```
- To run in the browser:
  ```sh
  npm run web
  ```

## Environment Variables
Create a `.env` file in the root directory for any required API keys or environment-specific settings.

## Dependencies
- React Native, Expo
- React Navigation
- Zustand (state management)
- Axios (API requests)
- i18next (internationalization)
- Lottie (animations)
- PayU integration

See `package.json` for the full list.

## Backend/API
This app communicates with the Webstaurator backend. For API documentation, server setup, and more, refer to the [Webstaurator main README](https://github.com/Gosqu248/Webstaurator).

## License
See the main repository for license details.

---

For questions or contributions, please open an issue or pull request in the main repository.