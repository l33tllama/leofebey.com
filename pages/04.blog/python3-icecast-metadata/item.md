---
title: Getting Icecast Metadata with Python 3
taxonomy:
	tag: [icecast, python, python3]
date: '07-02-2020 14:10'
---

# Getting Icecast Metadata with Python

I'm currently working on making an Internet radio alarm clock. It's powered by a Raspberry Pi and an Ardiuno for controls/LCD.

I was using MPD to control the stations, but I was having stability issues, so I switched to MPG123. However I still need a way to get the station metadata (Station name, artist, title, etc).

I did some net searching and found a NodeJS solution, however I'm using Python and I was unable to get it running.

So I did some more searching and found a Python solution. [https://stackoverflow.com/questions/6613587/reading-shoutcast-icecast-metadata-from-a-radio-stream-with-python](https://stackoverflow.com/questions/6613587/reading-shoutcast-icecast-metadata-from-a-radio-stream-with-python)

It was however written for Python2. And there is a major difference between urrlib in Python2 and Python 3.

So I looked up the API for urllib in Python and converted it.

See code below:

```Python
import urllib.request

stream_url = 'http://live-radio01.mediahubaustralia.com/7LRW/mp3/'

header = {'Icy-MetaData' : 1}


request = urllib.request.Request(stream_url, headers=header)
response = urllib.request.urlopen(request)
icy_metaint_header = response.headers.get('icy-metaint')
if icy_metaint_header is not None:
    metaint = int(icy_metaint_header)
    read_buffer = metaint+255
    content = response.read(read_buffer)
    content_str = ""
    for _byte in content:
        content_str += chr(int(_byte))

    stream_title_pos = content_str.find("StreamTitle=")
    post_title_content = content_str[stream_title_pos+13:]
    semicolon_pos = post_title_content.find(';')
    station_name = post_title_content[:semicolon_pos-1]
    print("Station: " + station_name)
```

As you can see, it takes the content (which is binary), converts it to text and searches for StreamTitle, where the metadata is.