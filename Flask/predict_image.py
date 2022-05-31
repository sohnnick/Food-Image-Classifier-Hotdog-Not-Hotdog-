import requests
import json
import io
import os
import pandas as pd
from google.cloud import vision
from google.cloud.vision_v1 import types

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '../API Keys/..'

def detection(file_path):
    # instantiates a client
    client = vision.ImageAnnotatorClient()
    
    # extract image (CAN BE CHANGED)
    with io.open(file_path, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)

    # performs label detection on the image file
    try:
	    response = client.label_detection(image=image)
	    labels = response.label_annotations

	    hotdog_flag = False

	    labels_dict = {}
	    for pred in labels:
	    	labels_dict[pred.description] = pred.score
	    if "Hot dog" not in labels_dict.keys():
	    	pass
	    else:
	    	# make sure score is above 80%
	    	if labels_dict["Hot dog"] > .8:
			    	hotdog_flag = True

    except:
    	raise Exception('Failed')
    	return None
    
    return hotdog_flag
