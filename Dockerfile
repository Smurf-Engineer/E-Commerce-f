FROM davidglez/alpine-pm2

# create app directory in container
RUN mkdir -p /app
RUN apk add --no-cache git

ARG LOG_ROCKET_KEY
ARG GOOGLE_ID
ARG GOOGLE_TAG_MANAGER_ID
ARG FACEBOOK_ID
ARG GRAPHQL_URI_BASE
ARG BASE_URL
ARG STORAGE_URL
ARG PK_STRIPE_US
ARG PK_STRIPE_EU
ARG PAYPAL_CLIENT_ID
ARG PAYPAL_CLIENT_ID_US
ARG PAYPAL_CLIENT_ID_CA
ARG PAYPAL_CLIENT_ID_EU
ARG PAYPAL_ENV
ARG GOOGLE_MAP_KEY
ARG INTERCOM_KEY
ARG DEFAULT_CURRENCY
ARG GOOGLE_FONTS_KEY
ARG GOOGLE_FONTS_URL
ARG YOUTUBE_ID
ARG YOUTUBE_KEY
ARG TUTORIALS_TAB_ACTIVE
ARG COLOR_SWATCH_ZIP
ARG MAIN_TITLE

# RUN npm install pm2 -g

# RUN curl -o- -L https://yarnpkg.com/install.sh | bash
# RUN export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
ADD package.json yarn.lock  /app/

# --Don�t generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# copy all file from current dir to /app in container
COPY . /app/

RUN yarn build

# expose port 3000
EXPOSE 3000

# cmd to start service
CMD ["pm2-runtime", "build/server.js"]
