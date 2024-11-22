# Password Manager

A simple password manager built with Node.js, Express.js, MongoDB, and Tailwind CSS.

## Features

- Add, edit, view, and delete passwords.
- Search functionality.
- Strong password generator (optional).
- Categorization and user authentication (future updates).

## Setup

1. Clone the repository: `git clone https://github.com/your-username/password-manager.git`
2. Install dependencies: `npm install`
3. Set up `.env` file:
ex:

```
MONGO_URI=mongodb://localhost:27017/password-manager
PORT=3009
```

4. Run the app: `npm start`

Here’s a step-by-step guide to install Node.js version 20 or above on **macOS**, **Linux**, and **Windows**.

---

### **1. macOS**
#### Using Homebrew
1. **Install Homebrew** (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. **Install Node.js**:
   ```bash
   brew install node@20
   ```
3. **Verify Installation**:
   ```bash
   node -v
   npm -v
   ```
---

### **2. Linux**
#### Using NVM
1. **Install NVM**:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
   ```
   Restart your terminal or run:
   ```bash
   source ~/.bashrc
   ```
2. **Install Node.js**:
   ```bash
   nvm install 20
   ```
3. **Set Node.js Version**:
   ```bash
   nvm use 20
   nvm alias default 20
   ```
4. **Verify Installation**:
   ```bash
   node -v
   npm -v
   ```

---

### **3. Windows**
#### Using the Installer
1. **Download Node.js Installer**:
   - Visit the [Node.js Downloads Page]([https://nodejs.org/](https://nodejs.org/en/download/prebuilt-installer)).
   - Download the latest Node.js 20.x LTS or Current version for Windows.
2. **Run the Installer**:
   - Follow the installation prompts.
   - Ensure you check the option to install **npm**.
3. **Verify Installation**:
   Open Command Prompt and run:
   ```cmd
   node -v
   npm -v
   ```

---

### **Common Steps After Installation**
1. **Update npm (Optional)**:
   ```bash
   npm install -g npm@latest
   ```
