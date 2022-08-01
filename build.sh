set e+x

IMAGE_NAME=cypress-test-image:1.0.0

echo "Building $IMAGE_NAME"
docker build --no-cache -t $IMAGE_NAME .