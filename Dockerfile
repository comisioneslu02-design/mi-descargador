FROM node:20  
WORKDIR /app  
RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg  
RUN pip3 install -U --pre yt-dlp --break-system-packages
COPY package*.json ./  
RUN npm install  
COPY . .  
EXPOSE 3000  
CMD ["node", "server.js"] 
