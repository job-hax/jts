a=$(lsof -t -i:8080) && kill -9 $a && yarn build &
