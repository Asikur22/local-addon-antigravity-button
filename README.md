# Antigravity Button for LocalWP

A LocalWP addon that adds a button to open the current site's public folder in **Antigravity**.

## Features

-   **One-Click Access**: Adds an "Open in Antigravity" button to the site info panel.
-   **Seamless Integration**: Works directly within the LocalWP interface.
-   **Direct Launch**: Opens the site folder directly in the Antigravity app.

## Installation

1.  Clone or download this repository into your Local addons folder:
    -   **macOS**: `~/Library/Application Support/Local/addons`
    -   **Windows**: `%AppData%\Local\addons`
    -   **Linux**: `~/.config/Local/addons`
2.  Navigate to the folder and install dependencies:
    ```bash
    npm install
    ```
3.  Build the addon:
    ```bash
    npm run build
    ```
4.  Restart LocalWP.
5.  Enable the addon from the **Tools > Add-ons** menu if not already enabled.

## Development

To watch for changes and automatically rebuild:

```bash
npm run watch
```

## License

GPL-3.0

## Author

**Asiqur Rahman**
