---
title: MadMachine Swift Programming for Microcontrollers - Robot Demo
taxonomy:
	tag: [swift, microcontroller, robotics]
date: '24-05-2020'
---

# MadMachine Swift Programming for Microcontrollers - Robot Demo

*Originally posted on my [Patreon](https://www.patreon.com/leofebeyprojects) - please consider subscribing, it really supports me by encouraging me to work on the projects I am most passionate about!*

[plugin:youtube](https://www.youtube.com/watch?v=ZArcjqYsGfI)

## Swift Programming for Microcontrollers - MadMachine

I was contacted by someone a few weeks ago, asking for help to make a demo project for an upcoming microcontroller to be soon launched on Kickstarter. He lives in Hobart, but knows the person developing the board in China. I agreed (as an incentive, I would be paid). I decided to stick with my passions, to make a robot. I've never programmed in Swift before, but I picked it up fairly quickly. It's a bit like Python and Typescript. I can see that it's a bit more quick and effective than Objective C. 

I had some challenges making the robot.

## MadMachine IDE Bugs (Windows)

In an earlier version of MadMachine, Windows Defender would delete the Swift compiler executable. This is a slight problem. Adding an exception fixes it.

Also, the IDE wouldn't work if installed in a path with spaces in it ("Program Files"). A bit weird, but installing it to the C:\ drive fixes it.

## Swift conversion from unsigned int to double

As nice as Swift is, it doesn't have automatic type conversion. I had to convert microseconds into a double to do a floating point calculation to calculate the ultrasonic distance.

```Swift
 let distanceCm:Double = Double(diff_us) / 2.0 * speedOfSoundInCmPerMs
```

## Ultrasonic sensor voltage level conversion

The ultrasonic sensor just didn't want to work at 3.3V. I had some success getting it to work with another development board at 3.3V, but not this one. So I had to buy a voltage level converter. Which worked.

## Funny ultrasonic readings when motors running

The ultrasonic sensor was reporting incorrect values, when the motors were running, but not when they were stopped. I used my logic analyser to see how the main +6V line was doing, and it was dropping quite a lot! It dropped below 3V. So my solution was to use a separate 9V battery to power the MCU and ultrasonic sensor, and use the 6V battery to power the motors. And that worked.

See above video for working robot evidence.

I made a library for the ultrasonic sensor to be used with MadMachine - [https://github.com/l33tllama/MadMachine_HC-SR04](https://github.com/l33tllama/MadMachine_HC-SR04)