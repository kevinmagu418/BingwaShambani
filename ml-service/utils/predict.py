import joblib
import cv2
import numpy as np
from PIL import Image
import io

model = joblib.load("model/classifier.pkl")

def extract_features(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((100, 100))
    image_np = np.array(image)
    
    r_mean = np.mean(image_np[:, :, 0])
    g_mean = np.mean(image_np[:, :, 1])
    b_mean = np.mean(image_np[:, :, 2])

    return [r_mean, g_mean, b_mean]

def load_model_and_predict(image_file):
    image_bytes = image_file.read()
    features = extract_features(image_bytes)
    prediction = model.predict([features])[0]
    return prediction
