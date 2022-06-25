---
title: General Update - Website, Apple, Game
taxonomy:
    tag: [update, apple, gamedev]
date: '25-06-2022'
---

# General Update - Website, Apple, Game to Release

Long time no blog post!

## Website Stuff - Migration and Git

My website has been moved over from Net Virtue to VentraIP as VentraIP kinda bought Net Virtue. Fortunately, the monthly fee hasn't increased, yay.  
However there has been an issue, the Grav Git integration has stopped working, because VentraIP disable the `exec()` function in PHP. A very sensible safety feature, but has broken the Git sync feature in Grav. I was using it to push new blog posts to the site, as opposed to dumping new stuff via FTP. FTP kinda sucks. Poor security and flaky connections.. I try to avoid it as much as possible.
I seem to have fixed it though! In their wisdom, VentraIP allow terminal access to the web hosting. This is very useful, I have a Git repo in the `/user/` directory. I also have a crontab (schedule) which periodically runs `git pull` to get new content. Still not as nice as the built-in Git sync. With that plugin, I just pressed the Sync button (in admin interface) and it would pull the latest changes with ease. With this, I either have to wait for the sync period, or go into the web hosting terminal.. But at least it works.

## New Website - LeoFebeyTech.com.au

I have registered a new domain name, `leofebeytech.com.au`. I have moved my work emails over to it, using FastMail, and I plan to set up a new website which focuses just on my business stuff. I've also been tweaking my logo a bit. The default colours are just the offocial Ubuntu colours, which I feel is a bit unoriginal (sorry Pablo). So I slightly shifted the colours a bit and increased the line thickness for readability. See a preview below:  
![](test-logo.png)  
I have been thinking about what CMS/framework to use for the new website. I thought maybe use something new or different. But there's a reason I picked Grav. I did my research, and went through *many* options, and finally settled on Grav. Since using it I've really enjoyed it and am very familiar with it. No need to change really!  
I've become more familiar with Wordpress, over time, but that's something I try to avoid.. It's beefy and has a MySQL database. I've dealth with some of the issues with bigger Wordpress sites corrupting over time and then things like backups aren't too fun.. I really love Grav's completely flat-file structure. No database like SQL or MongoDB or anything. So good. So the new site will probably look a lot like this one but with some tweaks and small improvements here and there. I've got to update it to be more "SEO" friendly as well.

## Apple Ecosystem Update

I've been using my MacBook for over 6 months now and I can say that it works. I don't hate it. It has taken quite a bit of time to adjust and get more familiar with MacOS. I've worked around it's limitations and have started to develop a better and better workflow.
Still some quirks I don't love about it though.

* The dock 1) Clicking on icons doesn't minimise the windows
* The dock 2) Weird separation between pinned apps and other apps, unlike Windows
* The dock 3) Hard to switch between multiple windows of the same application. You have to right click and select window by title name. Not amazing. Although, Command+Tilda works.
* No built-in window snapping. A bit nicer in Windows 11..
* I hardly ever want to "full screen" a window and remove the dock and top bar. I'm far too used to Windows and Linux. I just double-click the title bar to maximise a window, which isn't super intuitive.  
But there are some things I do like about MacOS
* System tray is tidy, functional, and works well (and exists - unlike in elementaryOS)
* Tabs in file explorer!!
* Very clean and polished UI that is growing on me..
* Apple Photos is a really great program/app for manging photos on my new iPhone.. Better than Google Photos of the past.
* Managing (installing/removing) applications is very "clean" and compartmentalised, but new people might find it weird and not straight-forward.
* Command line tools are there and sufficient. I can also do proper game development from command line tools. Better than Windows in that regards..

### Docker..

I have been wondering how to get a "Linux-like" environment on the Mac, so I can ensure code works the same on deployed systems. At first I had a good go with Docker. As it is basically a Linux environment, containerised.

#### But a couple of problems with Docker..

* Uses a fair amount of storage still, on my 256GB drive it eats it all up

* Docker is a bit of a dark art and hard to use.. Nowhere near as simple as Windows Subsystem for Linux

* It also eats more RAM of course - I've had a project which required my whole 16GB of RAM just to build something..  
But, it can be useful for some things. It's great for getting some things up and going really quickly, like for example Grav. I've set up a new Linode server and installed Docker on it. I then ran the build process for Grav in Docker. It didn't take *too* long and it just worked! Yay! Mounting files locally was a bit quirky, but did get that going too.   
  
For local MacOS development, I think the new approach will be to avoid Docker as much as I can.. Just use local tools such as Python (and Python environments), and such in a way that should be very similar to a deployed server. Some may say that's not ideal, should use a Linux machine or WSL, but for now it will have to do. If I run into problems, maybe I can pull out an older laptop 🤷‍♂️. Oh and there's maybe [GitHub - lima-vm/lima: Linux virtual machines, typically on macOS, for running containerd](https://github.com/lima-vm/lima/tree/master).

### iPhone
  
Oh yeah, I bought an iPhone (12). I'm so trendy and stuff. I thought I'd finally give the iPhone a go. Would be myopic not to at some point!  
I won't go into too much detail here, but so far I have been enjopying it.

* Very fast

* Good camera

* Simple to use

* "It just works"

* Wireless charging

* Integration with other Apple stuff

* iMessages! I can *easily* send SMS's from my Mac..
  Maybe I'll go back to Android one day again. I did use it for 12 years. But it's certainly a refreshing ("healthy"?) change.

## Game! Gravity Flux - To be released on Steam pretty soon!!

The last major update is that I am going to release a game on Steam soon!  
The game is Gravity Flux - a 2D local multiplayer fighting game where the gravity changes randomly. It's a very simple concept, but it has been not that simple getting it to a state where it is ready for releasing to the public. Lots of bugs to fix and things to tweak to make sure the game is fun and a smooth experience.
You can read more on my official game development blog: [https://motleypixels.com](https://motleypixels.com).
And here's the trailer:
[plugin:youtube](https://www.youtube.com/watch?v=GuEmsJVFipc)  
You'll probably here one way or another when it's up on Steam for wishlisting!