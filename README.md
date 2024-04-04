# Sane Image Size

This Directus extension modifies big images on upload to a preset maximum (width, height & quality).

This extension is based on [Christian Fuss example](https://github.com/directus/directus/discussions/8704#discussioncomment-2820302) with some minor tweaks to it:

- Make it work with current Directus version (^10.8.3)
- Fix the return value of `getTransformation` function to make it compatible with current `getAsset` implementation.

## Installation

1. There are now several ways to install this extension on your Directus instance (local or managed).
    - Clone (and build) this repo inside your `extensions` Directus directory.
    - Install into your project via npm.
    - Install via Directus Marketplace.
2. If desired, edit the .env file of your Directus installation to set the environment variables:
    ```bash
    # These are the default values if the env variables are not specified
    EXTENSIONS_SANE_IMAGE_SIZE_UPLOAD_QUALITY=90
    EXTENSIONS_SANE_IMAGE_SIZE_MAXSIZE=1920
    ``` 
3. Reload your directus process. The Following message should appear:
    ```log
    [12:39:24.309] INFO: Loaded extensions: directus-extension-sane-image-size
    ```

## Known issues
Since the `files.upload` event is async, you will not see the new image size right away on the content edition interface. If you save the content and reload, you will see the image with the updated file size and dimensions.
