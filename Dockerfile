FROM mhart/alpine-node:14

# set working directory
WORKDIR /app

# copy
COPY ./src ./src
COPY ./public ./public
COPY ./.env ./
COPY ./.eslintrc.json ./
COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./yarn.lock ./

# set envs
ENV NODE_OPTIONS=--max_old_space_size=2048

# install & build
RUN yarn install
RUN yarn lint
RUN yarn build

# start app
EXPOSE 3000
CMD [ "yarn", "start" ]
