# /bin/bash!
cat <<EOF >./devops/values.yaml
project:
    id: $GCP_PROJECT
    environment: $ENVIRONMENT
    name: $PROJECT_NAME
    domain: $DOMAIN
    withSubdomain: $WITH_SUBDOMAIN
deployment:
    port: $PORT
    image: $DOCKER_IMAGE
ingress:
    withCert: $WITH_CERT
    secretCert: $SECRET_CERT
service:
    port: 5001
namespace: $ENVIRONMENT
replicas: $REPLICAS
env:
 data:
    NODE_ENV: production
    PORT: $PORT
EOF