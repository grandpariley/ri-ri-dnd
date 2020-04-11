# ri-ri-dnd
Discord bot for DnD on Discord

# setup
You'll need node, npm, and nodemon. Once those are installed `npm install` to download all of the packages, `npm start` to run a dev server, and `npm test` to run all unit tests. You will also need a `.env` with the Discord token, talk to me about getting that.

# contributing
The pattern right now is using handlers. Handlers have a `constructor(message)` that creates the object and sets the discord message, an `is()` that returns a boolean determining whether that message fits the handler's criteria for response, and a `reply()` that returns the reply for that message. They have their own tests in `test/` and end with the file extension `.handler.js`. An example to copy is `marcoPolo.handler.js`.
