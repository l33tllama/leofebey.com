---
title: New MacBook
taxonomy:
	tag: [laptop, apple, mac, macbook]
date: '26-11-2019'
---

# New MacBook
Hello, apologies for the lack of updates on this blog. I try to make regular posts about various things. I have more stuff to post about, stay tuned.  
Anyway, this post is a quick one about the new MacBook Air M1 that I bought this week.  
I've historically been a Windows/Linux kind of person. But my work, for [Ditto][https://ditto.live], has got me using a MacBook Pro 15 2016 model for over a year now. I've kind of got used to MacOS and I was finding myself switching between my previous Windows work laptop (ASUS Zenbook S UX391) and the MacBook, especially when I was mostly just working on Ditto.
The Zenbook is a great machine, with an i7-8550u processor, 16GB RAM and now a 1TB HDD. I bout it back in 2019 for just $1700 plus extra insurance. I shortly after bought an external GPU, and then it became my work and gaming machine. 
It pains me to leave that machine behind, but I just wanted to use one primary device for work, and also allow me to take on new work that might involve using XCode.  
I managed to buy the MacBook Air thanks to [NILS Tasmania](https://nilstasmania.org.au) and their no-interest loans for people on low income or Centrelink supports. I applied for the low-interest loan for $1500.  
The MacBook that I bought was the 256GB storage, 16GB RAM model. I knew I would need the 16GB of RAM, and shortly after getting it, I confirmed my suspicions.

## Experience so far
### X86 emulation with UTM
On day one, one of the things that I did was test x86_64 emulation with UTM virtual machine manager. Myself and someone I know on Twitter were curious about what the performance was with the ARM-based Apple M1 chip. I recorded my experience and uploaded it to YouTube:   
[plugin:youtube](https://www.youtube.com/watch?v=3jgcRWXtd8A)  
As you can see, it's very very slow, but just usable. I suppose impressive from the perspective that it's emulation, not virtualisation, kinda like emulating an Xbox 360 or Nintendo Wii U processor, you need a pretty beefy CPU to do it with results that aren't super-painful. This isn't great, but as you can see it works.  
### Docker and Rust cross-compilation
Since ARM on Mac kinda hit the market all at once, developers everywhere will be slowly porting everything over to M1. Some docker containers are one of those things that don't always seem to work with the new architecture. I have been using [Rust Embedded/Cross](https://github.com/rust-embedded/cross) to compile Ditto software for Raspberry Pi on the x86_64 Mac previously with no issues. However now, I am having issues with the Apple M1 chip. There seems to be an issue with `ldconfig` an essential tool for installing packages with `apt` I've submitted the [issue](https://github.com/rust-embedded/cross/issues/614) with no response in 24hrs yet.. 
### Storage
I couldn't really afford any specs better than the 256GB/16GB model, and I thought I'd pull the trigger on it anyway because I thought that 256GB should be just enough. But 2 days in and I'm at about 80GB free. Not heaps. As an all-rounder developer, I'd suggest anyone with broad tech skills to try to get a 512GB model so that you're not constantly pruning things, which is what I'm doing.. I think it will be enough for now, but it's an effort to keep the HDD space as unused as possible.
### iOS apps on M1
Long story short: Many popular iOS apps aren't supported, such as Facebook, Twitter, Netflix, YouTube, etc. Which is a kind of a bummer. It's not what I got a MacBook for, but the dream of iOS apps on desktop isn't here yet, folks.
### Kivy
Another quirk of M1 was that Kivy (Python GUI library) did not work OOTB with `pip3 install kivy`. Following a [git issue](https://github.com/kivy/kivy/issues/7668), I was able to install it and get it running with `pip3 install git+https://github.com/kivy/kivy.git`. I'm using Kivy for my cross-platform music library software project. Kind of like iTunes/MusicBee for all platforms.. Finally.. Still **very** early stages.
### Ubuntu ARM in a VM
This however works really well. I first tried the desktop version, which works pretty well, fast, snappy. Then tried the server version for attempting to cross-compile Ditto for Raspberry Pi (which didn't work today). But the server experience was extremely fast too. With good Internet, you can download many packages and install them quickly, then build a large Rust project pretty quickly, comparable to on the MacOS desktop.
### Other software
I'm happy to report that some of my favourite, slightly-obscure software works, such as:
* Arduino
* STM32 Cube IDE (for STM32 processors - not fully tested yet but it opens)
* Inkscape, GIMP, LibreOffice
* GNUCash
* Godot Engine (Apple native)
* Nextcloud
* Joplin
* Android Studio - Apps with NDK build and run on local devices!
* KiCAD
* PyCharm
* Minecraft (phew)
* Steam runs, games are limited
### OneDrive
This deserves it's own section. OneDrive for Mac seems to be a big CPU hog, using over 80% CPU at all times. Wha?
It doesn't help that it's *still* an Intel/x86 app. Bit lazy, Microsoft. This is probably having a big impact on battery life. Apparently a new ARM version is due out in Jan 2022. Will be holding out for that. But if the CPU usage still doesn't go down, I might have to switch to iCloud.
### Battery
Speaking of battery, it's very good, as many report. I used it at the Hobart Hackerspace last night, and it lasted from about 8PM-10:30PM mostly on, with something like 60% battery left over. I think that could be even better if it weren't for the CPU hog OneDrive.



