#!/bin/bash

case "$1" in
dev)    IP_ADDR="127.0.0.1"
        ;;
*)      echo "Missing argument";
        echo "Make sure you execute '$(basename $0) dev'";
        exit
        ;;
esac
HOSTS_FILE="/etc/hosts";
ROOT_DOMAIN="ombaq-rt.com";

# Backup first
sudo cp /etc/hosts /etc/hosts.bak;

# Delete all lines containing ombaq.com
sudo sed -i "/$ROOT_DOMAIN/d" ${HOSTS_FILE};

# Setup hosts
function append_content {
    CONTENT=$1;
    FILE=$2;
    echo ${CONTENT} | sudo tee -a ${FILE} > /dev/null;
}

if [ ! -z ${IP_ADDR} ]
then
  append_content "$IP_ADDR     $ROOT_DOMAIN" ${HOSTS_FILE};
fi

echo "New $HOSTS_FILE:"
cat ${HOSTS_FILE};
