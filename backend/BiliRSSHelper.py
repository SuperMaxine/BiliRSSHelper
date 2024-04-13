# a flask server that accept request which sended by browser include SESSDATA on port 6673
# and excute the ./update_bilibili.sh to update the bilibili rss

from flask import Flask, request
import os
import json
import subprocess

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
	print(request.get_json())
	SESSDATA = request.get_json()['SESSDATA']
	print('SESSDATA: ' + SESSDATA)
	if not os.path.exists('SESSDATA.txt'):
		with open('SESSDATA.txt', 'w') as f:
			f.write(SESSDATA)
		subprocess.run(['./update_bilibili.sh {}'.format(SESSDATA)], shell=True)
		return 'OK'
	else:
		with open('SESSDATA.txt', 'r') as f:
			old_SESSDATA = f.read()
		if old_SESSDATA != SESSDATA:
			with open('SESSDATA.txt', 'w') as f:
				f.write(SESSDATA)
			subprocess.run(['./update_bilibili.sh {}'.format(SESSDATA)], shell=True)
		return 'OK'
	return 'SESSDATA is None'

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=12345)

