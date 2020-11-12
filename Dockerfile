FROM mhart/alpine-node:14 AS builder

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
# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
