release: python manage.py migrate 
web: python manage.py collectstatic --noinput && gunicorn portfolio.wsgi --workers=2 --threads=2 --timeout=300 --log-file -
