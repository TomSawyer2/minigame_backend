FROM keymetrics/pm2:latest-alpine

RUN mkdir -p /home/Service
WORKDIR /home/Service
COPY . /home/Service

RUN npm install

# 暴露端口
EXPOSE 3000

# 运行命令
CMD [ "pm2-docker", "start", "pm2.json" ]