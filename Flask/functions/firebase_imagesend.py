import requests
from firebase_admin import credentials, initialize_app, storage

initialize_app(cred, {'storageBucket': 'YOUR FIREBASE STORAGE PATH (without gs://)'})

def firebase_imagesend(fileName):
	fileName = "PATH TO FILE" + fileName
	bucket = storage.bucket()
	blob = bucket.blob(fileName)
	blob.upload_from_filename(fileName)