[![PyPI Version](http://img.shields.io/pypi/v/aws-cdk-lambdecor.svg)](https://pypi.org/project/aws-cdk-lambdecor/)
[![Is Wheel](https://img.shields.io/pypi/wheel/aws-cdk-lambdecor.svg?style=flat)](https://pypi.org/project/aws-cdk-lambdecor/)
[![PyCI release](https://img.shields.io/badge/pyci-release-brightgreen.svg)](https://github.com/iliapolo/aws-cdk-lambdecor)
![Build Status](https://github.com/iliapolo/aws-cdk-lambdecor/workflows/master/badge.svg)

# aws-cdk-lambdecor

Transform native python function into [AWS CDK Custom Resources](https://docs.aws.amazon.com/cdk/api/latest/docs/custom-resources-readme.html).

```python
from aws_cdk_lambdecor import aws_lambda
from aws_cdk import core as cdk

app = cdk.App()
stack = cdk.Stack(app, 'HelloLambdecor')

@aws_lambda(stack)
def greet():
  return 'hello'

# invoke the function just like a regular function
greeting = greet()

# return value is a token that can be used later on
cdk.CfnOutput(stack, 'Greeting', value=greeting)

app.synth()
```

You can also use tokens:

```python
from aws_cdk_lambdecor import aws_lambda
from aws_cdk import core as cdk
from aws_cdk import s3
from aws_cdk import aws_apigateway as apigateway

app = cdk.App()
stack = cdk.Stack(app, 'HelloLambdecor')

@aws_lambda(stack)
def ping(url):
  http = urllib3.PoolManager()
  r = http.request('GET', url)
  return r.status

api = apigateway.LambdaRestApi(...)
status = ping(api.url)

cdk.CfnOutput(stack, 'Status', value=status)

app.synth()
```

## Runtime

The Custom Resource is created with the [Python3.6 Lambda Runtime](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

### Imports

The following modules are pre-imported into the lambda environment:

- `json`
- `urllib3`

To use any other module, you would need to do an inline import.

## Install

`pip install aws-cdk-lambdecor`

## Possible Future Work

- Support customizing all properties of the CDK Lambda Function (i.e runtime, memory, environment...)
- Pre-import additional common libraries.
- Implicit CDK scope creation to support CDK applications consisting of just these lambda functions.
- Implicit creation of Stack output.
- Command line invocation of function that runs `cdk deploy` and parses the stack output. (i.e `result=$(aws-cdk-lamdecor invoke func.py)`)