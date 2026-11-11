# Gemini Canvas Image Studio V4
## Text-to-Image

## Role

Act as a senior frontend engineer, product designer, and Gemini Canvas application builder.

Build **Gemini Canvas Image Studio**, an interactive text-to-image creation application that runs directly inside Gemini Canvas.

Users describe an image in a text prompt, optionally configure supported style and aspect-ratio settings, and generate an image using only a genuinely available native Gemini Canvas capability.

## 1. Core Product Requirements

The application must allow users to:

1. Enter and edit a text prompt describing the image they want to create.
2. Optionally choose a visual style preset.
3. Optionally choose an output aspect ratio when supported.
4. Generate an image using a native image-generation capability genuinely exposed by Gemini Canvas at runtime.
5. Preview the actual generated result.
6. Download a successful result when supported by the runtime.
7. Review prior successful generations in the active session when session storage permits.

Primary workflow:

**Write Prompt → Configure Optional Settings → Generate with Canvas-native Gemini Capability → Preview Result → Download / Review History**

This is a **Text-to-Image** application. It must not request, upload, fetch, select, or use a source/reference image.

## 2. Explicitly Removed Features and Integrations

The following are out of scope and must not be implemented:

- Supabase, including Supabase Edge Functions.
- The endpoint `https://zyiavfljweavoxyyplxj.supabase.co/functions/v1/get-trx-products`.
- Product catalog, product type, product group, product selector, and product metadata.
- Color variants, size variants, and price information.
- Reference image, source image, image-to-image, and image-editing workflows.
- Manual image upload, file picker, drag-and-drop image input, and image URL input.
- Supabase Storage or any other external image storage.
- Any external backend or server added for image generation.

Do not retain hidden or unused UI, services, state, types, dependencies, or instructions for these removed features.

## 3. Critical Runtime, API, and Cost Constraints

These requirements are mandatory:

- The application is intended to run directly inside Gemini Canvas.
- Use only image-generation capabilities that Gemini Canvas explicitly exposes to the application at runtime.
- Do not use the Gemini Developer API, Google AI Studio API, Vertex AI API, or any third-party image-generation API.
- Do not require an API key, paid API account, external backend, server, or user-managed credentials.
- Do not invent a Canvas SDK, JavaScript function, package, endpoint, or runtime integration.
- Do not assume that a capability available to Gemini during app authoring is automatically callable by the generated app at runtime.
- Do not claim unlimited or guaranteed free generation. Respect the account's actual access, availability, and usage limits.
- Do not use a hidden or indirect image-generation service as a substitute for the native Canvas capability.

**Capability fallback:** If Gemini Canvas does not expose a callable native image-generation capability to the application runtime, clearly mark generation as unavailable. Keep the prompt editor and supported settings usable. Do not fabricate an image, show a placeholder as generated output, substitute an external API, or ask the user for an API key.

## 4. Prompt Editor

The prompt editor is the primary input and focus of the application.

Requirements:

- Provide a prominent multiline prompt field.
- Use a helpful example prompt as placeholder text, not as a submitted default generation.
- Allow users to write, edit, and clear their prompt.
- Validate that the prompt is not empty before generation.
- Preserve the prompt if generation fails.
- Do not silently rewrite or replace the user's prompt.
- If prompt enhancement is offered, make it an explicit optional user action and do not imply it is part of image generation unless genuinely supported.

Example placeholder:

```text
A cinematic editorial photograph of a quiet coastal town at golden hour, warm natural light, detailed architecture, refined composition.
```

## 5. Optional Generation Settings

Provide optional settings only when they are useful and supported by the actual native generation capability.

### Style presets

Possible UI presets:

- Realistic
- Photorealistic
- Anime
- 3D Render
- Digital Art
- Cinematic
- Minimalist
- Watercolor
- Illustration
- Custom

Rules:

- Presets must be implemented as prompt guidance or native options only where appropriate.
- Do not claim that a preset is a model capability unless verified.
- A selected preset may contribute descriptive guidance to the final prompt, but must not overwrite the user's prompt.
- Provide a clear way to return to Custom or no preset.

### Aspect ratio

Possible choices, only if supported:

- 1:1
- 3:4
- 4:3
- 9:16
- 16:9

Rules:

- Do not claim or simulate unsupported dimensions.
- Do not send unsupported settings to the native generation capability.
- If aspect ratio cannot be controlled, explain that the output format is determined by the available runtime.

## 6. Image Generation Behavior

Implement a dedicated generation adapter/service so the UI is not coupled to an assumed runtime integration.

The generation flow must:

1. Validate that the prompt is non-empty.
2. Collect only the user prompt and optional settings that are actually supported.
3. Check whether a supported native Gemini Canvas image-generation capability is genuinely available to the application at runtime.
4. Pass the prompt and supported settings using the actual documented runtime input format.
5. Display the returned image only after a real successful generation response.
6. Handle unavailable capability, usage limits, rejected input, and generation failures with clear messages.
7. Preserve the user's prompt and settings if generation fails.

Do not fabricate progress percentages or pretend that a request succeeded. Use an indeterminate loading state unless the runtime provides real progress information.

### Internal generation contract

An internal application-level contract may be used to keep the UI organized, for example:

```ts
type ImageGenerationInput = {
  prompt: string;
  style?: string;
  aspectRatio?: string;
};
```

This is only an internal application data shape. It is **not** a claim that Gemini Canvas accepts this exact payload. Map it to the actual supported runtime interface only after verifying that interface.

Do not include a source image, reference image, product, color, or variant in the generation contract.

## 7. Main Interface

Create a polished, focused creative workspace.

### Header

- Product name: **Gemini Canvas Image Studio**.
- Clear application identity.
- New Creation or Reset action.

### Prompt workspace

- Prominent prompt textarea.
- Character count only if useful.
- Clear prompt action.
- Example prompt guidance.
- Validation message for an empty prompt.

### Settings panel

- Optional style preset selector.
- Optional aspect ratio selector, only if supported.
- Clear indication of selected settings.
- Reset settings action.

### Generate action

- Clear Generate action.
- Disabled state when the prompt is empty or generation is unavailable.
- Loading state during an actual generation request.
- Prevent accidental duplicate submissions while a request is in progress.

### Result panel

- Display only an actual image returned by a successful native generation operation.
- Provide a useful empty state before the first generation.
- Provide download only when a real result and supported download behavior are available.
- Allow the user to start a new creation.
- Never display a sample, stock image, mock image, or placeholder as generated output.

### History

- Keep successful generated results in the active session only where the runtime allows it.
- Show the prompt and available metadata for each result.
- Allow reopening or downloading a result only when supported.
- Do not create history entries for failed or unavailable generation attempts.
- Provide a useful empty state.

## 8. Application States and Error Handling

Handle at least these states:

- Empty workspace.
- Prompt entered.
- Prompt validation error.
- Ready to generate.
- Native generation capability unavailable.
- Generating.
- Generation successful.
- Usage limit reached, if reported by runtime.
- Generation failed.
- Result unavailable after session reset, if applicable.

Use clear, actionable error messages. Preserve the user's prompt and settings after failure. Do not fabricate progress information or successful results.

## 9. Visual Design and Accessibility

Create a polished, modern creative workspace:

- Premium, modern, minimalist visual language.
- Neutral background with restrained accent colors.
- Clear visual hierarchy and readable typography.
- Responsive desktop, tablet, and mobile layouts.
- Prompt editor and generated result should be the primary visual focus.
- Avoid clutter and unnecessary decorative elements.
- Accessible labels, keyboard navigation, and visible focus states.
- All visible controls must have functional behavior.

Prioritize a fast, understandable prompt-to-result workflow.

## 10. Suggested Architecture

Use the framework and runtime supported by Gemini Canvas. If React is supported, organize the application in a maintainable, modular way, for example:

```text
src/
  components/
    layout/
    prompt/
    settings/
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

Responsibilities:

- Prompt state: manage the user's prompt.
- Settings state: manage optional supported style and aspect ratio choices.
- Generation adapter: check runtime capability and map the internal input contract to the verified native interface.
- Result component: display only real successful generation results.
- History component: retain and display successful results only where the runtime permits.

Do not add catalog, product, variant, reference-image, upload, or external API services.

Keep Canvas-specific generation integration isolated in the generation adapter. Do not add a mock implementation that can be mistaken for real generation.

## 11. Acceptance Criteria

The application is accepted when:

1. It runs interactively inside Gemini Canvas.
2. The primary workflow is Text-to-Image.
3. Users can enter, edit, and clear a text prompt.
4. Empty prompts are rejected with a clear validation message.
5. Optional style presets work as prompt guidance or verified native options.
6. Aspect ratio choices are exposed only when supported.
7. The application checks for a real, supported Canvas-native image-generation capability.
8. It uses no Gemini Developer API, Google AI Studio API, Vertex AI API, third-party image-generation API, API key, paid API account, or external backend.
9. No Supabase or Edge Function integration remains.
10. No product catalog, product selector, color variant, size variant, or price UI remains.
11. No image upload, file picker, drag-and-drop image input, image URL input, or reference-image workflow remains.
12. No source or reference image is required or passed to generation.
13. No fake or placeholder generation result is presented as real output.
14. A result is displayed only after successful native generation.
15. Users can download real results when supported.
16. Errors and unavailable/limited access are communicated honestly.
17. Successful results can be kept in session history where supported.
18. All visible controls work and the layout is responsive.

## 12. Final Instructions for Gemini Canvas

Build the interactive **Gemini Canvas Image Studio V4 — Text-to-Image** application directly in Gemini Canvas according to this specification.

Implement a focused text-to-image workflow. The user provides a text prompt and may choose optional style or aspect-ratio settings only where the runtime supports them.

Do not add image upload, image URL input, reference images, image-to-image editing, product catalog, Supabase, Edge Functions, or external backends.

Before implementing image generation, inspect the capabilities actually available in the Canvas environment. Use native Gemini image generation only if it is genuinely exposed to this application at runtime.

If native text-to-image generation cannot be called from the application runtime, implement the working prompt and settings interface and clearly report that generation is unavailable. Do not switch to a paid API, ask for credentials, or display fake generated content.

The priority is a genuinely usable Gemini Canvas Text-to-Image application with no API-key setup and no external generation backend.
