# blairnangle-dot-com

[![infra](https://github.com/blairnangle/blairnangle-dot-com/actions/workflows/infra.yml/badge.svg)](https://github.com/blairnangle/blairnangle-dot-com/actions/workflows/infra.yml)

[![website](https://github.com/blairnangle/blairnangle-dot-com/actions/workflows/website.yml/badge.svg)](https://github.com/blairnangle/blairnangle-dot-com/actions/workflows/website.yml)

Personal website. Hosted on AWS S3 and CloudFront.

## Running locally

### Development mode

To run the site in development mode with hot reloading:

```shell
./run-local.sh
```

### As-production

To ensure content is server-side rendered locally (as it is in production):

```shell
./run-production-build-local.sh
```

## License

Distributed under an [MIT License](./LICENSE).
