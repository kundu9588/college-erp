# Complete Setup Guide for College ERP Development on Windows 10

Let's set up your entire development environment step by step. I'll guide you through installing everything you need to start building your college ERP system.

## **Step 1: Install Core Development Tools**
 
### **Install Node.js**
1. Go to [nodejs.org](https://nodejs.org/) and download the **LTS version** (recommended for most users)
2. Run the installer and follow the setup wizard
3. **Important:** Check "Automatically install the necessary tools" during installation
4. Verify installation by opening **Command Prompt** or **PowerShell** and running:
```bash
node --version
npm --version
```

### **Install Git**
1. Download Git from [git-scm.com](https://git-scm.com/download/win)
2. During installation, choose these options:
   - **Default editor:** Use Visual Studio Code as Git's default editor
   - **Path environment:** Git from the command line and also from 3rd-party software
   - **Line ending conversions:** Checkout Windows-style, commit Unix-style
3. Verify installation:
```bash
git --version
```

### **Install GitHub CLI**
Choose one of these methods:

**Option A: Using Winget (Recommended)**
```bash
winget install --id github.cli
```

**Option B: Manual Installation**
1. Go to [cli.github.com](https://cli.github.com/)
2. Download and install the Windows MSI package
3. Verify installation:
```bash
gh --version
```

## **Step 2: Install PostgreSQL**

### **Download and Install**
1. Go to [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Download the PostgreSQL installer for Windows
3. Run the installer with these settings:
   - **Installation directory:** Use default (C:\Program Files\PostgreSQL\16)
   - **Components:** Select all (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools)
   - **Data directory:** Use default
   - **Password:** Set a strong password for the `postgres` user (remember this!)
   - **Port:** Use default (5432)
   - **Locale:** Use default

### **Verify Installation**
1. Open **Command Prompt** and run:
```bash
psql --version
```
2. Connect to PostgreSQL:
```bash
psql -U postgres -h localhost
# Enter the password you set during installation
```

## **Step 3: Set Up VS Code**

### **Install Essential Extensions**
Open VS Code and install these extensions (Ctrl+Shift+X to open Extensions panel):

**Core Extensions:**
- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **ESLint** (dbaeumer.vscode-eslint)
- **Auto Rename Tag** (formulahendry.auto-rename-tag)
- **Bracket Pair Colorizer** (Now built-in to VS Code)

**Database Extensions:**
- **PostgreSQL** (ckolkman.vscode-postgres)
- **SQL Tools** (mtxr.sqltools)

**Git & Collaboration:**
- **GitLens** (eamodio.gitlens)
- **Git Graph** (mhutchie.git-graph)

**Additional Useful Extensions:**
- **Code Spell Checker** (streetsidesoftware.code-spell-checker)
- **Thunder Client** (rangav.vscode-thunder-client) - API testing
- **npm Intellisense** (christian-kohler.npm-intellisense)

## **Step 4: Create Your Project Structure**

### **Initialize Your Repository**
1. Create a new folder for your project:
```bash
mkdir college-erp
cd college-erp
```

2. Initialize Git repository:
```bash
git init
git branch -M main
```

3. Create the project structure:
```bash
mkdir frontend backend docs
```

### **Set up Backend (Node.js + Express)**
```bash
cd backend
npm init -y
npm install express cors helmet morgan dotenv bcrypt jsonwebtoken
npm install -D nodemon jest supertest eslint prettier
```

### **Set up Frontend (React)**
```bash
cd ../frontend
npx create-react-app . --template typescript
npm install axios react-router-dom @types/react-router-dom
```

## **Step 5: Configure Development Tools**

### **Set up Husky and Commitlint**
From your project root directory:

```bash
# Install Husky and commitlint
npm install -D husky @commitlint/cli @commitlint/config-conventional

# Initialize Husky
npx husky init

# Add commit-msg hook
npx husky add .husky/commit-msg 'npx commitlint --edit "$1"'
```

### **Create Configuration Files**

**commitlint.config.js** (in project root):
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New features
        'fix',      // Bug fixes
        'docs',     // Documentation
        'style',    // Formatting, missing semicolons, etc
        'refactor', // Code restructuring
        'test',     // Adding tests
        'chore',    // Maintenance tasks
        'ci'        // CI/CD changes
      ]
    ]
  }
};
```

**package.json** (update scripts section):
```json
{
  "scripts": {
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm start",
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "test": "npm run test:backend && npm run test:frontend",
    "test:backend": "cd backend && npm test",
    "test:frontend": "cd frontend && npm test"
  }
}
```

### **Install Concurrently** (to run both frontend and backend):
```bash
npm install -D concurrently
```

## **Step 6: Set up GitHub Repository**

### **Create GitHub Repository**
1. Go to [github.com](https://github.com) and create a new repository named `college-erp`
2. Don't initialize with README (we already have a local repo)

### **Connect Local Repository to GitHub**
```bash
# Authenticate with GitHub
gh auth login
# Follow the prompts to authenticate

# Add remote origin
git remote add origin https://github.com/YOUR-USERNAME/college-erp.git

# Create initial commit
git add .
git commit -m "feat: initial project setup"
git push -u origin main
```

## **Step 7: Set up Branch Protection**

### **Create Branch Protection Rule**
```bash
# Using GitHub CLI
gh api \
  -X PUT \
  -H "Accept: application/vnd.github+json" \
  repos/YOUR-USERNAME/college-erp/branches/main/protection \
  -f required_pull_request_reviews='{"required_approving_review_count":1}' \
  -f enforce_admins=true \
  -f required_status_checks='{"strict":true,"contexts":[]}' \
  -f restrictions='null'
```

Or set up through GitHub web interface:
1. Go to your repository on GitHub
2. Settings → Branches
3. Add rule for `main` branch
4. Enable: "Require a pull request before merging"
5. Enable: "Require approvals"

## **Step 8: Create Initial Project Files**

### **Backend Server Setup** (`backend/server.js`):
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'College ERP API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
```

### **Environment File** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=college_erp
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your-super-secret-jwt-key
```

### **Backend Package.json Scripts** (`backend/package.json`):
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### **CODEOWNERS File** (project root):
```
# Global owners
* @YOUR-USERNAME

# Backend code
/backend/ @backend-team-lead
/backend/auth/ @auth-developer
/backend/student/ @student-module-dev

# Frontend code  
/frontend/ @frontend-team-lead
/frontend/src/components/ @ui-developer

# Documentation
/docs/ @tech-writer
README.md @YOUR-USERNAME
```

### **Main README.md**:
```markdown
# College ERP System

A comprehensive Enterprise Resource Planning system for educational institutions.

## Tech Stack
- **Frontend:** React + TypeScript
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **Authentication:** JWT

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run development servers: `npm run dev`

## Team Collaboration
- Use feature branches for all development
- Follow conventional commits (feat:, fix:, docs:)
- Require PR reviews before merging
- Run tests before pushing code

## Project Structure
```
college-erp/
├── frontend/          # React application
├── backend/           # Node.js API server
├── docs/             # Documentation
└── database/         # SQL schemas and migrations
```
```

## **Step 9: Set up Database**

### **Create Database and User**
Open **pgAdmin** or **psql** and run:
```sql
-- Create database
CREATE DATABASE college_erp;

-- Create application user (optional, for better security)
CREATE USER erp_app WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE college_erp TO erp_app;
```

## **Step 10: Test Your Setup**

### **Test Backend**
```bash
cd backend
npm run dev
# Should start server on http://localhost:5000
```

Test the API:
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"OK","message":"College ERP API is running"}
```

### **Test Frontend**
```bash
cd frontend
npm start
# Should open browser at http://localhost:3000
```

### **Test Git Workflow**
```bash
# Create a feature branch
git checkout -b feature/test-setup

# Make a small change
echo "# Test change" >> test.md
git add test.md
git commit -m "feat: add test file for setup verification"

# Push and create PR
git push -u origin feature/test-setup
gh pr create --base main --title "Test setup" --body "Testing development workflow"
```

## **Step 11: VS Code Workspace Setup**

### **Create Workspace File** (`.vscode/settings.json`):
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.workingDirectories": ["backend", "frontend"],
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/build": true,
    "**/dist": true
  }
}
```

## **Next Steps: Start Development**

Now you're ready to begin building your ERP system! Here's your immediate roadmap:

1. **Set up CI/CD Pipeline** (GitHub Actions)
2. **Create Database Schema** for core entities
3. **Build Authentication Module** (first service)
4. **Create Basic React Components**
5. **Set up API Documentation** (Swagger/OpenAPI)

Your team can now:
- Clone the repository and run `npm install && npm run dev`
- Create feature branches for individual tasks
- Use conventional commits (enforced by commitlint)
- Create pull requests that require reviews
- Collaborate safely with protected main branch

**Pro Tips:**
- Use `gh pr create` to quickly create PRs from CLI
- Set up VS Code debugging for both Node.js and React
- Use Thunder Client extension for API testing
- Keep commits small and focused
- Update documentation as you build features
