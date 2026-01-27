#!/bin/bash

# Ensure we are in the script's directory so we serve the correct files
cd "$(dirname "$0")"

# Try to find python3 or python
if command -v python3 &> /dev/null; then
    python3 serve.py
elif command -v python &> /dev/null; then
    python serve.py
else
    echo "❌ Error: Python is not installed."
    echo "Please install Python from https://python.org"
    exit 1
fi