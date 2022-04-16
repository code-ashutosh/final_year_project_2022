> app-inash.py is the main server file 

### To run the backend server follow these steps:

1. Make sure you are inside API_chatbot directory 
2. use following command to activate the environment
> source myenv/Scripts/activate 
3. run the following command to run the application backend
> uvicorn app-inash:app --reload

4. now your backend server is up and running 

5. goto frontend_chat/ChatBot folder

6. use live server extension of vscode 

7. open index.html file with live server

8. now your frontend server is up and running at: http://myapp:5500/index.html

9. make sure you have changed your host files as follows



### Changes in hosts file in windows 

Press the Windows key.

Type Notepad in the search field.

In the search results, right-click Notepad and select Run as administrator.

From Notepad, open the following file:

c:\Windows\System32\Drivers\etc\hosts

 Make the necessary changes to the file. see file --> [host_file_example_screenshot](API_chatbot\hosts_file_example.png)

Select File > Save to save your changes.

And you are done here.
