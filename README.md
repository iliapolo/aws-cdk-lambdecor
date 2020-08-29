# aws-cdk-lambdecor

Transform native python function into AWS CDK Custom Resources.

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
```

You can also use tokens:

```python
from aws_cdk_lambdecor import aws_lambda
from aws_cdk import core as cdk
from aws_cdk import s3

app = cdk.App()
stack = cdk.Stack(app, 'HelloLambdecor')

@aws_lambda(stack)
def download_index(bucket_name):
  return download(f's3://{bucket_name}/index.html')

bucket = s3.Bucket.from_bucket_name(stack, 'Website', 'www.mysite.com')
index = download_index(bucket.bucket_name)

cdk.CfnOutput(stack, 'Index', value=index)
```

## Runtime

The Custom Resource is created with the [Python3.6 Lambda Runtime](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html)

### Imports

Your function code should do an inline import of the python module you want to use. For example, to use the `urllib3` module, you would write:

```python
@aws_lambda(stack)
def download():
  import urllib3
  # do something...
```

> The `json` library is pre-imported, so you don't have to do this to use `json`.

## Install

`pip install aws-cdk-lambdecor`

## Possible Future Work

- Support customizing all properties of the CDK Lambda Function (i.e runtime, memory, environment...)
- Pre-import additional common libraries.
- Implicit CDK scope creation to support CDK applications consisting of just these lambda functions.
- Implicit creation of Stack output.
- Command line invocation of function that runs `cdk deploy` and parses the stack output. (i.e `result=$(aws-cdk-lamdecor invoke func.py)`)