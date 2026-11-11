# Gemini Canvas Image Studio V2

## Role

Act as a senior frontend engineer, product designer, and Gemini Canvas application builder.

Build **Image Studio**, an interactive image-to-image creation application that runs directly inside Gemini Canvas.

## 1. Core Product Requirement

Users must be able to:
1. Upload an image from their device.
2. Describe the desired edit or transformation.
3. Choose an optional visual style and output aspect ratio.
4. Generate an edited image using image-generation capability natively available in the Gemini Canvas environment.
5. Preview, compare, reuse, and download the result.

Primary workflow:

**Upload Image → Write Prompt → Configure → Generate with Canvas-native Gemini capability → Preview → Compare → Download**

This is an image-to-image application, not a marketing landing page or static mockup.

## 2. Critical Runtime and Cost Constraints

These requirements are mandatory:

- The application is intended to run inside Gemini Canvas.
- Use only image-generation or image-editing capabilities that Gemini Canvas itself explicitly makes available to the application at runtime.
- Prefer the built-in Gemini capability available through Canvas features such as **Add Gemini features**, when supported for this application.
- Do not use the Gemini Developer API, Google AI Studio API, Vertex AI API, or any third-party image-generation API.
- Do not require an API key, paid API account, external backend, server, or user-managed credentials.
- Do not invent a Canvas SDK, JavaScript function, package, endpoint, or runtime integration. First inspect and use only capabilities and interfaces actually exposed by the Canvas environment.
- Do not assume that a feature available to Gemini during app authoring is automatically callable by the generated app at runtime.
- Do not claim unlimited or guaranteed free generation. Respect the account's actual access, availability, and usage limits.

**Capability fallback:** If Gemini Canvas does not expose a callable native image-generation capability to the application runtime, explain this limitation clearly in the UI or implementation notes. Do not silently substitute a paid API, ask for an API key, generate a fake result, or present a placeholder as AI output. Complete the usable upload, prompt, settings, and preview interface, and clearly mark generation as unavailable until a supported native capability exists.

## 3. Technology and Implementation

Use the application framework and runtime supported by Gemini Canvas. If a React application is supported, use:
- React
- TypeScript
- Tailwind CSS
- Lucide React

Keep the implementation modular, responsive, and easy to maintain. Avoid unnecessary dependencies and external services.

## 4. Main Interface

### Header
- Product name: **Image Studio**.
- Simple navigation.
- New Creation action.

### Image Input
- Drag-and-drop upload.
- File picker.
- Display uploaded image preview.
- Replace and remove actions.
- Validate supported image formats and reasonable file size.
- Show clear validation messages.

### Prompt and Settings
- Prompt textarea with an example editing instruction.
- Optional style presets:
  - Realistic
  - Anime
  - 3D Render
  - Digital Art
  - Cinematic
  - Minimalist
  - Watercolor
  - Custom
- Aspect ratio:
  - Original
  - 1:1
  - 3:4
  - 4:3
  - 9:16
  - 16:9
- Make it clear that unsupported options must not be sent to the generation capability.

### Result
- Display the actual generated image returned by the native capability.
- Original/result comparison.
- Download result.
- Generate again.
- Use result as the next reference image.

### History
- Keep generated results in the active session where the runtime allows it.
- Show thumbnail, prompt, and available timestamp.
- Allow users to reopen and download a result.
- Show a useful empty state.

## 5. Image-to-Image Generation Behavior

Implement a dedicated generation adapter/service so the UI is not coupled to a specific runtime integration.

The generation flow must:
1. Confirm that a source image and non-empty prompt are present.
2. Check whether a supported native Canvas image-generation capability is actually available.
3. Pass the source image and editing prompt to that capability using its documented input format.
4. Apply optional settings only when the capability supports them.
5. Display the returned image only after a successful response.
6. Handle unavailable capability, quota/limit errors, rejected input, and generation failures with clear messages.
7. Preserve the source image if generation fails.

Do not fabricate progress percentages or pretend that a generation request succeeded. Use an indeterminate loading state unless the runtime provides real progress information.

## 6. Visual Design

Create a polished, modern creative workspace:
- Neutral background with restrained accent colors.
- Strong visual hierarchy and readable typography.
- Spacious, uncluttered layout.
- Subtle borders and consistent corner radii.
- Responsive desktop, tablet, and mobile layouts.
- Accessible labels, keyboard navigation, and visible focus states.

Prioritize the image creation workflow over decorative elements.

## 7. Suggested Architecture

Use a structure appropriate to the Canvas runtime. For React, a suggested organization is:

```text
src/
  components/
    layout/
    upload/
    prompt/
    result/
    history/
    ui/
  services/
    canvas-image-generation/
  hooks/
  types/
  utils/
  App.tsx
  main.tsx
```

The generation service must expose a clear capability check and a typed generation contract. Keep all Canvas-specific integration in that service. Do not add a mock implementation that can be mistaken for real generation.

## 8. Application States

Provide clear UI states for:
- Empty workspace.
- Image selected.
- Invalid upload.
- Ready to generate.
- Generating.
- Generation successful.
- Generation unavailable in this Canvas runtime.
- Usage limit reached.
- Generation failed.

When generation is unavailable, keep upload and prompt editing usable and explain why the Generate action cannot proceed.

## 9. Acceptance Criteria

The application is accepted when:
1. It runs interactively in Gemini Canvas.
2. Users can upload, preview, replace, and remove an image.
3. Users can enter an image-editing prompt.
4. Users can select optional style and aspect ratio settings.
5. It checks for a real, supported Canvas-native image-generation capability.
6. It uses no Developer API, third-party API, API key, or external backend.
7. It never presents demo or placeholder content as a generated image.
8. It shows a real result only after successful native generation.
9. Users can compare, download, and reuse a real generated result.
10. Errors and unavailable/limited access are communicated honestly.
11. All visible controls work and the layout is responsive.

## 10. Final Instructions for Gemini Canvas

Build the interactive **Image Studio** application directly in Gemini Canvas.

Before implementing image generation, inspect the capabilities actually available in the Canvas environment. Use the native Gemini image-generation integration only if it is genuinely exposed to this application.

Do not merely describe a possible integration or invent code for a nonexistent runtime API. If native image generation cannot be called from the application, implement the rest of the working interface and clearly report that runtime limitation. Do not switch to a paid API or ask the user for credentials.

The priority is a genuinely usable Canvas application with no API-key setup and no external backend—not a visual mockup that falsely claims to generate images.
