# Based on official iojs Docker image
FROM iojs:2.5.0-onbuild

LABEL version="1.0.0-alpha.1"
LABEL description="This file describes the standard way to run >bootenv REST-API, using Docker!"

# If you like Docker like me, any help is always welcome!
MAINTAINER Andrés Amado <andres@bootenv.org> (@acactown)

# Expose API port
EXPOSE 3000
