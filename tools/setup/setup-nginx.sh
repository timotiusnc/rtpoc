#!/bin/bash

function setup_link {
    CODE_DIR="$1"
    LINK="$2"

    echo "Create $LINK link ..."
    rm -f "$LINK"
    ln -s $(readlink -m "$CODE_DIR") "$LINK"
}

function site_config {
    SITE="$1"

    echo "Enable $SITE site config ..."
    cp "$DIR/nginx-sites/$SITE" "/etc/nginx/sites-available/$SITE"
    rm -f "/etc/nginx/sites-enabled/$SITE"
    ln -s "/etc/nginx/sites-available/$SITE" /etc/nginx/sites-enabled/
}

# get current directory
DIR=$( cd "$( dirname "$0" )" && pwd )

# Install nginx
# taken from https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts
apt-get install nginx -y --force-yes

ROOT_DOMAIN="ombaq-rt.com"
site_config "$ROOT_DOMAIN"

echo "Copy SSL certificate ..."
mkdir -p /etc/nginx/keys/
cp $DIR/ssl-cert/* /etc/nginx/keys/

# Restart nginx
service nginx restart

# Create root dir
rm -rf /var/www/ombaq-rt
mkdir -p /var/www/ombaq-rt

# Setup link
setup_link "$DIR/../../client" "/var/www/ombaq-rt/client"
