import os

from aws_cdk import core as cdk
from aws_cdk import aws_s3 as s3
from aws_cdk_lambdecor import aws_lambda

app = cdk.App()
stack = cdk.Stack(app, 'aws-cdk-lambdecor-integ-test')

bucket = s3.Bucket(stack, 'Bucket', removal_policy=cdk.RemovalPolicy.DESTROY)

@aws_lambda(stack)
def return_string(arg):
  return f'arg={arg}'

@aws_lambda(stack)
def return_int(arg):
  return arg + 1

@aws_lambda(stack)
def return_boolean(arg):
  return arg != True

@aws_lambda(stack)
def return_list(arg):
  return [arg]

@aws_lambda(stack)
def return_dictionary(arg):
  return {'arg': arg}

@aws_lambda(stack)
def accept_token(arg):
  return f'token={arg}'

@aws_lambda(stack)
def typeof(arg):
  return f'({arg})({type(arg)})'

def make_output(name, value):
  cdk.CfnOutput(stack, name, value=value)

make_output('String', typeof('input'))
make_output('Integer', typeof(5))
make_output('Boolean', typeof(True))
# make_output('List', return_list('input'))
# make_output('Dictionary', return_dictionary('input'))
make_output('TokenString', typeof(bucket.bucket_name))

app.synth()

