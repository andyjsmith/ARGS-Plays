#!/bin/bash
forever stop web/app.js
sudo killall zsnes
sudo /usr/local/nginx/sbin/nginx -s stop
