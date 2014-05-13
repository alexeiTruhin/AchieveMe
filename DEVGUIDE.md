Developer's Guide
===============

Initial Steps
-------------
1. Fork the main repo: right of the "Pull request" link is a "..." dropdown
menu, select "fork" from it and use the default values in the appearing form.
2. Clone your fork:
(**never ever clone the main repo or push to the main repo!!!**)
3. Add a remote which points to the main repo to be able to fetch updates from
it: `git remote add upstream git@...git'

Updating from the main repo
---------------------------
Use the command `git pull upstream master` to get the updates from the main
repo and also apply these changes.

Making changes and committing them
----------------------------------
1. Check if there are new updates (see previous section)
2. make a new branch and switch to it: `git checkout -b $NAME` where `$NAME` is
the name of the new branch
3. do the usual `git add`, `git commit` bla (I hope this is familiar)
4. to push, use: `git push origin $NAME` (`$NAME` is the name of the branch you
have switched to)
5. When you think it's time to have your changes merged into the master branch
of the main repo, submit a new pull request:
    - click on the "Pull request" button
    - select the branch from your forked repo which contains the changes you
    want to submit
    - fill out a descriptive title and description about your changes
    - click on "Create pull request"
