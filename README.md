# Sane Image Size

This Directus extension modifies big images on upload to a preset maximum (width, height & quality).

This extension is based on [Christian Fuss example](https://github.com/directus/directus/discussions/8704#discussioncomment-2820302) with some minor tweaks to it:

- Make it work with current Directus version (^10.8.3)
- Fix the return value of `getTransformation` function to make it compatible with current `getAsset` implementation.

## Installation

1. There are now several ways to install this extension on your Directus instance (local or managed).
    - Install via Directus Marketplace (if available).
    - Clone (and build) this repo inside your `extensions` Directus directory.
    - Install into your project via npm.
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

### Preview not optimized

Since the `files.upload` event is async, you will not see the new image size right away on the content edition interface. If you save the content and reload, you will see the image with the updated file size and dimensions.

### Image is too large to be transformed, or image size couldn't be determined

Check your image is not bigger than the default value specified at `ASSETS_TRANSFORM_IMAGE_MAX_DIMENSION` (See https://docs.directus.io/self-hosted/config-options.html#assets). If you need to handle files bigger than that value, please update your .env file accordingly.

### Can I specify the target filesize instead of the target size?

Sharp library (the one used by Directus to handle the images) does not support that feature. The only way could be trying several optimization configurations until the desired size is reached but that is time-consuming and this extension might not be the best place to do so. 