from flask import Flask, jsonify, request
import pickle
from flask_cors import CORS, cross_origin
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)


incomes = [
    { 'description': 'salary', 'amount': 5000 }
]

@app.route('/')
def welcome():
    return 'hi'


low = []
medium = []
high = []
predictions = pd.read_csv('predictions.csv')
list_predictions = predictions.values.tolist()
low = [i for i in list_predictions if i[-1] == 'low']
medium = [i for i in list_predictions if i[-1] == 'medium']
high = [i for i in list_predictions if i[-1] == 'high']


@app.route('/model', methods=['GET'])
def get_incomes():
    

    heartbeat = request.args.get('heartbeat')  # Change 'value' to the name of the value you expect in the request

    if heartbeat == 'low':
        if low:
            item = low.pop()
            rec = {'trackTitle': item[1],
                   'trackArtist': item[2]}
        else:
            rec = {'trackTitle': 'None',
                   'trackArtist': 'None'}
    elif heartbeat == 'medium':
        if medium:
            item = medium.pop()
            rec = {'trackTitle': item[1],
                   'trackArtist': item[2]}
        else:
            rec = {'trackTitle': 'None',
                   'trackArtist': 'None'}
    else:
        if high:
            item = high.pop()
            rec = {'trackTitle': item[1],
                   'trackArtist': item[2]}
        else:
            rec = {'trackTitle': 'None',
                   'trackArtist': 'None'}     

    headers = {
        'Content-Type': 'application/json'
    }

    # Return the JSON response
    return jsonify(rec)

if __name__ == '__main__':
    app.run(debug=True, port=5000)