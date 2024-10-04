#!/bin/bash

echo "BUILD START"

# Ensure pip is installed
python3 -m ensurepip --upgrade

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Upgrade pip to the latest version
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Collect static files
python3 manage.py collectstatic --noinput

echo "BUILD END"
