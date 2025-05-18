# 🏫 Campus Commune Client

A responsive and modern frontend application for the Campus Commune platform, facilitating seamless communication and collaboration among students, faculty, and campus communities. Built with React, TypeScript, and Tailwind CSS, and optimized using Vite for rapid development and deployment.

---

## 🚀 Features

- **User Authentication**: Secure login and registration functionalities.
- **Community Forums**: Engage in topic-based discussions and knowledge sharing.
- **Responsive Design**: Optimized for desktops, tablets, and mobile devices.

---

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Bundler**: Vite
- **Linting**: ESLint

---

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/vek422/campus-commune-client.git
   cd campus-commune-client
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the Application**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:5173` to view the application.

---

## 📚 Usage

This frontend application is designed to work in conjunction with the [Campus Commune Backend](https://github.com/vek422/campus-commune-backend). Ensure the backend is running to enable full functionality.

---

## 🧪 Testing

_Note: Testing is currently not implemented. Plans are in place to add comprehensive unit and integration tests using frameworks like Jest and React Testing Library._

---

## 📁 Project Structure

```plaintext
campus-commune-client/
├── public/                 # Static assets
│   ├── logo.svg
│   ├── Monteserrat/        # Font files
│   └── Oswald/             # Font files
├── src/                    # Source code
│   ├── assets/             # SVG assets and images
│   ├── components/         # Reusable UI components
│   │   ├── Thread/         # Thread-related components
│   │   ├── Loaders/        # Loading components
│   │   └── ui/             # Shadcn UI components
│   ├── config/             # Configuration files
│   ├── context/            # React context providers
│   ├── forms/              # Form components
│   ├── hooks/              # Custom React hooks
│   │   └── api/            # API-related hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   │   ├── auth/           # Authentication pages
│   │   └── Commune/        # Commune-related pages
│   ├── store/              # State management
│   │   └── reducers/       # Redux reducers
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Entry point
│   └── router.ts           # Application routing
├── Dockerfile              # Docker configuration
├── nginx.conf              # Nginx configuration
├── components.json         # Shadcn UI configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

---

## 📸 Application Screenshots

### Login and Registration

![Login Screen](./demo/Screenshot%202025-01-23%20132659.png)
![Registration](./demo/Screenshot%202025-01-23%20132946.png)

### Home and Feeds

![Home Feed](<./demo/Screenshot%20(52).png>)
![Thread View](<./demo/Screenshot%20(53).png>)

### Commune Features

![Commune View](<./demo/Screenshot%20(54).png>)
![Member Management](<./demo/Screenshot%20(57).png>)

### Interactive Elements

![Thread Creation](<./demo/Screenshot%20(58).png>)
![Navigation Elements](<./demo/Screenshot%20(59).png>)
![User Profile](<./demo/Screenshot%20(60).png>)

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review. For major changes, open an issue first to discuss proposed modifications.

---
