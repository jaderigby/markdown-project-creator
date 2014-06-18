Markdown Project Creator
========================

**Note:** Requires Mac OSX and Python 2.7

This offers a gui setup client along with some styling and Foundation 4 support to Markdown projects.  Setup requires the following:

- [Grunt](http://gruntjs.com/getting-started)
- [Node.js](http://nodejs.org/)

Once Grunt and Node.js are set up, download the package and run "markdown-project-creator".  This will require python, as well as the Python Launcher Utility.  If these are installed, then the client is ready to be used.  Follow the steps below to start your project:

1. Enter the filepath into the respective field.  Example: "/Users/my-users-name/Documents/new-markdown-project"
2. Click "Create Project".  This will create a folder with the necessary dependencies included, in the destination which you stipulated in Step 1.
3. Click on "Download Dependencies".  This will open a new terminal window, and then run through downloading all of the needed npm packages in the background.  You will notice these processes running in the parent window.  Monitor this terminal window for completeness.  Once the process is complete, you may go to Step 4.
4. Click "Watch Files" to begin watching your files.  There are several folders and files within the project folder, but the one that you are concerned with is "docs".  Within docs, you will find a folder called "Markdown".  Here, is where you will add your Markdown files. In fact, you can use the "Sample.markdown" file as an example of how to create your own Markdown files.  While "Watch Files" is running, anything you save will create/edit the equivalent html file.  When you are finished, you can open the html file in a web browser and review the results.  Any images or videos that you would like to add locally can go in the "media" folder.

