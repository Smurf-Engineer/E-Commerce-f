FROM davidglez/alpine-pm2

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
# ADD package.json yarn.lock /app/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
# RUN yarn --pure-lockfile

# copy all file from current dir to /app in container
COPY . /app/

# RUN yarn --pure-lockfile

# RUN yarn build

# expose port 3000
EXPOSE 3000

# cmd to start service
CMD ["pm2-runtime", "build/server.js"]