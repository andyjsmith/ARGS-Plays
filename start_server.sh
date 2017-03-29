#!/bin/bash
sudo /usr/local/nginx/sbin/nginx
(cd web/ && forever start app.js)
zsnes streetfighter2.sfc &
