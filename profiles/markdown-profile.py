#===================================================================
#
#	HEADER
#
from scab import *
import sys
import re

baseDir = os.path.dirname(os.path.realpath(__file__))
pat = "([A-Za-z0-9_-]+)$"
regexDir = re.sub(pat, "", baseDir)
templateDir = regexDir+'TEMPLATE'
projectDir = str(sys.argv[1])
#== Verify in Terminal
print "||=============================================================================="
print "||"
print "||  Template Path: ", templateDir
print "||  Project Path: ", projectDir
print "||"
print "||=============================================================================="
#===================================================================

t = scab()
t.scan(templateDir+'/markdown')
t.record()
t.build(projectDir)
t.clean()
t.scan(templateDir+'/foundation-5.2.3')
t.record()
t.build(projectDir+'/docs/foundation5')