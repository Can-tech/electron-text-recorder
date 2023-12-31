﻿# electron-text-recorder

A simple desktop app made by using Electron.js. It runs on the local machine and helps to save texts and words in it. Helpful for memorizing texts and words in different languages. The app gets the data from the JSON file. It uses the fs module readFile and writeFile to accomplish the file operations.

### Some possible improvements:

- In the main process the nodeIntegration option is enabled so that the fs module becomes usable in the rendering(client) process. However, this creates certain security vulnerabilities. Making the node modules directly usable within the client side, lets any remote content access the node by using the client side and they might be capable of deleting system files. However, considering that this application only works locally, this will not pose a risk. However, this improvement might be considered in the future. Check this post: https://stackoverflow.com/a/59888788/17099583
- UI beautifications
- New Feature, if the words are available in the text, show those words with a bg color.
- Feature, add Voice recordings of the words.
- Feature, text-to-speech reading for the texts.
![1](https://github.com/Can-tech/electron-text-recorder/assets/61757250/bca47147-863f-434c-926a-33b012e6eba8)
![2](https://github.com/Can-tech/electron-text-recorder/assets/61757250/3eb45f77-5564-4bdd-ba8d-46d90c738ad0)
