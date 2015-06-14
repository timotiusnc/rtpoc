#!/bin/bash
# chmod +x everything
chmod +x *.sh
chmod +x ./tools/setup/*.sh

# setup client & api
./tools/setup/client-setup.sh

# Done
echo -e "\nSetup done, Now please restart your terminal to proceed with development properly.\n"
