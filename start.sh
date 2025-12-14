#!/bin/bash

# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Run the app on the Railway port
gunicorn portfolio.wsgi --bind 0.0.0.0:$PORT
