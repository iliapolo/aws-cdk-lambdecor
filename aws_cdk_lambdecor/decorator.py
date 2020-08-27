import inspect
import json

from aws_cdk import core as cdk
from aws_cdk import aws_lambda as lamb
from aws_cdk import aws_s3 as s3
from aws_cdk import custom_resources as cr

class aws_lambda(object):

  def __init__(self, scope):
    self._scope = scope

  def __call__(self, func):

    def wrapper(*args, **kwargs):

      function_name = func.__name__

      remote = lamb.Function(self._scope, f'LambdaFunction-{function_name}',
        code=lamb.Code.from_inline(self._create_function_code(func)),
        runtime=lamb.Runtime.PYTHON_3_7,
        handler='index.handler',
        timeout=cdk.Duration.minutes(15),
        memory_size=256,
      )

      provider = cr.Provider(self._scope, f'CustomResourceProvider-{function_name}', on_event_handler=remote)

      raise RuntimeError(cdk.Stack.of(self._scope).to_json_string(kwargs))
      resource = cdk.CustomResource(self._scope, f'CustomResource-{function_name}',
        service_token=provider.service_token,
        properties={
          'args': json.dumps(args),
          'kwargs': json.dumps(kwargs)
        })

      return resource.get_att_string('Value')

    return wrapper



  def _create_function_code(self, func):

    sanitized_function_code = '\n'.join(str(inspect.getsource(func)).splitlines()[1:])

    return f'''
import json

# this is the original native python function
{sanitized_function_code}

# this is the CFN handler
def handler(event, context):
  print(json.dumps(event))

  request_type = event['RequestType']
  props = event['ResourceProperties']

  if request_type == 'Delete':
    pass

  args   = json.loads(props.get('args', '[]'))
  kwargs = json.loads(props.get('kwargs', '{{}}'))

  # invoke the original function with the original arguments.
  return_value = {func.__name__}(*args, **kwargs)

  return {{'Data': {{'Value': return_value}}}}

'''

app = cdk.App()
stack = cdk.Stack(app, 'OhMy', env=cdk.Environment(
  account='185706627232',
  region='us-east-1'))


@aws_lambda(stack)
def add(bucket_name, bucket_arn):
  return f'bucket_name={bucket_name}, bucket_arn={bucket_arn}'

bucket = s3.Bucket(stack, 'Bucket', removal_policy=cdk.RemovalPolicy.DESTROY)

result = add(bucket_name=bucket.bucket_name, bucket_arn=bucket.bucket_arn)

cdk.CfnOutput(stack, 'Result', value=result)

app.synth()