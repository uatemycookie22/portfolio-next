#! /bin/sh

docker build -t uatemycookie/lhportfolionextbuild:dev ../

echo "SAVING TO lhportfolio.tar"
docker save -o lhportfolio.tar uatemycookie/lhportfolionextbuild:dev

echo "STARTING SCP"
scp lhportfolio.tar root@lysanderh.com:/root/portfolio-next/

echo "START CONTAINER"
ssh root@lysanderh.com "bash -s" < load-image.sh