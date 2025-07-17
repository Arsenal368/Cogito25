from flask import Flask
from routes import api

app = Flask(__name__)
app.register_blueprint(api)

@app.route('/api/health', methods=['GET'])
def health():
    return {'status': 'ok'}

if __name__ == '__main__':
    app.run(debug=True, port=5001) 