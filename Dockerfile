FROM node:4.4-wheezy
MAINTAINER Romain Dubos <romain.dubos@gmail.com>

COPY . /opt/app
WORKDIR /opt/app

# Install app dependencies
RUN  npm install
