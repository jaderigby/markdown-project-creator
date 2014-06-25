"""
Markdown Project Creator 1.0
created by Jade C. Rigby
contact@jaderigby.com

GNU Liscense
"""

from Tkinter import *
import os

#== Theme Colors
mainBg = "#444"
fieldBg = "#AAA"
fontColor = "white"

#== FUNCTIONS
def project_generator(window, projectDirectory):
	optionsQueryList = []

	def run_profile(runProfile):
		os.system('python '+runProfile+' '+projectDirectory)

	def write_compilers():
		def populate_file(generate, content, parent_folder):
			FILE = open(parent_folder+'/'+generate, "w")
			FILE.write(content)
			FILE.close()
		#== Create shell scripts for compilers

		load_node_modules_content = """open -a Terminal "`pwd`"
cd """+ projectDirectory +"""
dep=('grunt-contrib-watch' 'load-grunt-tasks' 'grunt-markdown' 'grunt-regex-replace')

for i in "${dep[@]}"
do
	npm install "$i" --save-dev
done

rm -f """+ projectDirectory +"""/load-dependencies.sh

echo "--Process Complete--"
"""

		watch_files_content = """tell app "Terminal"
	do script "cd """+ projectDirectory +"""
	grunt watch"
end tell"""

		populate_file('resources/command-line/watch-files.scpt', watch_files_content, projectDirectory)

		populate_file('load-dependencies.sh', load_node_modules_content, projectDirectory)

	def write_packageJSONfile():
		projectName = os.path.basename(os.path.normpath(projectDirectory))
		content = """{
	"name": \""""+projectName+"""\",
	"version": "0.0.0",
	"dependencies": {},
	"devDependencies": {
	},
	"engines": {
		"node": ">=0.8.0"
	}
}"""
		FILE = open(projectDirectory+'/package.json', "w")
		FILE.write(content)
		FILE.close()

	run_profile('profiles/markdown-profile.py')
	write_compilers()
	write_packageJSONfile()
	window.destroy()

#== Functions for GUI
def inputText(parent_window, input_name):
	input_name = input_name+": "
	row = Frame(parent_window)
	lab = Label(row, width=29, text=input_name)
	ent = Entry(row, width=40)
	row.pack(side=TOP, fill=X)
	#== Styling
	lab.config(bg=fieldBg, fg="white")
	row.config(padx=3, pady=3, bg=fieldBg)
	#== *
	lab.pack(side=LEFT)
	ent.pack(side=RIGHT, expand=YES, fill=X)
	return ent

def checkboxItem(parent_window, checkbox_name):
	row = Frame(parent_window)
	btItem = IntVar()
	bootstrapCheck = Checkbutton(row, text="", variable = btItem, command=(lambda: helloWorld(btItem.get())))
	checkLabel = Label(row, text=checkbox_name)
	checkLabel.config(bg=fieldBg, fg=fontColor)
	bootstrapCheck.config(bg=fieldBg)
	bootstrapCheck.pack(side=LEFT, padx=(215, 0))
	checkLabel.pack(side=LEFT)
	row.config(bg=fieldBg, pady=5)
	row.pack(side=TOP, fill=X, pady=(5,0))
	return btItem

def confirmWindow(makeIt):
	subWin = Toplevel(win)
	subWin.config(padx=10, pady=10, bg=mainBg)
	mainTitle = Label(subWin, text="Are You Sure?")
	mainTitle.config(bg=mainBg, fg=fontColor, font=("Helvetica Neue", 20))
	mainTitle.pack(side=TOP)
	myMessage = Message(subWin, text="A new project will be generated at the following location:")
	myMessage.config(bg=mainBg, fg=fontColor, width=800)
	myMessage.pack(side=TOP)
	fileWrap = Frame(subWin)
	fileWrap.config(bg=mainBg)
	fileWrap.pack(side=TOP, pady=(10,20))
	fileOut = Label(fileWrap, text=parent_directory.get())
	fileOut.config(padx=5, pady=5)
	fileOut.pack(side=TOP)
	goBtn = Button(subWin, text="Go", command=(lambda: project_generator(subWin, makeIt)))
	goBtn.config(width=10)
	goBtn.pack(side=LEFT)
	nopeBtn = Button(subWin, text="Cancel", command=subWin.destroy).pack(side=RIGHT)

def load_dependencies(full_path):
	os.system('sh '+ full_path +'/load-dependencies.sh')

def start_angular_server(full_path):
	os.system('osascript '+full_path)

def watch_files(full_path):
	os.system('osascript '+ full_path +'/resources/command-line/watch-files.scpt')

def helloWorld(myObject):
	print myObject

win = Tk()
win.iconbitmap('resources/img/plan-b.ico')
#== Styling
win.config(padx=10, pady=10, bg=mainBg)
#== *
appTitle = Label(win, text="Markdown Project Creator")
appTitle.config(font=('Helvetica Neue', 20), bg=mainBg, fg=fontColor)
appTitle.pack(side=TOP, pady=(0,15))
inputsFrame = Frame(win)
inputsFrame.config(bg=mainBg)
#== Add sections
buttonsFrame = Frame(win)
sectionRow1 = Frame(buttonsFrame)
leftCol1 = Frame(sectionRow1)
rightCol1 = Frame(sectionRow1)
sectionRow2 = Frame(buttonsFrame)
leftCol2 = Frame(sectionRow2)
#== Style
buttonsFrame.config(bg=mainBg, width=950)
sectionRow1.config(bg=mainBg)
leftCol1.config(bg=mainBg)
rightCol1.config(bg=mainBg)
sectionRow2.config(bg=mainBg, width=950)
leftCol2.config(bg=mainBg, width=475)

parent_directory = inputText(inputsFrame, 'Project Directory (absolute filepath)')

inputsFrame.pack(side=TOP, pady=(0,30))
confirmBtn = Button(sectionRow1, text="Create Project", command=(lambda: confirmWindow(parent_directory.get())))
confirmBtn.config(bg=mainBg)
confirmBtn.pack(side=LEFT)
# centerFrame = Frame(win)
# centerFrame.pack(side=LEFT)

#== Position
buttonsFrame.pack(side=TOP)
sectionRow1.pack(side=TOP, pady=(0,10))
leftCol1.pack(side=LEFT, padx=(0,78))
rightCol1.pack(side=LEFT)
sectionRow2.pack(side=TOP)
leftCol2.pack(side=LEFT)

quitBtn = Button(rightCol1, text="Quit", command=win.quit)
quitBtn.config(bg=mainBg)
quitBtn.pack(side=RIGHT, padx=(25,0))
Button(rightCol1, text="Download Dependencies", command=(lambda: load_dependencies(parent_directory.get()))).pack(side=LEFT)
watchFiles = Button(rightCol1, text="Watch Files", command=(lambda: watch_files(parent_directory.get())))
watchFiles.config(width=11)
watchFiles.pack(side=LEFT)

win.mainloop()