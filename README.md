### What It Is

A Chrome extension that overrides your browser's new tab page with a rich note application with sparse features.

### Purpose

1. Develop a lite way to take notes in the fastest way possible
2. Personal play pen for trying out new ideas / libraries
3. Work through the full process from product design to creation, currently using Figma

### Notes

1. Notes are stored in local storage. (Will potentially be moved to chrome.storage for sync)
2. Deleted notes are kept. No undo button yet, but you can dig through your local storage to retrieve important deleted info.

### Installation

1. Clone Repo
2. `npm install`
3. `npm run build` (or `npm run start` for developing)
4. Open chrome extensions manager
5. Toggle `Developer Mode`
6. Select 'Load unpacked extension'
7. Select `feathernote/dist/`
