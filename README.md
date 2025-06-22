# socialfi - Social Trading Platform

**socialfi** is a social trading platform where users can share their trading positions, discover new opportunities, and connect with other traders. Built with React Native, Expo, and Solana blockchain integration, socialfi makes it easy to share and discover profitable trading strategies.

> **Note:** This is the frontend repository. The backend server code can be found at [socialfi-backend](https://github.com/ved08/socialfi-backend).

## 🚀 Features

- Share your trading positions with the community
- Discover trending tokens and trades
- View detailed token information and price charts
- Connect with other traders
- Real-time trade updates

## 🛠 Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator or physical device with Expo Go app

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/socialfi-frontend.git
cd socialfi-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# After starting the backend server (see step 5), update this URL with your local backend URL
# For example: http://localhost:3000 or your deployed backend URL
BACKEND_URL=http://localhost:3000
```

### 4. Start the Development Server

```bash
# Start the Expo development server
npx expo start
```

This will open the Expo Developer Tools in your browser. From here, you can:
- Press `i` to open in iOS Simulator
- Press `a` to open in Android Emulator
- Scan the QR code with your phone's camera (iOS) or Expo Go app (Android)

### 5. Start the Backend Server

Before running the app, make sure to start the backend server:

1. Clone the backend repository:
   ```bash
   git clone https://github.com/ved08/socialfi-backend.git
   cd socialfi-backend
   ```

2. Follow the setup instructions in the backend repository's README

3. Start the backend server (typically):
   ```bash
   npm install
   npm run dev
   ```

## 📱 Running on a Physical Device

1. Install the Expo Go app on your iOS or Android device
2. Ensure your computer and phone are on the same network
3. Scan the QR code shown in the terminal or Expo Developer Tools with your phone's camera (iOS) or Expo Go app (Android)

## 🛠 Building for Production

To create a production build:

```bash
# Install EAS CLI if you haven't already
npm install -g eas-cli

# Log in to your Expo account
eas login

# Configure the project
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- Powered by [Solana](https://solana.com/)
- Icons from [Ionicons](https://ionic.io/ionicons)
