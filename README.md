A simple **proof of concept** plugin for switching profiles with WebSocket messages from Keyboard Maestro macros.

### Clone the repo

```bash
git clone https://github.com/dtsmarin/sdprofileswitch
```

### Install dependencies

```bash
npm install
```

### Add the Plugin to Stream Deck

Create a SymLink of your plugin folder inside the Stream Deck's `Plugins` folder.

```bash
ln -s $(pwd)/com.example.profile-switch.sdPlugin ~/Library/Application\ Support/com.elgato.StreamDeck/Plugins/
```

### Add your Profiles to the Plugin

Copy the profiles you want to use as a starting point inside the `com.example.profile-switch.sdPlugin` folder of the repo.

In the `manifest.json` file define the same profiles using the exact name and the correct [DeviceType](https://docs.elgato.com/sdk/plugins/manifest#profiles) code for your SD device.

Inside the file `plugin.ts` change the Websocket switch cases and profile names to match your requirements.

Build the plugin with `npm run build`.

Add the template counter function inside any existing user StreamDeck profile to initialize the plugin.

When the plugin receives any WebSocket message that matches any of the switch cases Stream Deck will prompt you to install the profiles you bundled with the plugin.

### Rust WebSocket CLI

This specific code is not neccesary, you can use anything that works in a similar way (Basic WebSocket client). I'm not a Rust expert.

```bash
cargo build --release
```

Usage:

```bash
streamdeckws <message string>
```

## How to use in Keyboard Maestro

- Add an `If Then Else` block.
- To avoid sending to the WebSocket server when it doesn't exist add as a condition: `This application:` -> `Elgato Stream Deck` -> `is running`
- Inside the `execute the following actions` branch add an `Execute Shell Script` block.

```bash
[pathToYourRustExecutable]/streamdeckws <message string>
```
