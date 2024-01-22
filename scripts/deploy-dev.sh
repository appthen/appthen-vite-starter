# build
npm run build

# 
rm -rf laf-cloud
laf user add bivm0z -r https://api.laf.dev
laf user switch bivm0z
laf login 【PAT】
mkdir laf-cloud && cd laf-cloud
laf app init bivm0z
laf storage push -f pay-test ../dist
