# angular-template

Personal template for angular project

## Getting Started For Development

### General Steps
1. Setup required tools & dependencies
		
		./setup.sh

2. Setup `/etc/hosts`
		
		sudo tools/misc/setup-hosts.sh

### Client Development Steps

1. (Optional) [Install livereload browser extension](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions).
2. Go into `client` folder.
3. Type in `grunt serve` (you can not do `grunt serve` on more than one folder in one machine).
4. Open `https://ombaq-rt.com` in your browser & optionally enable livereload extension.

If you encountered a warning after `grunt serve` like this:

		Running "watch" tasks
		Waiting...
		Warning: watch ENOSPC

then run this command:

		echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

from: [StackOverflow](http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc)

## Building

1. `grunt build`.
2. Find the resulting build in `dist` folder.
