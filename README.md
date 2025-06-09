# 🏀 SportsPredictionApp

An iOS-style sports prediction mobile app built with React Native, allowing users to view live games, make predictions, and track their virtual balance and win/loss history.

---

## 📱 Features

- 🧾 **Game List Screen**
  - View upcoming, live, and completed games
  - Odds and favorite info
  - iOS-style card UI with shadow and rounded corners

- 📊 **Game Detail Screen**
  - Match-up details (teams, records, odds)
  - Prediction options: Home / Away / Cover the Spread

- 👤 **User Profile**
  - Prediction history with results and payouts
  - Track win/loss stats and virtual balance

- 🧩 **Reusable Components**
  - Custom buttons, cards, and input elements

- 🎨 iOS look & feel using native styling

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js ≥ 16.x
- React Native CLI
- Xcode (for iOS)
- CocoaPods
- [`json-server`](https://github.com/typicode/json-server) for mock backend

### 🔧 Installation

```bash
# Clone repo
git clone https://github.com/your-username/SportsPredictionApp.git
cd SportsPredictionApp

# Install dependencies
npm install

# Install pods for iOS
cd ios && pod install && cd ..

# Install json-server globally (if not already)
npm install -g json-server

# Start the local API server:
json-server --watch db.json --port 3000

# Start the app on iOS:
npx react-native run-ios
