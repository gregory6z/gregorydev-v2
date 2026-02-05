FROM node:22-slim

# Arguments defined in docker-compose.yml
ARG node_env
ARG port
ARG env_file

ENV NODE_ENV=${node_env}

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# .env file creation from argument
COPY ${env_file} .env

EXPOSE $port

CMD if [ "$NODE_ENV" = "dev" ]; then \ 
        # Local development environment
        npm run dev; \
    else \
        # Other environments (preproduction & production)
        npm run build && npx serve -s dist -l tcp://0.0.0.0:5173; \
    fi
