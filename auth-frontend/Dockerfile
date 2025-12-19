FROM node:18-alpine
WORKDIR /app
COPY package.json ./
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm install
COPY . .
CMD ["npm", "start"]