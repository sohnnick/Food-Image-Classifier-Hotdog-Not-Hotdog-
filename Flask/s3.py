import pandas as pd
import requests
import boto3
from botocore.exceptions import NoCredentialsError
import io
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from botocore.exceptions import NoCredentialsError
from PIL import Image
import config

import sys

def extract_all_images(ACCESS_KEY, SECRET_KEY):
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

def upload_to_aws(local_file, bucket_name, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)

    try:
        s3.upload_file(local_file, bucket_name, s3_file)
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False