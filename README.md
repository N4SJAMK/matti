# matti
Simple TTS server.

Usage: run

```bash
MATTI_ADDRESS=localhost MATTI_PORT=6666 sudo nodejs index.js
```

Then send POST request that goes something like this...

```json
{
    "message"  : "Hello world!",
    "language" : "en"
}
```

Needs mplayer installed for text-to-speech to work.
