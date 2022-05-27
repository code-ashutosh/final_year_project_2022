# -- coding: utf-8 --
"""
Created on Tue Nov 17 21:40:41 2020
@author: win10
"""

# 1. Library imports
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Text import Text
import keras 
import tensorflow
import numpy as np
import pickle
import pandas as pd
from typing import Dict
import xgboost as xgb
import regex as re
from tensorflow.keras.preprocessing.sequence import pad_sequences
# 2. Create the app object
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:8000",
    "http://myapp:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



model = keras.models.load_model('LSTM_27/Emotion Recognition.h5')
tokenizer = pickle.load(open('LSTM_27/tokenizer.pickle','rb'))
le = pickle.load(open('LSTM_27/labelEncoder.pickle','rb'))
# pickle_in = open("model3.pkl","rb")
# classifier = pickle.load(pickle_in)
classifier = model

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Hello, World'}

# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere
@app.get('/{name}')
def get_name(name: str):
    return {'Hello': f'{name}'}

# 3. Expose the prediction functionality, make a prediction from the passed
#    JSON data and return the predicted Bank Note with the confidence
@app.post('/predict')
def predict_banknote(data:Text):
    print(data)
    data = data.dict()
    print(data)
    text = data['query'].lower()

    print('Inside app-inash')

    if (' hello ' in text) or (' hi ' in text):
        prediction = "Tell me something, I will try to predict some song for you"
        return{
            'prediction': prediction
        }

    if (' love ' in text) or (' cute ' in text):
        prediction = "love"
        return{
            'prediction': prediction
        }

    # if (' pray ' in text) or (' devotion ' in text) or (' prayer ' in text) or (' praying ' in text):
    #     prediction = "hanuman ji"
    #     return{
    #         'prediction': prediction
    #     } 

    def clean(text):
        global str_punc
        text = re.sub(r'[^a-zA-Z ]', '', text)
        text = text.lower()
        return text

    # sentence = clean(text)
    # sentence = tokenizer.texts_to_sequences([sentence])
    # sentence = pad_sequences(sentence, maxlen=256, truncating='pre')
    # result = le.inverse_transform(np.argmax(model.predict(sentence), axis=-1))[0]
    # probability =  np.max(model.predict(sentence))
    # print(result)    
    # print(probability)
    # print(result)
    print(sentence)
    sentence = clean(sentence)
    sentence = tokenizer.texts_to_sequences([sentence])
    sentence = pad_sequences(sentence, maxlen=256, truncating='pre')
    result = le.inverse_transform(np.argmax(model.predict(sentence), axis=-1))[0]
    proba =  np.max(model.predict(sentence))
    print(f"{result} : {proba}\n\n")
    emotions = ['admiration','amusement','anger','annoyance','approval','caring','confusion','curiosity','desire','disappointment','disapproval','disgust','embarrassment','excitement','fear','gratitude','grief','joy','love','nervousness','optimism','pride','realization','relief','remorse','sadness','surprise','neutral']
    result = str(emotions[int(result)])
    prediction = result
    
    return {
        'prediction': prediction
    }

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    
#uvicorn main:app --reload


#http://myapp:5500/index.html