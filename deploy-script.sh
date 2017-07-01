chmod 777 -R *
rm -rf /var/www/HIBBO-FINAL
mv /var/lib/jenkins/workspace/HIBBO-FINAL /var/www
gulp
