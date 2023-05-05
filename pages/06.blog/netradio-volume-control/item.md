---
title: Volume control working
taxonomy:
    tag: [electronics]
date: '16-02-2019'
---
# Volume Control Working

This is my first post about my Internet Radio Alarm Clock. For those who don't know about it, it's a Raspberry Pi powered alarm clock that will play Internet radio streams in the morning to wake you up. It features a Pi and an Arduino, talking to each other over I2C bus and Python.

Here is the breadboarded system below:

![](showing%20current%20station.jpg)

It consists of
* A Raspberry Pi Zero W
* An Arduino Nano (Old bootloader)
* A rotary encoder (volume)
* A ST7920 128x64 graphic LCD for displaying time, station, volume, etc
* A DS1307 Real Time Clock module (attached to RPi for system clock)
* A PHAT DAC - allowing sound output for the Raspberry Pi Zero W

This is the code in the main class that sets up the volume control

```Python
self.arduino.set_vol_change_callback(self.mpdc.set_volume)
self.arduino.start_rot_enc_thread()
```
This is the code that gets called on a frequent interval and polls the volume control knob attached to the Arduino over I2C bus.

```Python
if self.read_volume != self.last_read_volume:
                    self.vol_change_func(self.read_volume)
                    print(self.read_volume)
self.last_read_volume = self.read_volume
```
Full code:
[here](https://github.com/l33tllama/NetRadioAlarmClockPi/blob/master/alarm_clock.py)

Today I got the volume control part of the system working, which works by polling the Arduino regularly for the volume level, and sending it to MPD (Music Player Daemon) which controls the audio/radio station playing.

The next steps I think will be to solder the components to a protoboard as the connections are currently very flakey, causing issues.
