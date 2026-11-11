# Gemini Canvas Prompt — Image-to-Image AI Generator

Act as a senior frontend engineer, UI/UX designer, and AI application architect.

Build a functional web application named **Image Studio**. The application allows users to upload an existing image, describe the desired transformation with a text prompt, configure output options, generate a new image based on the reference image, preview the result, compare it with the original, and download the generated image.

## 1. Product Goal

Create an image-to-image workspace, not a marketing landing page.

Primary workflow:

**Upload Image → Write Prompt → Configure Output → Generate → Preview → Compare → Download**

The application must clearly distinguish real AI generation from a simulated demo.

## 2. Technology

Use:
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

Use reusable components, typed props, clear separation of concerns, and responsive layouts.

## 3. Main Interface

### Header
- Image Studio logo and name.
- New Creation action.
- Simple, unobtrusive navigation.

### Input Workspace
- Drag-and-drop image upload.
- File picker fallback.
- Preview of the uploaded image.
- Replace and remove image actions.
- Prompt textarea with helpful placeholder text.
- Style presets:
  - Realistic
  - Anime
  - 3D Render
  - Digital Art
  - Cinematic
  - Minimalist
  - Watercolor
  - Custom
- Aspect ratio options:
  - Original
  - 1:1
  - 3:4
  - 4:3
  - 9:16
  - 16:9
- Generate Image action.

### Result Workspace
- Generated image preview.
- Original/generated comparison.
- Download action.
- Generate Again action.
- Use as Reference action.

### Generation History
- Thumbnail for each generated result.
- Prompt used.
- Generation date/time.
- Open and download actions.
- Empty state when no history exists.

## 4. Visual Design

Use a modern, premium AI SaaS aesthetic:
- Neutral background and restrained accent color.
- Clear typography and visual hierarchy.
- Generous whitespace.
- Subtle borders and shadows.
- Consistent rounded corners.
- Responsive desktop, tablet, and mobile layouts.

Prioritize the working creation workspace over decorative elements.

## 5. Functional Requirements

Implement:
- Drag-and-drop upload and file picker.
- Image type and file-size validation.
- Image preview before generation.
- Replace and remove uploaded image.
- Prompt input and style/aspect-ratio selection.
- Form validation before generation.
- Loading, progress/status, success, and error states.
- Result preview and original/result comparison.
- Download generated image.
- Generation history during the active application session.
- Use generated output as the next reference image.

Every visible control must have a meaningful action. Do not add decorative buttons that do nothing.

## 6. Image-to-Image AI Integration

Prepare a dedicated image-generation service that can connect to an image-to-image model/API.

Requirements:
- Keep API integration separate from UI components.
- Send the reference image and text prompt to the generation service.
- Support generation options where the selected provider allows them.
- Handle API errors and unavailable providers.
- Never expose secret API keys in browser code or client-side environment variables.
- Keep provider-specific request/response mapping inside the service layer.

If no real provider credentials or endpoint are configured, implement a clearly labeled **Demo Mode**. Do not fabricate AI output or present a placeholder as a real generated result. Show an explicit message explaining that real generation requires a configured image-to-image provider.

## 7. Suggested Project Organization

Organize the code by responsibility. A suggested structure:

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
    image-generation/
    image-upload/
  hooks/
  types/
  utils/
  App.tsx
  main.tsx
```

Adjust the structure only when there is a clear implementation benefit.

## 8. Quality Requirements

- The application must run successfully.
- Use TypeScript types for application data and service contracts.
- Keep components focused and reusable.
- Handle invalid files and failed requests gracefully.
- Avoid duplicated logic and unnecessary dependencies.
- Ensure keyboard accessibility and visible focus states.
- Ensure the interface works on narrow mobile screens.
- Do not claim that an API integration works unless it is actually configured and tested.

## 9. Acceptance Criteria

The result is acceptable when:
1. A user can upload an image and see its preview.
2. A user can enter a transformation prompt.
3. A user can select a style and aspect ratio.
4. The Generate action validates the input and reports the actual application mode.
5. The application handles loading and error states.
6. A real generated image is shown only when a real provider returns one.
7. A generated image can be compared with the source and downloaded.
8. A result can be reused as a reference image.
9. The layout is responsive and all visible controls work.
10. No API secret is exposed in frontend code.

## 10. Final Instruction

Build the application directly in Gemini Canvas as an interactive web application. Do not return only a design description, static mockup, or screenshot. Implement the complete frontend workflow and clearly identify any backend/API configuration still required for real image-to-image generation.
