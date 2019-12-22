#!/usr/bin/env bash
a=$(lsof -t -i:8000) && kill -9 $a 
b=$(pgrep -f process_tasks) && kill -9 $b
