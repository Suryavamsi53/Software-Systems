#!/bin/bash

# ------------------------------------------------------------------
#  Helper script to commit and push changes to the remote repository
# ------------------------------------------------------------------

# Ensure we are in the project root (where this script resides)
cd "$(dirname "$0")"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: This directory is not a git repository."
    echo "Run 'git init' to initialize it first."
    exit 1
fi

# Show status
echo "📊 Git Status:"
git status -s

# Check if there are changes
if [ -z "$(git status --porcelain)" ]; then
    echo "✨ No changes to commit."
    exit 0
fi

echo ""
echo "📦 Adding files..."
echo "  $ git add ."
git add .

# Get commit message
if [ -z "$1" ]; then
    echo "Enter commit message (Press Enter for default: 'Update site content'):"
    read user_msg
    COMMIT_MSG=${user_msg:-"Update site content"}
else
    COMMIT_MSG="$1"
fi

echo "💾 Committing: '$COMMIT_MSG'..."
echo "  $ git commit -m \"$COMMIT_MSG\""
git commit -m "$COMMIT_MSG"

# Check if remote 'origin' exists before pushing
if ! git remote | grep -q "origin"; then
    echo "❌ Error: No remote 'origin' found."
    echo "Run: git remote add origin <your-repo-url>"
    exit 1
fi

# Push
CURRENT_BRANCH=$(git branch --show-current)
echo "🚀 Pushing to origin/$CURRENT_BRANCH..."
echo "  $ git push origin \"$CURRENT_BRANCH\""
git push origin "$CURRENT_BRANCH"

echo "✅ Success! Updates pushed."