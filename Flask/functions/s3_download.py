import pandas as pd
import requests
import boto3
import io
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from botocore.exceptions import NoCredentialsError
from PIL import Image

ACCESS_KEY = 'AKIAT2R2N7QSFVDKK2ZA'
SECRET_KEY = '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'

def extract_all_images():
	s3 = boto3.resource('s3',aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
	bucket = s3.Bucket('hotdognothotdog-sohnnick')

	s3_objs = []
	for i in bucket.objects.filter():
	    s3_objs.append(i)

	# loop through mutliple images
	num = 0
	response = s3_objs[num].get()
	file_stream = response['Body']
	# img = Image.open(file_stream)
	return file_stream