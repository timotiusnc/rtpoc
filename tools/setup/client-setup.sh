#!/bin/bash
# move to current folder
DIR=$( cd "$( dirname "$0" )" && pwd )

# install nodejs
echo -e "\nInstall nodejs"
sudo apt-get install npm -y
sudo apt-get install nodejs -y --force-yes
sudo rm -f /usr/bin/node
sudo ln -s /usr/bin/nodejs /usr/bin/node
npm config set prefix ~/npm
if [ -f ~/npm ]; then
	mkdir ~/npm
fi
sudo chown -R $USER ~/npm
if grep -q $HOME/npm/bin ~/.bashrc; then
	echo '.bashrc has been set .. skipping'
else
	export PATH=$HOME/npm/bin:$PATH
	echo "export PATH=$HOME/npm/bin:\$PATH" >> ~/.bashrc
fi

# update npm
sudo npm install npm -g

# install grunt, bower
echo -e "\nInstall grunt, bower, npm-cache"
sudo npm install -g bower
sudo npm install -g grunt-cli
sudo npm install -g npm-cache

# update bower
sudo npm update -g bower

# setup nginx
echo -e "\nSetting up nginx"
sudo $DIR/setup-nginx.sh

# setup project dependencies
echo -e "\nSetting project dependencies"
sudo rm -rf ~/tmp
cd $DIR/../../client
npm-cache install npm bower

# done!
echo -e "\n>> Client setup done! <<"
