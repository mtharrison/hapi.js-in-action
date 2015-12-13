# Download/start statsd + graphite container
docker run -d \
  --name graphite \
  --restart=always \
  -p 80:80 \
  -p 2003:2003 \
  -p 8125:8125/udp \
  -p 8126:8126 \
  hopsoft/graphite-statsd
