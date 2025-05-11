FROM node:18
WORKDIR /app
# Copy package.json and package-lock.json from the nested frontend directory
COPY frontend/frontend/package*.json ./
RUN npm install
# Copy the rest of the nested frontend directory
COPY frontend/frontend/ .
EXPOSE 3000
CMD ["npm", "start"]