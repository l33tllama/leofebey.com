---
title: Incremental Makefile
taxonomy:
	tag: [makefile, gcc, linux]
date: '12-05-2020 17:30'
---
# Incremental Makefile

In case you don't know, I have been working on [Wizards with Rockets](https://l33tllama.itch.io/wwr) for over 2 years now! It is a game written completely in C and it uses a Makefile for compiling the code. Makefiles are a bit of a lost art. They were very popular in the late 80s and 90s. But now in 2020, almost everyone is using an IDE (how sensible). Most documentation on Makefiles online is somewhat limited, hard to understand (sometimes lengthy), and hosted on very old websites that look like they might be from the 90s. 

I had found an example Makefile that compiled all source files every time. It was simple and easy to understand. My Makefile looked something like:

```Makefile
debug:$(OBJS)
	$(CXX) $(OBJS) -o $(OUT) $(INCLUDE) $(CFLAGS) -pg -Wno-unused-variable $(LDFLAGS)

windows-debug:
	$(CXXW) $(OBJS) $(LIBS32) $(INC32) -o $(OUTWIN) $(INCLUDE) $(CFLAGSWIN) -Wno-unused-variable $(LDFLAGSWIN)
```

Where the variables represent compiler, .c files, include files, flags and linker options (All the stuff needed for Allegro).

Super simple and it just worked, every time.

But the problem was that it was starting to take a little while, especially on my Windows PC using MinGW GCC. I'd make a tiny change, and I'd have to wait 10-20 seconds for it to compile. This isn't ideal for rapid iteration. I had heard of the ability for Makefiles to only compile the changed files, which is super smart. But **all** of the examples I found on Stackoverflow and etc on search engines were not working for me. They used special rules like ```%.o: %.c:``` to compile every .c file into a .o file. This was super easy to explain on Stackoverflow, but doesn't always work. For some weird reason, that rule would use the default CC variable, cc, which links to gcc. On windows (WSL) this isn't ideal because it compiles a native Linux .o file - not runnable on normal Windows PCs. And it was sometimes complaining about undefined functions - missing header files.

## Solution
I found one site (I forget which one) that showed a breakdown of how to make a proper Makefile. It stepped you through it from a simple example to a more complicated one. Then it showed the ```%.o: %.c``` example that doesn't work for me. The steps in between showed how to create a rule for **every** .c file in the project. I have a few, so it's a long list of rules. After testing it, and some troubleshooting (remember to put the -l linker settings at the **end**) it worked!

Here is an example (not all .c files shown, there are a few thanks to the Nuklear library I am using >.>)
```Makefile
CXXW=i686-w64-mingw32-gcc
OBJS= src/tmx/tmx_utils.c src/tmx/tmx.c src/tmx/tmx_xml.c src/tmx/tmx_mem.c .. etc
CFLAGSWIN=-Wall -g -O0 -pg -ggdb
LDFLAGSWIN=-lallegro_monolith.dll -lm -lws2_32 -lxml2
LIBS32=-L win32lib/lib32 
INC32=-I win32lib/include32
OBJS_O = $(OBJS:.c=.o)

wwr-win-debug: $(OBJS_O)
	$(CXXW) -o $(OUTWIN) $(CFLAGSWIN) $(INC32) $(LIBS32) $(OBJS_O) $(LDFLAGSWIN)
 
src/tmx/tmx.o: src/tmx/tmx.c src/tmx/tmx.h src/tmx/tmx_utils.h
	$(CXXW) -c src/tmx/tmx.c -o src/tmx/tmx.o $(LDTMX) $(INC32)  $(LIBS32) $(CFLAGSWIN)

src/tmx/tmx_xml.o: src/tmx/tmx_xml.c src/tmx/tmx.h 
	$(CXXW) -c src/tmx/tmx_xml.c -o src/tmx/tmx_xml.o $(LDTMX) $(INC32) $(LIBS32)  $(CFLAGSWIN) 

...

src/ai.o: src/ai.c src/gameobject.h src/game_common.h src/background.h
	$(CXXW) -c src/ai.c  $(INC32) $(CFLAGSWIN) -o src/ai.o $(LDWINALLEG) $(LDM)

src/background.o: src/background.c src/game_common.h src/gameobject.h
	$(CXXW) -c src/background.c  $(INC32) $(CFLAGSWIN) $(LDFLAGSWIN) -o src/background.o

src/player.o: src/player.c src/player.h src/game_common.h src/hud.h src/background.h src/checkpoints.h
	$(CXXW) -c src/player.c $(LIBS32) $(INC32) $(CFLAGSWIN) $(LDFLAGSWIN) -o src/player.o

...
```

And it works! I make a change to one file, and it only recompiles that file. Massive time saver. I wish I had figured this out a long time ago (2018).

One key thing to note is the ```OBJS_O``` variable which easily converts the list of .c files into a list of .o files to be passed into the final rule to build the executable file.

Maybe this can be simplified into something like a ```%.o: %.c``` rule, but I'm still stabbing around in the dark with Makefiles. As said, it's a bit of a dark art.

### Issue - Multiple platforms
One slight issue with this is that I can't seem to use the same Makefile for multiple platforms (Windows and Linux). The individual files use just one C compiler variable (in this case the mingw-gcc compiler). If I want the incremental builds to work on Linux, I will probably have to make a separate Makefile for Linux. Or just put up with the build times on Linux (which are actually not bad compared to Windows..).

Hope this may have helped someone!

