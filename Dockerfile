FROM node:12.13.0-alpine
WORKDIR /usr/src/app
COPY . . 
RUN npm install
EXPOSE 80
CMD ["npm", "start"]