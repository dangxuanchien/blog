# Stage 1: install dependencies
FROM node:16-alpine As development

# Set working directory
WORKDIR /scpf/server
# Install and cache app dependencies development
COPY --chown=node:node package.json ./
# Install yarn
RUN yarn
# Copy existing application directory contents
COPY --chown=node:node . .
USER node


# Stage 2: build
FROM node:16-alpine As build

# Set working directory
WORKDIR /scpf/server
# Install and cache app dependencies production
COPY --chown=node:node package.json ./
# Use node_modules at development to build dist folder
COPY --chown=node:node --from=development /scpf/server/node_modules ./node_modules
# Copy existing application directory contents
COPY --chown=node:node . .
ENV NODE_ENV production
# Build source
RUN yarn build
# Install production and clear cache app dependencies
RUN yarn install --production && yarn cache clean
USER node


# Stage 3: run
FROM node:16-alpine As production

COPY --chown=node:node --from=build /scpf/server/node_modules ./node_modules
COPY --chown=node:node --from=build /scpf/server/package.json ./package.json
COPY --chown=node:node --from=build /scpf/server/dist ./dist
# Start run in production environment
CMD [ "node", "-r", "module-alias/register", "/dist/server.js" ]
