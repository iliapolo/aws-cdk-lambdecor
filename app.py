#!/usr/bin/env python3

from aws_cdk import core

from aws_cdk_lambdecor.aws_cdk_lambdecor_stack import AwsCdkLambdecorStack


app = core.App()
AwsCdkLambdecorStack(app, "aws-cdk-lambdecor")

app.synth()
