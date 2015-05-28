# matti
Simple TTS server.

Usage: run MATTI_ADDRESS=localhost MATTI_PORT=6666 sudo nodejs index.js

Send POST request that goes something like this

```json
{
    "message"  : "Hello world!",
    "language" : "en"
}
```

Needs mplayer installed for text-to-speech to work.
