#!/bin/bash

set -e

scriptdir=$(cd $(dirname $0) && pwd)

${scriptdir}/synth.sh

# fail if the template changes, forcing me to redeploy and test
git diff --exit-code cdk.out/aws-cdk-lambdecor-integ-test.template.json