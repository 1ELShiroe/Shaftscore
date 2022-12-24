FROM node:18.12.1

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run 

EXPOSE 8087

CMD ["npm","start"]