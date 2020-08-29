import os
import urllib3

from aws_cdk import core as cdk
from aws_cdk import aws_s3 as s3
from aws_cdk_lambdecor import aws_lambda

app = cdk.App()
stack = cdk.Stack(app, 'aws-cdk-lambdecor-integ-test')

bucket = s3.Bucket(stack, 'Bucket', removal_policy=cdk.RemovalPolicy.DESTROY)

@aws_lambda(stack)
def typeof(positional, named):
  return f'(positional={positional})({type(positional)}) | (named={named})({type(named)})'

@aws_lambda(stack)
def ping():
  http = urllib3.PoolManager()
  r = http.request('GET', 'http://httpbin.org/robots.txt')
  return r.status

def make_output(name, value):
  cdk.CfnOutput(stack, name, value=value)

make_output('String', typeof('input', named='input'))
make_output('Integer', typeof(5, named=5))
make_output('Boolean', typeof(True, named=True))
make_output('List', typeof(['input'], named=['input']))
make_output('Dictionary', typeof({'input': 'value'}, named={'input': 'value'}))
make_output('TokenString', typeof(bucket.bucket_name, named=bucket.bucket_name))
make_output('UsingUrllib3', ping())

app.synth()

