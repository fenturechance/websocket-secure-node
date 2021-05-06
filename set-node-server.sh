cd testClient
npm install
pm2 start npm --name testClient -- start
cd ../
cd testWS
npm install
pm2 start npm --name testWS -- start
cd ../
cd testWSS
npm install
# pm2 start npm --name testWSS -- start
pm2-runtime index.js --no-autorestart