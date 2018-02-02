FROM node:6.10.3

# create app directory in container
RUN mkdir -p /app

RUN npm install pm2 -g

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
# ADD package.json yarn.lock /app/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
# RUN npm i --production

# copy all file from current dir to /app in container
COPY . /app/

# RUN npm i --production

# RUN yarn build

# expose port 3000
EXPOSE 3000

# cmd to start service
CMD ["pm2-runtime", "build/server.js"]