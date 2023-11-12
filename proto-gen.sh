#!/bin/bash

# Check if an argument was provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path_to_proto_file>"
    exit 1
fi

PROTO_FILE=$1
# Convert relative path to absolute path
ABS_PROTO_FILE=$(realpath $1)
# Get the root directory of the project
ROOT_DIR=$(git rev-parse --show-toplevel)

echo "Generating stubs for $PROTO_FILE"
echo "Absolute path: $ABS_PROTO_FILE"
echo "Root directory: $ROOT_DIR"

# Ensure the output directory exists or create it
OUTPUT_DIR=$ROOT_DIR/core/proto/
mkdir -p $OUTPUT_DIR

# Generate Go stubs
protoc --proto_path=$ROOT_DIR \
    --go_out=$OUTPUT_DIR \
    --go-grpc_out=$OUTPUT_DIR \
    $ABS_PROTO_FILE

# Change to the node-server directory before running yarn
cd $ROOT_DIR/node-server

# Generate Node stubs
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./proto/ $ABS_PROTO_FILE
cp $ABS_PROTO_FILE  ./proto/


# Move back to the project root directory
cd $ROOT_DIR