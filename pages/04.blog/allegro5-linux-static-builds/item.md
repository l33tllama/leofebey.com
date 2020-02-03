---
title: Allegro 5 Linux Static Builds
taxonomy:
	tag: [allegro5, game, linux, c]
date: '22-07-2019 22:00'
---

# Allegro 5 Linux Static Build

There is very little documentation on the net about how to build Allegro games with the command line/Makefiles.

I've cobbled together bits that I've found across the net into a working solution, for development builds.

However, when I want to distribute my game to the public, I need to create a staticlly linked build, that is, one that doesn't rely on pre-installed system libraries (namely Allegro and it's dependencies).

I sort of managed to get a static build working, by including the static libraries for Allegro, built from source. However, when actually run on target systems which don't have Allegro 5 installed, they complain about missing system libraries, notably libdumb and libopenal.

A bit of Googling/DuckDuckGoing led me to this thread [https://www.allegro.cc/forums/thread/616656](https://www.allegro.cc/forums/thread/616656)

It covers how to release a static binary for your game. I tried that, however I still had issues.

User **amarillion** provided a very useful suggestion, to include libdumb as a static library.

He provided an include list which is effectively what ```pkg-config --cflags --libs allegro-5 allegro_image-5 allegro_primitives-5 allegro_dialog-5 allegro_audio-5 allegro_acodec-5 allegro_font-5 allegro_ttf-5``` does, but split the static and dynamic libraries up so that libdumb is included in the static libraries.

His include list was missing two dynamic libraries, ```-lwebp -lXpm```. Which I discovered by reading compiler error messages.

## Compiling LibDumb with -fPIC flag

The compiler spits out a big error message, 

```
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/libdumb.a(rendsig.o): relocation R_X86_64_32 against `.rodata.str1.8' can not be used when making a PIE object; recompile with -fPIC
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/libdumb.a(itrender.o): relocation R_X86_64_32S against `.text' can not be used when making a PIE object; recompile with -fPIC
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/libdumb.a(resample.o): relocation R_X86_64_32S against `.bss' can not be used when making a PIE object; recompile with -fPIC
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/libdumb.a(itread.o): relocation R_X86_64_32 against `.rodata.str1.1' can not be used when making a PIE object; recompile with -fPIC
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/libdumb.a(reads3m.o): relocation R_X86_64_32S against symbol `_dumb_sigtype_it' can not be used when making a PIE object; recompile with -fPIC
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/libdumb.a(readxm.o): relocation R_X86_64_32S against symbol `_dumb_sigtype_it' can not be used when making a PIE object; recompile with -fPIC
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/libdumb.a(readmod.o): relocation R_X86_64_32S against symbol `_dumb_sigtype_it' can not be used when making a PIE object; recompile with -fPIC
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/7/../../../x86_64-linux-gnu/libdumb.a(xmeffect.o): relocation R_X86_64_32S against `.rodata' can not be used when making a PIE object; recompile with -fPIC
```

So, the solution that I discovered for this problem was to compile LibDumb from source, and use the -fPIC CFlag option.

You can download DUMB from here: [https://sourceforge.net/projects/dumb/files/](https://sourceforge.net/projects/dumb/files/)

Once downloaded and extracted, open up the Makefile and look for the line around line 237

```Makefile
LDFLAGS := -s
```
And add -fPIC to the end

```Makefile
LDFLAGS := -s -fPIC
```

And run make. Despite being used for Allegro, you do not need to include Allegro support, when it prompts you.

This should produce .a files. You can add those to your existing Allegro static library files directory location.

## Just give me the Makefile!

Ok, here is the Makefile which I use for my game. This also includes options for a Windows build! Using mingw64-gcc in Linux or WSL.

```Makefile
CXX=gcc
CXXW=i686-w64-mingw32-gcc
CFLAGS=-Wall -g -O0
CFLAGS_PROFILE=-Wall -pg -O0
CFLAGSWIN=-Wall -g -O0
CFLAGS_WIN_PROFILE=-Wall -pg -O0
PKG_CONFIG_PATH=pkgconfig
CFLAGSWINRELEASE=-Wall -g -O0 -Wl,-subsystem,windows
LDFLAGS=`pkg-config --cflags --libs allegro-5 allegro_image-5 allegro_primitives-5 allegro_dialog-5 allegro_audio-5 allegro_acodec-5 allegro_font-5 allegro_ttf-5` -lm
LDFLAGS_RELEASE=-L/home/leo/Documents/allegro/lib -Wl,-Bstatic -lallegro_primitives-static -lallegro_main-static -lallegro_dialog-static -lallegro_image-static -lallegro_audio-static -lallegro_ttf-static -lallegro_font-static -lallegro_acodec-static -lallegro-static -ldumb -Wl,-Bdynamic -lgtk-x11-2.0 -lgdk-x11-2.0 -lpangocairo-1.0 -latk-1.0 -lcairo -lgdk_pixbuf-2.0 -lgio-2.0 -lpangoft2-1.0 -lpango-1.0 -lgobject-2.0 -lglib-2.0 -lfontconfig -lfreetype -lgthread-2.0 -lglib-2.0 -lpng -lz -ljpeg -logg -lFLAC -lvorbisfile -lvorbis -lpulse-simple -lpulse -lasound -lopenal -lfreetype -lz -lm -lpthread -lSM -lICE -lX11 -lXext -lXcursor -lXi -lXinerama -lXrandr -lGLU -lGL -lwebp -lXpm
LDFLAGSWIN=-lallegro_monolith.dll -lm -lws2_32
INCLUDE=src/background.h src/csv_parse.h src/game.h src/game_common.h src/gameobject.h src/main.h src/player.h src/crosshair.h src/rockets.h src/ai.h src/getdelim.h src/dyad.h src/network_player.h src/network_ai.h src/timeval_subtract.h src/network_rockets.h src/rocket_launchers.h src/network_rocket_launchers.h src/hud.h src/minIni.h src/menu.h src/cursor.h
DEBUGMODE=1
OBJS=src/main.c src/background.c src/csv_parse.c src/game.c src/gameobject.c src/player.c src/crosshair.c src/rockets.c src/ai.c src/getdelim.c src/dyad.c src/network_player.c src/network_ai.c src/timeval_subtract.c src/network_rockets.c src/rocket_launchers.c src/network_rocket_launchers.c src/hud.c src/minIni.c src/menu.c src/cursor.c
OUT=wwr 
OUTWIN=wwr.exe
LIBS32=-L./win32lib/lib32
LIBS=-L./lib
INC32=-I./win32lib/include32

all: main_rule

debug-profile:$(OBS)
	$(CXX) $(OBJS) -o $(OUT) $(INCLUDE) $(CFLAGS_PROFILE) -pg -Wno-unused-variable $(LDFLAGS)

debug:$(OBJS)
	$(CXX) $(OBJS) -o $(OUT) $(INCLUDE) $(CFLAGS) -pg -Wno-unused-variable $(LDFLAGS)

clean:
	rm -rf *.o main

release:
	$(CXX) $(OBJS) -o $(OUT) $(INCLUDE) $(CFLAGS) -Wno-unused-variable $(LDFLAGS_RELEASE)  $(LIBS)

#TODO: build allegro for Windows.. 
windows:
	$(CXXW) $(OBJS) $(LIBS32) $(INC32) -o $(OUTWIN) $(INCLUDE) $(CFLAGSWIN)  $(LDFLAGSWIN)
	
windows-debug:
	$(CXXW) $(OBJS) $(LIBS32) $(INC32) -o $(OUTWIN) $(INCLUDE) $(CFLAGSWIN) -Wno-unused-variable $(LDFLAGSWIN)

windows-debug-profile:
	$(CXXW) $(OBJS) $(LIBS32) $(INC32) -o $(OUTWIN) $(INCLUDE) $(CFLAGS_WIN_PROFILE) -Wno-unused-variable $(LDFLAGSWIN)

windows-release:
	$(CXXW) $(OBJS) $(LIBS32) $(INC32) -o $(OUTWIN) $(INCLUDE) $(CFLAGSWINRELEASE) -Wno-unused-variable $(LDFLAGSWIN)

main_rule: $(OBJS)
	$(CXX) $(OBJS) -o $(OUT) $(INCLUDE) $(CFLAGS) $(LDFLAGS)

```

## Additional notes

For the static build, you need static libraries to be included in your build options.

You can download the source code for Allegro from the Github page. [https://github.com/liballeg/allegro5/releases](https://github.com/liballeg/allegro5/releases)

I believe the static libraries are included in the mingw32-gcc releases, however I build Allegro 5 from source using cmake and make. I used 'ccmake' or 'cmake-curses-gui' package in Ubuntu to configure the build options. **Make sure SHARED is set to OFF!** for static libraries. It should produce in the lib folder 'liballegro-static.a' and similar files, which you need to copy into a folder within yout game project folder. (In my case lib)

Now you can distribute your packaged game to other people running Linux, without them needing to install Allegro first!