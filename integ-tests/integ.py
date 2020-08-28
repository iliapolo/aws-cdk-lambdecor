import os

from aws_cdk import core as cdk
from aws_cdk import aws_s3 as s3
from aws_cdk_lambdecor import aws_lambda

app = cdk.App()
stack = cdk.Stack(app, 'aws-cdk-lambdecor-integ-test')

bucket = s3.Bucket(stack, 'Bucket', removal_policy=cdk.RemovalPolicy.DESTROY)

@aws_lambda(stack)
def return_string(input):
  return f'input={input}'

@aws_lambda(stack)
def return_int(input):
  return input + 1

@aws_lambda(stack)
def return_boolean(input):
  return input != True

@aws_lambda(stack)
def return_list(input):
  return [input]

@aws_lambda(stack)
def return_dictionary(input):
  return {'input': input}

@aws_lambda(stack)
def accept_token(input):
  return f'token={input}'

def make_output(name, value):
  cdk.CfnOutput(stack, name, value=value)

return_string('input')
return_int(5)
return_boolean('input')
return_list('input')
return_dictionary('input')
accept_token(bucket.bucket_name)

app.synth()

