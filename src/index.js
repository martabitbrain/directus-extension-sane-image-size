import { defineHook } from "@directus/extensions-sdk";

export default defineHook(({ action }, { services, logger, env }) => {
  const { AssetsService, FilesService } = services;
  const quality = env.EXTENSIONS_SANE_IMAGE_SIZE_UPLOAD_QUALITY ?? 90;
  const maxSize = env.EXTENSIONS_SANE_IMAGE_SIZE_MAXSIZE ?? 1920;

  action("files.upload", async ({ payload, key }, context) => {
    if (payload.optimized !== true) {
      const transformation = getTransformation(payload.type, quality, maxSize);
      if (transformation !== undefined) {
        const serviceOptions = { ...context, knex: context.database };
        const assets = new AssetsService(serviceOptions);
        const files = new FilesService(serviceOptions);

        const { stream, stat } = await assets.getAsset(key, transformation);
        if (stat.size < payload.filesize) {
          await sleep(4000);
          delete payload.width;
          delete payload.height;
          delete payload.size;

          await files.uploadOne(
            stream,
            {
              ...payload,
              optimized: true,
            },
            key
          );
        }
      }
    }
  });
});

function getTransformation(type, quality, maxSize) {
  const format = type.split("/")[1] ?? "";
  if (["jpg", "jpeg", "png", "webp"].includes(format)) {
    const transforms = [["withMetadata"]];
    if (format === "jpeg" || format === 'jpg') {
      transforms.push([format, { progressive: true }]);
    }
    return {
      transformationParams: {
        format,
        quality,
        width: maxSize,
        height: maxSize,
        fit: "inside",
        withoutEnlargement: true,
        transforms,
      },
    };
  }
  return undefined;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
