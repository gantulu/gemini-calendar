# Gemini Calendar — Native Canvas Integration

## Current implementation status

The repository contains the Gemini Calendar V1 user interface and its creative configuration flow. Native image generation is intentionally not simulated or connected through an invented JavaScript API.

Google's Gemini Apps Help documents an official **Add Gemini features** workflow for Canvas apps, including text and image generation. This workflow is performed from the Gemini Canvas interface by a signed-in user aged 18 or over.

Official guide: https://support.google.com/gemini/answer/16047321

## Required Canvas steps

1. Open Gemini Apps on the web and open the Gemini Calendar application in Canvas.
2. Open the app in Canvas and select **Add Gemini features**.
3. Request native image generation for the existing Generate Image action.
4. Ask Gemini Canvas to connect the feature to the existing product and visual configuration state.
5. Require the generated image as the only primary result.
6. Require a portrait 9:16 image; treat 1080 × 1920 px as a target only when supported.
7. Do not add a Gemini API key, external API, backend, database, or Edge Function.
8. Test successful generation, unavailable capability, quota errors, result display, regeneration, and download in the actual Canvas runtime.

## Integration acceptance gate

Do not enable the Generate Image action until Canvas has added a real native image-generation capability and the generated application code has been inspected and tested.

Do not invent a JavaScript global, SDK, package, endpoint, or payload. Do not show sample or placeholder art as a generated result.

The current UI deliberately reports that native image generation still needs to be connected in Canvas.
