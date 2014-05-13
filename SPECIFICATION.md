AchieveMe Specification
===============

Description
-------------
Web app for a community / organization / group of people, for registering members achievments.

User types:
---------------------------
	- Guest
	- Member
	- Moderator
	- Admin
![User type](specification/UserTypes.png "User type inheritance")

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
