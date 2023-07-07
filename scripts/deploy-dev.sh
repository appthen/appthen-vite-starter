# bivm0z-pay-test.oss.laf.dev
# pay-test.hysli.cn
# laf_5u0qrcOtOvANT5gzfQ7XGRu3Z2pqJq1ziSmmWBpP3rtqzJHLgBYoYucu77yb

# sync
disscode --output src/pages --id 647751d83cf38153b7582c60 --auth eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6MTAwMDAxLCJzdWIiOjEwMDAwMSwiaWF0IjoxNjg3MjczNzQ5LCJleHAiOjE2ODk4NjU3NDl9.2HPE_GVHU1yOIxUtLx0YGjraIQLKHj_gM3GqU83NOtg -cc yes

# build
npm run build

# 
laf user add bivm0z -r https://api.laf.dev
laf user switch bivm0z
laf login laf_5u0qrcOtOvANT5gzfQ7XGRu3Z2pqJq1ziSmmWBpP3rtqzJHLgBYoYucu77yb
cd laf-cloud
laf app init bivm0z
laf storage push -f pay-test ../dist
