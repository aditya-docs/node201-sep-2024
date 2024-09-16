# Store workspace public IP to config file
IP_VAR="$(curl http://checkip.amazonaws.com/)"
CONFIG='{"workspaceIp": "'"$IP_VAR"'"}'
echo $CONFIG > ipConfig.json