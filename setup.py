import setuptools


with open("README.md") as fp:
    long_description = fp.read()


setuptools.setup(
    name="aws_cdk_lambdecor",
    version="0.0.1",

    description="Define AWS CDK Lambda using native python functions",
    long_description=long_description,
    long_description_content_type="text/markdown",
    license='LICENSE',

    author="Eli Polonsky",

    packages=["aws_cdk_lambdecor"],

    install_requires=[
        "aws-cdk.core>=1.61.0,<2.0.0",
        "aws-cdk.aws_lambda>=1.61.0,<2.0.0",
        "aws-cdk.custom_resources>=1.61.0,<2.0.0",
        "aws-cdk.aws_s3>=1.61.0,<2.0.0",
    ],

    python_requires=">=3.6",

    classifiers=[
        'Operating System :: POSIX :: Linux',
        'Operating System :: Microsoft',
        "License :: OSI Approved :: Apache Software License",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
    ],
)
