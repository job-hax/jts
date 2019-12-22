#!/usr/bin/env bash
a=$(lsof -t -i:8000) && kill -9 $a 
b=$(pgrep -f process_tasks) && kill -9 $b
python3 manage.py runserver 0.0.0.0:8000 &
python3 manage.py process_tasks 
