FROM node:6.10.3

# create app directory in container
RUN mkdir -p /app

# install pm2
RUN npm install pm2 -g

# set /app directory as default working directory
WORKDIR /app

# copy all file from current dir to /app in container
COPY . /app/

# expose port 3000
EXPOSE 3000

# cmd to start service
CMD ["pm2-runtime", "build/server.js"]