---
title: Simple Python Non-blocking Socket Server
taxonomy:
	tag: [python, sockets, server]
date: '30-09-2021 14:30'
---

# Simple Python Non-blocking Socket Server
I have been looking for a way to make a simple non-blocking socket server. I found a few examples on the net, that use `select` but they were complex and didn't show how to handle messages.
How did I get to reaching this question?

The simplest way to make a socket server for listening to raw socket connections (such as sensors in my case) is something like this (blocking):
```Python
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(("0.0.0.0", port_number))
server_socket.listen(max_clients)
while True:
        client_socket, client_address = server_socket.accept()
        handle_client(client_socket, client_address)
```
The problem with this is that is stalls at `server_socket.accept()` and doesn't continue until there is a connection.  
Bad, becuase it keeps the socket open indefinitely. You could put it in a thread, but then it gets ugly when you need to close the server, sometimes the thread persists in the background.  
So I web-searched for "non-blocking python socket" and eventually found some examples that used `select` but as mentioned, they are quite complex, handling every scenario when many are unnecessary (eg when you just need to receive messages). 
"select" is a function available in most operating systems, and from my basic understanding, is a handler for inputs and outputs from processes, or functions in programming in this case.
  
For a simple server that just listens and does not respond, I find this code works well:
```Python
def handle_client(client, address):
    request_bytes = b"" + client.recv(1024)

    if not request_bytes:
        print("Connection closed")
        client.close()
    request_str = request_bytes.decode()
    print(request_str)

server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_socket.bind(("0.0.0.0", port_number))
server_socket.listen(max_clients)


inputs = [server_socket]
outputs = []

while True:
        readable, writable, exceptional = select.select(
        inputs, outputs, inputs, 1)
        for s in readable:
                if s is server_socket:
                connection, client_address = s.accept()
                connection.setblocking(0)
                inputs.append(connection)
                threading.Thread(target=handle_client, args=(connection, client_address)).start()
```
Note the "1" argument in `select.select()` which has a timeout of 1 second, meaning it will keep looping through the `while` loop regardless if there is a connection.
I tested it with sending messages every 150ms, using this code:
```Python
import socket
import time

data = "Hello Server!";
i = 0
while i < 15:
    clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM);
    clientSocket.connect(("127.0.0.1", 9001));
    data_o = data + str(i)
    clientSocket.send(data_o.encode());
    time.sleep(0.15)
    i += 1
    clientSocket.close()
```
And it works fine, receving all messages.


