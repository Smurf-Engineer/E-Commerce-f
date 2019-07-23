# /bin/bash!
cat <<EOF >./devops/values.yaml
project:
    id: $GCP_PROJECT
    environment: $ENVIRONMENT
    name: $PROJECT_NAME
    domain: $DOMAIN
    withSubdomain: true
    db: $DB_USERNAME
deployment:
    port: $PORT
    image: $DOCKER_IMAGE
ingress:
    withCert: true
    secretCert: ""
service:
    port: 5001
namespace: $ENVIRONMENT
replicas: $REPLICAS
env:
 data:
    NODE_ENV: production
    PORT: $PORT
EOF