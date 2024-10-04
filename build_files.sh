#!/bin/bash

echo "BUILD START"

# Ensure pip is installed
python3 -m ensurepip --upgrade

# Install PostgreSQL and dependencies
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib libpq-dev

# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
source venv/bin/activate

# Upgrade pip to the latest version
pip install --upgrade pip

# Install dependencies, using psycopg2-binary
pip install -r requirements.txt
pip install psycopg2-binary

# Collect static files
python3 manage.py collectstatic --noinput

echo "BUILD END"
