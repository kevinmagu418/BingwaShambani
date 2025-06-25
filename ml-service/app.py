from flask import Flask, request, jsonify
from utils.predict import load_model_and_predict

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    crop = request.form.get('crop')

    prediction = load_model_and_predict(image)
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
