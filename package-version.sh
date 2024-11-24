#!/bin/bash

# source: chatgpt
# gets package version for deployment pipeline


# Check if package.json exists in the current directory
if [[ ! -f package.json ]]; then
  echo "package.json not found in the current directory."
  exit 1
fi

# Use jq if available to get the version
if command -v jq &> /dev/null; then
  version=$(jq -r '.version' package.json)
else
  # Use grep and sed if jq is not available
  version=$(grep '"version"' package.json | sed -E 's/.*"version": *"([^"]+)".*/\1/')
fi

# Check if version was found
if [[ -z "$version" ]]; then
  echo "Version not found in package.json"
  exit 1
else
  echo "$version"
fi
