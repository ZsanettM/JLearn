#!/bin/bash

jupyter notebook --ip=0.0.0.0 --allow-root &
sleep 10
ng serve --host 0.0.0.0 --open
