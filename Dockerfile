FROM node:12.13.0-alpine
WORKDIR /usr/src/app
RUN npm install
COPY . . 
EXPOSE 80
CMD ["npm", "start"]