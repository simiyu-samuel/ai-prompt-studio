## **AI Prompt Studio: Documentation**

This document provides a complete guide to installing, using, and customizing the AI Prompt Studio application.

### **1. Introduction**

AI Prompt Studio is a premium, production-ready web application designed for managing AI prompts with advanced organization features. Built with a modern React and TypeScript stack, it provides a complete, offline-ready solution for content creators, developers, and AI enthusiasts to organize their prompt libraries efficiently.

### **2. Installation & Setup**

Follow these steps to get your AI Prompt Studio instance up and running.

#### **2.1. Prerequisites**

Make sure you have [Node.js](https://nodejs.org/) and `npm` (or a compatible package manager) installed on your system.

#### **2.2. Quick Start**

1.  **Extract the Files**: Unzip the downloaded product package to a directory of your choice.
2.  **Install Dependencies**: Open your terminal, navigate to the project's root directory, and run the following command to install the required dependencies:
    ```bash
    npm install
    ```
3.  **Run Development Server**: Start the Vite development server by running:
    ```bash
    npm run dev
    ```
4.  **Open the App**: Once the server is running, open your web browser and navigate to `http://localhost:5173` to see the application live.

#### **2.3. Building for Production**

When you are ready to deploy the application, you can create an optimized production build.

1.  **Build the Application**:
    ```bash
    npm run build
    ```
    This command compiles the application into a `dist` folder, optimized for production.
2.  **Preview the Production Build**: To test the production build locally, run:
    ```bash
    npm run preview
    ```

### **3. Core Features**

AI Prompt Studio comes packed with features to streamline your prompt management workflow.

*   **Prompt Management**: Create, edit, and delete prompts with ease.
*   **Organization**:
    *   Assign prompts to custom categories.
    *   Use a flexible tagging system.
    *   Group prompts into colored **Prompt Packs**.
*   **Search and Filtering**:
    *   Search prompts by title, content, or description.
    *   Filter results by category, tags, and prompt packs.
*   **Data Management**:
    *   Export prompts to JSON or TXT formats.
    *   Import prompts from JSON files.
    *   All data is persisted in your browser's local storage.
*   **Analytics**: A comprehensive statistics dashboard to track prompt usage and category breakdowns.
*   **User Experience**:
    *   Modern, intuitive interface with a dark/light theme.
    *   One-click copy-to-clipboard functionality.
    *   Toast notifications for user feedback.
    *   Fully responsive design for desktop, tablet, and mobile.

### **4. Technical Documentation**

#### **4.1. Technical Stack**

*   **React 18**: The core frontend library.
*   **TypeScript**: Ensures type safety and improves code maintainability.
*   **Vite**: A fast build tool and development server.
*   **Tailwind CSS**: A utility-first CSS framework for styling.
*   **Lucide React**: A library of beautiful and customizable icons.
*   **Context API**: Used for efficient state management, particularly for themes.

#### **4.2. Dependencies**

The project relies on the following key dependencies:

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-hot-toast": "^2.4.1",
  "lucide-react": "^0.344.0"
}
```

#### **4.3. File Structure**

The codebase is organized into a modular architecture for clarity and maintainability.

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Main navigation header
│   ├── PromptCard.tsx  # Individual prompt display
│   ├── PromptForm.tsx  # Prompt creation/editing
│   ├── PromptPacks.tsx # Pack management
│   ├── SearchFilter.tsx # Search and filtering
│   └── Statistics.tsx  # Analytics dashboard
├── context/            # React context providers
│   └── ThemeContext.tsx # Theme management
├── hooks/              # Custom React hooks
│   └── useLocalStorage.ts # Local storage hook
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── utils/              # Utility functions
│   └── export.ts       # Export functionality
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### **5. Customization**

The application is designed to be easily customizable.

*   **Theming**: Modify colors and other design tokens directly in the `tailwind.config.js` file. The application uses a comprehensive color system (Primary, Secondary, Success, etc.) that can be easily updated.
*   **Components**: The modular, component-based architecture allows you to modify or extend specific parts of the UI without affecting others.
*   **Type-Safe Changes**: With TypeScript, any customizations you make are type-safe, reducing the risk of runtime errors.

#### **5.1. Design System**

*   **Colors**:
    *   **Primary**: Indigo (500-600)
    *   **Secondary**: Purple (500-600)
    *   **Neutral**: Gray (50-900)
*   **Typography**:
    *   **Font**: Inter (from Google Fonts)
    *   **Weights**: 300, 400, 500, 600, 700
*   **Spacing**: A consistent 8px base unit is used for spacing and layout.

### **6. Browser Support**

The application is tested and supported on the following modern browsers:

*   Chrome 90+
*   Firefox 88+
*   Safari 14+
*   Edge 90+

### **7. Support**

Your purchase includes access to the following support channels:

*   **Email Support**: Direct developer support for 6-12 months, depending on your license.
*   **Documentation**: A complete guide covering setup, customization, and deployment.
*   **Updates**: Bug fixes and minor updates will be provided.