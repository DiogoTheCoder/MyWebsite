
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template
from flask_sslify import SSLify

app = Flask(__name__)
sslify = SSLify(app, subdomains=True)

@app.route('/')
def index():
    return render_template('index.html')

