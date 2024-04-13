# !/bin/bash
if [ "$1"x == ""x ]
then
	echo "Please visit: https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=0&type=8"
	echo -n "Enter SESSDATA:"
	read SESSDATA
else
	SESSDATA=$1
fi
echo "SESSDATA: $SESSDATA"

sed -i "s/'SESSDATA=.*'/'SESSDATA=$SESSDATA'/g" docker-compose.yml

docker-compose down &&
docker pull diygod/rsshub &&
docker volume create redis-data &&
docker-compose up -d

exit 0