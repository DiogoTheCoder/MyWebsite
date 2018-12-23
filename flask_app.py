from flask import Flask, render_template
from flask_sslify import SSLify
import requests, sys, datetime

app = Flask(__name__)
sslify = SSLify(app, subdomains=True)

@app.route('/')
def index():
    r = requests.get("https://api.github.com/users/DiogoTheCoder/repos")
    if r:
        data = r.json()


    years = datetime.date.today().year - datetime.date(2012, 1, 1).year
    return render_template('index.html', projectNum=len(data), yearsOfXp=years)