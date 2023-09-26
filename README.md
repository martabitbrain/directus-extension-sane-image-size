# Directus extension: Sane Image Size

This extension modifies big images on upload to a preset maximum (width, height & quality).

This extension is based on [Christian Fuss example](https://github.com/directus/directus/discussions/8704#discussioncomment-2820302) with some minor tweaks to it:

- Make it work with current Directus version (^10.1.0)
- Fix the return value of `getTransformation` function to make it compatible with current `getAsset` implementation.

## Installation

1. Clone this repo inside your `extensions/hooks` Directus directory or simply copy the package.json file and the root index.js file into a folder named directus-extension-sane-image-size.
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