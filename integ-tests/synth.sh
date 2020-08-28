#!/bin/bash

set -e

scriptdir=$(cd $(dirname $0) && pwd)
rootdir=${scriptdir}/../

cd ${rootdir}

echo "Creating Virtualenv"
pip install virtualenv==20.0.14
rm -rf .aws-cdk-lambdecor-integ-tests
virtualenv --python python3 .aws-cdk-lambdecor-integ-tests
source ./.aws-cdk-lambdecor-integ-tests/bin/activate

echo "Installing test requirements"
pip install -r test-requirements.txt

echo "Installing aws-cdk"
npm install -g aws-cdk

echo "Packaging Wheel"
rm -rf *.whl
pyci pack --path . wheel

echo "Installing package"
pip install *.whl

echo "Python: $(which python) --> $(python --version)"
echo "CDK: $(which cdk) --> $(cdk --version)"

echo "Synthesizing integration tests"
cd integ-tests
cdk synth
