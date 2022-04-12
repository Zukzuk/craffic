#!/bin/bash
# https://blog.container-solutions.com/tagging-docker-images-the-right-way
# https://blog.container-solutions.com/docker-latest-confusion

set -o allexport
source .docker.env
set +o allexport

echo "BUILD_SCHEMA_VERSION: $BUILD_SCHEMA_VERSION"
echo "BUILD_DATE: $BUILD_DATE"
echo "REPO_NAME: $REPO_NAME"
echo "REPO_DESCR: $REPO_DESCR"
echo "REPO_URL: $REPO_URL"
echo "HOMEPAGE: $HOMEPAGE"
echo "HASH: $HASH"
echo "TAG: $TAG"
echo "IMG_HASH: $IMG_HASH"
echo "IMG_TAG: $IMG_TAG"
echo "IMG_LATEST: $IMG_LATEST"
echo "NESTJS_PORT: $NESTJS_PORT"
echo "DOCKER_CMD: $DOCKER_CMD"

docker build \
    --file Dockerfile.prod
    --no-cache \
    --progress=plain \
    -t $IMG_HASH -t $IMG_TAG -t $IMG_LATEST \
    ./ \
    --label "org.label-schema.schema-version=$BUILD_SCHEMA_VERSION" \
    --label "org.label-schema.build-date=$BUILD_DATE" \
    --label "org.label-schema.name=$REPO_NAME" \
    --label "org.label-schema.description=$REPO_DESCR" \
    --label "org.label-schema.url=$HOMEPAGE" \
    --label "org.label-schema.vcs-url=$REPO_URL" \
    --label "org.label-schema.vcs-ref=$HASH" \
    --label "org.label-schema.version=$TAG" \
    --label "org.label-schema.docker.cmd=$DOCKER_CMD"