---
title: Fixing OpenVPN Network Reconnecting
taxonomy:
	tag: [openvpn, linux, vpn]
date: '13-12-2019 22:30'
---
# Fixing OpenVPN - When the network disconnects and reconnects

I have been using OpenVPN for a professional project for a client. It allows me to manage a network of devices remotely. Doing things like updating code, running system updates, fixing things, etc.

However, the network is very intermittent. It connects and disconnects a lot, and the Internet connection is on and off.

I noticed that when I disconnected from WiFi and reconnected again, on a device connected to an OpenVPN network, the OpenVPN network would cease to function. This would appear to be a significant bug on OpenVPN's part.

Due to my requirements of having an intermittent network, I desperately sought to fix this.

At first, my simple fix was to add 

```
systemctl restart openvpn
```

In the file /etc/network/if-up.d/openvpn

This worked when the operating system was running, however when the operating system was booting up, it would cause the OS to hang indefinitely. That's not ideal.

After a bit of research, it occurred to me to add

```
systemctl stop openvpn
```

To the end of /etc/systemctl/if-down.d/openvpn

and leave the if-up.d/openvpn file as it was (it had systemtcl start openvpn)

This almost worked, however it wouldn't stop the OpenVPN service when disconnecting from WiFi.

So I tried adding it to /etc/network/if-post-down.d/openvpn

And that worked

And for some reason, OpenVPN wasn't starting when the network reconnected again, 

So I added

```
$SYSTEMCTL --no-block start openvpn
```
(Importantly, add --no-block so the system doesn't hang on boot)

To the end of /etc/network/if-up.d/openvpn

And tada, it works! Even when booting, the system doesn't hang. And when reconnecting to a WiFi hotspot, OpenVPN restarts properly.

Problem solved.

