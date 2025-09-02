# Complete Git Workflow: From Feature Branch to Main

Here's the complete step-by-step process for adding new code, testing it, and safely merging it to main using Git branches.

## **Step 1: Start a New Feature**

### **Always Start Fresh from Main**
```bash
# Make sure you're on main branch
git checkout main

# Get the latest changes from remote
git pull origin main

# Create and switch to a new feature branch
git checkout -b feature/student-registration
```

**Branch Naming Convention:**
- `feature/description` - For new features
- `fix/bug-description` - For bug fixes
- `chore/task-description` - For maintenance tasks
- `docs/update-description` - For documentation

## **Step 2: Work on Your Feature**

### **Make Your Code Changes**
1. Open VS Code and make your changes
2. Add new files, modify existing ones
3. Write tests for your new code

**Example: Adding a student registration endpoint**
```javascript
// backend/routes/students.js
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, program } = req.body;
    
    // Validation
    if (!name || !email || !program) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Your registration logic here
    const student = { id: Date.now(), name, email, program };
    
    res.status(201).json({ success: true, student });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
```

## **Step 3: Test Your Changes**

### **Run Tests Locally**
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd ../frontend
npm test

# Run both at once (from project root)
npm run test
```

### **Manual Testing**
```bash
# Start your development servers
npm run dev

# Test your endpoints using Thunder Client in VS Code or curl
curl -X POST http://localhost:5000/api/students/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","program":"Computer Science"}'
```

## **Step 4: Commit Your Changes**

### **Stage and Commit**
```bash
# Check what files have changed
git status

# Add specific files
git add backend/routes/students.js
git add backend/tests/students.test.js

# Or add all changes (be careful!)
git add .

# Commit with conventional commit message
git commit -m "feat: add student registration endpoint

- Add POST /api/students/register route
- Include validation for required fields
- Add unit tests for registration logic
- Handle error cases properly"
```

**Conventional Commit Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code formatting (no logic changes)
- `refactor:` - Code restructuring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## **Step 5: Push Branch to Remote**

### **Push Your Feature Branch**
```bash
# Push branch to GitHub (first time)
git push -u origin feature/student-registration

# For subsequent pushes
git push
```

## **Step 6: Create Pull Request**

### **Using GitHub CLI (Recommended)**
```bash
# Create PR with title and description
gh pr create \
  --base main \
  --head feature/student-registration \
  --title "feat: add student registration endpoint" \
  --body "## Changes
- Add student registration API endpoint
- Include input validation
- Add comprehensive tests
- Error handling for edge cases

## Testing
- ✅ Unit tests pass
- ✅ Manual testing completed
- ✅ API responds correctly to valid/invalid inputs

## Checklist
- [x] Code follows project conventions
- [x] Tests added and passing
- [x] Documentation updated
- [x] No breaking changes"
```

### **Using GitHub Web Interface**
1. Go to your repository on GitHub
2. You'll see a banner "Compare & pull request"
3. Click it and fill in the details
4. Click "Create pull request"

## **Step 7: Code Review Process**

### **What Happens Next**
1. **Automated Checks Run**: CI/CD pipeline runs tests
2. **Team Review**: Colleagues review your code
3. **Address Feedback**: Make changes if requested
4. **Approval**: Once approved, ready to merge

### **Handling Review Feedback**
```bash
# Make requested changes
# ... edit files ...

# Commit additional changes
git add .
git commit -m "fix: address review feedback

- Update validation logic
- Fix edge case in error handling
- Add missing documentation"

# Push updates (automatically updates the PR)
git push
```

## **Step 8: Merge to Main**

### **When PR is Approved**
```bash
# Merge via GitHub CLI
gh pr merge --squash --delete-branch

# Or use GitHub web interface
# Click "Squash and merge" button
```

**Merge Options:**
- **Squash and merge** (Recommended): Combines all commits into one clean commit
- **Create merge commit**: Preserves commit history
- **Rebase and merge**: Replays commits without merge commit

## **Step 9: Clean Up**

### **Update Local Repository**
```bash
# Switch back to main
git checkout main

# Pull the latest changes (including your merged feature)
git pull origin main

# Delete the local feature branch
git branch -d feature/student-registration

# Clean up remote tracking branches
git remote prune origin
```

## **Step 10: Repeat for Next Feature**

### **Start Next Feature**
```bash
# Always start fresh from updated main
git checkout main
git pull origin main
git checkout -b feature/student-profile-page
```

## **Complete Workflow Script**

Here's a script you can save and use for the complete workflow:

**create-feature.sh** (save in project root):
```bash
#!/bin/bash

# Usage: ./create-feature.sh "student-registration" "Add student registration endpoint"

BRANCH_NAME="feature/$1"
COMMIT_MESSAGE="feat: $2"

echo "🚀 Starting new feature: $BRANCH_NAME"

# Update main and create feature branch
git checkout main
git pull origin main
git checkout -b $BRANCH_NAME

echo "✅ Created and switched to branch: $BRANCH_NAME"
echo "📝 Now make your changes and use:"
echo "   git add ."
echo "   git commit -m \"$COMMIT_MESSAGE\""
echo "   git push -u origin $BRANCH_NAME"
echo "   gh pr create --base main --fill"
```

## **Common Commands Quick Reference**

```bash
# Daily workflow
git status                              # Check current changes
git add .                              # Stage all changes
git commit -m "feat: description"     # Commit with message
git push                               # Push to current branch
gh pr create --base main --fill        # Create PR

# Branch management
git checkout main                      # Switch to main
git pull origin main                   # Update main
git checkout -b feature/new-feature    # Create new branch
git branch -d feature/old-feature      # Delete merged branch

# Emergency fixes
git stash                              # Save current work
git checkout main                      # Switch to main
git checkout -b hotfix/urgent-fix     # Create hotfix branch
# ... make fix, commit, push, PR ...
git checkout feature/original-work    # Go back to work
git stash pop                         # Restore saved work
```

## **Best Practices**

### **Do's**
- ✅ Always start from updated main
- ✅ Keep branches small and focused
- ✅ Write descriptive commit messages
- ✅ Test thoroughly before pushing
- ✅ Request reviews from team members
- ✅ Delete branches after merging

### **Don'ts**
- ❌ Don't work directly on main
- ❌ Don't commit untested code
- ❌ Don't make branches too large
- ❌ Don't skip code reviews
- ❌ Don't force push to shared branches

## **Handling Merge Conflicts**

If you encounter conflicts when merging:

```bash
# Update your branch with latest main
git checkout feature/your-branch
git fetch origin
git merge origin/main

# Resolve conflicts in VS Code
# Look for <<<<<<< markers
# Choose which changes to keep
# Remove conflict markers

# After resolving conflicts
git add .
git commit -m "fix: resolve merge conflicts"
git push
```

This workflow ensures your code is thoroughly tested, reviewed, and safely integrated into the main codebase while maintaining a clean Git history and enabling effective team collaboration!