from flask import Flask, render_template
from flask_sslify import SSLify
import requests, sys

app = Flask(__name__)
sslify = SSLify(app, subdomains=True)

@app.route('/')
def index():
    r = requests.get("https://api.github.com/users/DiogoTheCoder/repos")
    if r:
        data = r.json()
    return render_template('index.html', projectNum=len(data))