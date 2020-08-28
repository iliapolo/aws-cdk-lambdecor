#!/bin/bash

set -e

scriptdir=$(cd $(dirname $0) && pwd)
rootdir=${scriptdir}/../

cd ${rootdir}

echo "Installing test requirements"
pip install -r test-requirements.txt

echo "Installing aws-cdk"
npm install -g aws-cdk

echo "Packaging Wheel"
rm -rf *.whl
pyci --debug pack --path . wheel

echo "Creating Virtualenv"
rm -rf .aws-cdk-lambdecor-integ-tests
virtualenv .aws-cdk-lambdecor-integ-tests
source ./.aws-cdk-lambdecor-integ-tests/bin/activate

echo "Python: $(which python)"
echo "CDK: $(which cdk)"

echo "Installing package"
pip install *.whl

echo "Synthesizing integration tests"
cd integ-tests
cdk synth
