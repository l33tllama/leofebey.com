---
title: HHS Access Controller
taxonomy:
	tag: [python]
---
# Hobart Hackerspace Access Controller

![](hhs_logo.png)

The door at the Hobart Hackerspace has an RFID tag reader, and attached to it is the access controller computer. It consists of a Raspberry Pi running a Python script that handles tag scans and memership updates.

It's using OAuthv2 to authenticate queries about members from our membership system, TidyHQ.

[:fa-github: Github page](https://github.com/l33tllama/HHSAccessControlV4)
