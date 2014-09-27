Markdown Project Creator
========================

**Note:** Requires Mac OSX and Python 2.7

This offers a gui setup interface along with some styling and Foundation 4 support to Markdown projects.  Setup requires the following:

- [Python 2.7](https://www.python.org/download/releases/2.7.8/)
- Python Launcher (should come with Python 2.7.8 download above.  Make sure to associate ".py" files with the Python Launcher, ie using the "Get Info" window.)
- [Node.js](http://nodejs.org/)
- [Grunt CLI](http://gruntjs.com/getting-started)

### Installation and Setup

To install Node.js, go to the link above and click the "Install" button. This will download the Node.js installer for you.  Once it is downloaded, run the installer.  After Node.js is installed, run the following command in a terminal to install the Grunt CLI: `npm install -g grunt-cli`.

You may need to run this as sudo, ie: `sudo npm install -g grunt-cli`.  You will be prompted to enter your password.  Enter your password and hit "enter".

**Note:** The Mac OSX terminal can be found under "Applications/Utilities/Terminal" Don't be intimidated: just paste the above command in and hit "enter".

### Start a Project
Once Node.js and the Grunt CLI are installed, download the package and double-click the "markdown-project-creator.py" file (this will only launch, if you have the Python Launcher installed.)  This will require python, as well as the Python Launcher Utility.  If these are installed, then the client is ready to be used.  Follow the steps below to start your project:

1. Enter the filepath into the respective field.  This should be an absolute path.  Example: "/Users/my-users-name/Documents/new-markdown-project"  **Note:** Make sure your project folder name does not contain any uppercase letters or any spaces or special characters other than hyphens and underscores.
2. Click "Create Project".  This will create a folder with the necessary subfolders and files included, in the destination entered in Step 1.
3. Click on "Download Dependencies".  This will open a new terminal window, and then run through downloading all of the needed npm packages in the background.  You will notice these processes running in the parent window.  Monitor this terminal window for completeness.  Once the window says "--Process Complete--" you may go to Step 4.
4. Click "Watch Files" to begin watching your files.  Or, go to your new project folder, and locate the file called "_watch-files.py", and double-click it (uses the Python Launcher.)  

5. Your project folder will contain several folders and files, but the one that you are concerned with is called `__docs__`. Within this folder is another folder called `markdown`. The markdown folder is where you will create all of your files.  You may add subdfolders, as well, to keep yourself organized, but take note that all html files will be generated within the 	`html` folder _without_ any subfolders.  So be sure that all of your filenames are unique.  Another folder that you can use is the `_media` folder contained within the `html` folder.  Here, is where you can add videos and images to your markdown files.

6.  When you create a new file, give it the ".markdown" suffix, such as "my-brand-new-file.markdown".  When the file is saved, the "watch files" interpreter will automatically generate the html file for you.  These files can be located within the `html` folder, ie "__docs__/html".

	To view your files, open the desired html file in a current web browser, such as Firefox Chrome or IE11.

	Any media that you would like to add to your documents can go in the "_media" folder under either "images" or "videos".  Then, you can reference them in your markdown files using "_media/images/myImage.jpg", etc.

##### In addition to standard markdown features, the "Markdown Project Creator" also supports the following:

- For blockquotes, you can use the pattern `[author]Johnny Appleseed[/author]` to style a quote author.  *This interprets to `<cite></cite>` on the client side.
- To center elements, use `[center]my content[/center]`. *This interprets to `<div class="center"></div>` on the client side.
- To uniquely set a section of content apart, you can use `[collection]my content[/collection]`.  This is especially useful if you add your own custom styles to the "collection" class, but not necessary. By default, collection headings get a double arrow character in front of them (the right angle-quote character). *This interprets to `<div class="collection"></div>` on the client side.
- The "Markdown Project Creator" uses a special navigation option.  One special feature of this navigation bar, is that it will highlight the currently viewed page for you automagically.  This is easy to set up: Simply enclose a collection of links in the HTML5 "nav" tag.

	**Example:**

	```
	<nav>
	[Home](_main.html)
	[Story](story.html)
	[Notes](notes.html)
	</nav>
	```

- For a navigation bar set up for easy navigation of an individual page (page anchors), use the following pattern:
**Note:** The flavor of markdown that the "Markdown Project Creator" uses automatically adds id's to your headings.  So all of your headings will have built-in id anchors for your links to reference.

	```
	<nav>
	[Prologue](#prologue "anchor")
	[Chapter 1](#chapter-1 "anchor")
	[Chapter 2](#chapter-2 "anchor")
	[Epilogue](#epilogue "anchor")
	</nav>
	```

### Dynamic Menus
A new feature has been added to the Markdown Project Creator.  It gives you the ability to generate dynamic navigation menus.  These are menus that are created once and then included on every page containing the tag `[navigation]`.  To create a new dynamic menu, add a tag, like `[navigation:new-menu]` and the first time you open the html version of the file, a new menu will be generated for you.  In our example above, it would be called "new-menu".  Then, to add it to another page, simply include the `[navigation:new-menu]` in your new page.  To add or edit the menu, you can do this in your web browser, using the button in the top right of any html page. 

##### A Couple things to Note:

1. Dynamic menus store your information in Local Storage, which is specific to the browser that you create/edit in.  Use the "Import" and "Export" features to move your menu to another browser or computer.
2. In the future, dynamic menus may utilize some service, such as Dropbox, to populate other browsers for you in the background.  But for now, Local Storage is it!
3. One thing that you can do, is keep a copy of your current menu (copied from the "Export" text) in the form of a simple text file. Then, you can import it into another browser, and even on a new machine, by pasting the text into the "Import" box, and pressing "Import".


