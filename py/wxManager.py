import itchat
import json
import sys

def batchSend(data):
	rooms = itchat.get_chatrooms()
	print(len(rooms))
        for room in rooms:
                toName = room['UserName']
                for msg in data:
                        print(msg)
                        itchat.send(msg, toUserName = toName)

def lc():
        print('finish login')
        if len(sys.argv)>1:
                data = sys.argv[1:]
                print(data)
                # print(len(itchat.search_chatrooms(name='')))
                batchSend(data)
        
def ec():
        print('exit')
# itchat.auto_login()
itchat.auto_login(hotReload=True,loginCallback=lc, exitCallback=ec)
itchat.run()
