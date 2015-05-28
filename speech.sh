#!/bin/bash
MSG=$1
LANG=$2
/usr/bin/mplayer -ao alsa -really-quiet -noconsolecontrols "http://translate.google.com/translate_tts?tl=$LANG&q=$MSG"

