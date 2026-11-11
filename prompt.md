# Gemini Calendar — Master Prompt V2
## Single-File React Application for Gemini Canvas

**Document:** `prompt.md`  
**Repository:** `gantulu/gemini-calendar`  
**Baseline:** Gemini Calendar Master Prompt V2  
**Target runtime:** Gemini Canvas  
**Application:** Gemini Calendar — Apple Campaign Image Studio

---

# ROLE

Act as a senior React engineer, product designer, and AI image-generation workflow engineer.

Create a complete, polished, interactive application named **Gemini Calendar** that runs directly inside **Gemini Canvas**.

This file is the master instruction for generating the application. Follow it as an implementation prompt, not as a request to create a conventional repository project or another requirements document.

# 1. NON-NEGOTIABLE OUTPUT CONTRACT

Generate the application as **one self-contained React application in a single code artifact/file**, suitable for Gemini Canvas preview and execution.

Requirements:

- Use React and the syntax/runtime supported by Gemini Canvas.
- Keep the complete application implementation together in one file/artifact.
- Include all application components, state, event handlers, styles, and utility functions in that same artifact.
- Use inline styles or a style element in the same artifact; do not require a separate CSS file.
- Do not split the implementation into multiple files.
- Do not create a Vite, Next.js, CRA, or other conventional project scaffold.
- Do not require a terminal, Node.js, npm, pnpm, build step, package installation, or local development server.
- Do not create package.json, index.html, src folders, configuration files, or separate assets.
- Do not output only a wireframe, mockup, static screenshot, or product specification. Build the working React interface.
- Do not stop after describing the implementation. Produce the actual application in Canvas.
- Use only dependencies and browser/runtime features already supported by Canvas. Prefer React and native browser capabilities; avoid unnecessary dependencies.

The deliverable is the running single-file React application in Gemini Canvas. This GitHub prompt file is an instruction source; it is not the application runtime.

# 2. PRODUCT PURPOSE

Build **Gemini Calendar**, a focused AI image-creation studio for producing premium promotional visuals featuring Apple products for Instagram content intended for **Apple Store Malaysia**.

The user configures a product and creative direction, then generates a finished promotional image.

The primary user outcome is a generated image—not a written prompt.

Core workflow:

**Select Apple Product → Choose Campaign Concept → Configure Visual Direction → Generate Image → Preview → Download / Regenerate**

Do not turn the product into a general-purpose prompt-writing tool. Construct image instructions internally and do not expose a prompt editor, prompt-copy panel, or prompt as the primary result.

# 3. LOCKED PRODUCT REQUIREMENTS

| Area | Requirement |
|---|---|
| App name | Gemini Calendar |
| Descriptor | Apple Campaign Image Studio |
| Platform | Gemini Canvas |
| Use case | Instagram promotional images for Apple Store Malaysia |
| Generation mode | Text-to-Image |
| Primary output | Actual generated image |
| Default aspect ratio | 9:16 portrait |
| Target dimensions | 1080 × 1920 px, only if supported |
| Image upload | Not allowed |
| Reference image | Not allowed |
| Image-to-Image | Not allowed |
| External image API | Not allowed |
| API key | Not required; never request one |
| Backend/server | None |
| Database/Supabase | None |
| Edge Functions | None |
| Authentication | None |
| Persistent history | Not required |

Do not add features that contradict these requirements.

# 4. APPLE PRODUCT SELECTOR

Provide a clear product-family selector:

- iPhone
- iPad
- MacBook
- Apple Watch
- AirPods
- Apple Accessories

Allow an optional short text input for the exact product model or additional product context supplied by the user.

Optionally provide a product-color choice. Treat the selected color as creative guidance, not as confirmation that Apple sells that model in that color.

Product accuracy rules:

- Keep the selected Apple product as the main visual subject.
- Preserve recognizable product proportions and hardware design.
- Do not invent model names, generations, specifications, colors, features, or accessories.
- Do not invent prices, discounts, warranty terms, stock, availability, or promotional claims.
- Never imply that an AI-generated image is an official Apple product photograph.
- If exact product fidelity cannot be guaranteed, do not claim otherwise.

# 5. CAMPAIGN CONCEPT SELECTOR

Offer these campaign concepts as selectable cards or similarly clear controls:

1. Premium Product Showcase
2. Product Launch
3. Lifestyle Photography
4. Minimalist Studio
5. Cinematic Product
6. Seasonal Campaign
7. Promotional Design

Each concept should have a concise visual description and a sensible default direction.

Allow optional custom creative direction. Do not let custom text override product-accuracy and no-fabrication rules.

# 6. VISUAL DIRECTION CONTROLS

Provide practical, easy-to-use controls for:

- Product color
- Background / environment
- Lighting
- Composition
- Camera angle
- Visual mood
- Photography / render style

Use curated presets and sensible defaults. Avoid overwhelming the user with too many controls.

Suggested visual styles:

- Premium commercial photography
- Photorealistic studio
- Minimalist editorial
- Luxury cinematic
- Modern lifestyle
- Clean product advertising

Controls represent creative instructions. Do not present them as guaranteed generation parameters unless the native generation capability actually supports them.

# 7. INSTAGRAM IMAGE FORMAT

Default composition:

- Portrait 9:16.
- Target export: 1080 × 1920 px, only when supported by the generation capability.
- Designed primarily for Instagram Stories and Reels.
- Strong vertical composition and mobile-first visual hierarchy.
- Product is the primary focal point.
- Clean negative space and intentional placement.
- Keep important visual content away from extreme edges.
- Premium, modern, polished commercial art direction.

Do not falsely claim an image was generated at 1080 × 1920 px if the runtime returns another size. Do not silently upscale, crop, or distort and describe it as native output.

Text in images:

- Prefer image-first visuals with minimal or no embedded text.
- Never invent marketing copy, price, discount, dates, URL, store address, or product claims.
- If the user supplies exact copy, use it as faithfully as the generation capability allows.
- Do not promise perfect typography or spelling in generated images.

# 8. GEMINI CANVAS NATIVE IMAGE GENERATION — CRITICAL

Use only image-generation functionality genuinely available through the current Gemini Canvas environment.

Before implementing the Generate action:

1. Inspect the actual Canvas-provided capabilities and available Gemini features.
2. Determine whether native image generation can be invoked by the React application itself, or whether it is available only through a Canvas authoring/assistant workflow.
3. Identify the real supported invocation mechanism and input/output contract, if one exists.
4. Verify whether portrait ratio, output dimensions, image result access, download, and regeneration are supported.
5. Implement only what is verifiably supported.

Strict prohibitions:

- Do not invent a Gemini Canvas SDK, JavaScript global, function, method, package, endpoint, or API contract.
- Do not assume that a capability available to the Canvas authoring assistant is automatically callable from application JavaScript.
- Do not call Gemini Developer API, Google AI Studio API, Vertex AI API, or third-party image-generation APIs.
- Do not request or store API keys, tokens, or credentials.
- Do not add a backend, server, proxy, database, Supabase integration, or Edge Function.
- Do not simulate generation with a placeholder, stock image, hardcoded image, or fabricated success state.
- Do not claim unlimited or guaranteed-free generation. Respect actual account access, quotas, and runtime limitations.

**If no verified native image-generation interface is callable from the React application:**

- Do not create a fake Generate Image button.
- Do not pretend that a prompt submission is equivalent to image generation.
- Do not display a placeholder as a generated image.
- Explain clearly in the UI or implementation response that the current Canvas runtime does not expose a callable native image-generation interface to the app.
- Keep the rest of the configuration UI functional where practical.
- Do not switch to an external API or ask for credentials.
- State what capability is missing and what remains unimplemented.

The application must be honest about this boundary. A polished UI does not count as successful image generation.

# 9. USER EXPERIENCE AND APPLICATION FLOW

Build a focused creative workspace with this flow:

## Step A — Select Product

- Choose one Apple product family.
- Optionally enter model/details.
- Optionally select a visual color.

## Step B — Choose Campaign

- Select one campaign concept.
- Optionally enter a custom creative direction.

## Step C — Configure Visual Direction

- Choose background/environment.
- Choose lighting.
- Choose composition.
- Choose camera angle.
- Choose mood/style.

## Step D — Generate

- Validate required selections.
- Trigger only a verified native generation capability.
- Prevent duplicate requests while generation is actually in progress.
- Show an honest loading state.
- Preserve all selections if generation fails.

## Step E — Preview and Actions

After a real successful generation:

- Display the returned image prominently.
- Provide Download only if the returned image and runtime support it.
- Provide Regenerate / Create Variation only if another genuine generation request is supported.
- Provide New Creation / Reset.

Do not show a generated-image preview until a real image result is returned.

# 10. UI DESIGN DIRECTION

Create a premium, modern, minimalist, responsive interface.

Visual direction:

- Editorial product-advertising aesthetic.
- Neutral backgrounds and restrained accent colors.
- Strong typography and clear hierarchy.
- Carefully spaced controls and clear section grouping.
- Product and campaign choices should be easy to scan.
- The generated image should become the dominant element in the result state.
- Responsive desktop and mobile layouts.
- Avoid visual clutter, excessive decoration, and unnecessary configuration.

Suggested interface structure:

1. Header: Gemini Calendar + Apple Campaign Image Studio.
2. Product selection.
3. Campaign concept selection.
4. Visual direction controls.
5. Output format information (9:16; target dimensions clearly qualified).
6. Generate action or honest capability-unavailable state.
7. Result preview and supported actions.

Use a cohesive design system for spacing, typography, surfaces, borders, and controls. Ensure all visible controls have real behavior.

# 11. STATE, VALIDATION, AND ERROR HANDLING

Handle the relevant states:

- Initial workspace.
- Product selected.
- Campaign selected.
- Ready to generate.
- Required selection missing.
- Native image generation unavailable.
- Generating.
- Generation succeeded.
- Generation failed.
- Usage limit reached, if reported by runtime.
- Download unavailable.
- Result lost after reset or runtime session loss.

Requirements:

- Use clear and actionable messages.
- Preserve configuration after failure.
- Do not fabricate progress percentages.
- Do not mark a request successful until a real image result is received.
- Do not create fake generation history.
- Do not show a fake preview.
- Disable actions that cannot actually work and explain why.
- Do not claim a download succeeded unless the browser/runtime confirms it.

# 12. ACCESSIBILITY AND RESPONSIVENESS

- Use semantic controls and accessible labels.
- Support keyboard interaction.
- Provide visible focus states.
- Maintain sufficient contrast.
- Use appropriate button states: enabled, disabled, loading.
- Ensure the layout works on narrow mobile screens and desktop.
- Avoid controls that depend only on color to communicate state.

# 13. IMPLEMENTATION QUALITY

Within the single React artifact:

- Keep components and helper functions logically organized.
- Use React state for interactive selections and application state.
- Keep prompt construction internal and deterministic from user selections.
- Keep native generation integration isolated behind a small adapter/function, but implement it only if the real interface is verified.
- Handle asynchronous failures safely if the verified interface is asynchronous.
- Avoid unnecessary dependencies and complexity.
- Do not introduce mock generation in production UI.
- Do not leave decorative or inert controls that appear functional.
- Do not split code, styles, or assets into separate files.

# 14. ACCEPTANCE CHECKLIST

The application is complete only when all applicable items are verified in Gemini Canvas:

- [ ] The output is one self-contained React application in one code artifact/file.
- [ ] The app runs directly in Gemini Canvas preview.
- [ ] No Vite/Next/CRA scaffold, package installation, build step, or separate source files are required.
- [ ] App identity is Gemini Calendar — Apple Campaign Image Studio.
- [ ] Product-family selection works.
- [ ] Optional model/details input works.
- [ ] Campaign concept selection works.
- [ ] Visual direction controls work.
- [ ] Default composition is portrait 9:16.
- [ ] 1080 × 1920 px is described as a target only when supported.
- [ ] Internal image instructions are built from the selections.
- [ ] No prompt-copy or prompt-only result workflow is exposed.
- [ ] Native image generation is invoked only through a verified Canvas-supported mechanism.
- [ ] A preview appears only after a real successful image generation.
- [ ] Download and regenerate work only when genuinely supported.
- [ ] No image upload, reference image, or Image-to-Image exists.
- [ ] No external image API, API key, backend, database, or Edge Function exists.
- [ ] No unsupported product specifications or marketing claims are fabricated.
- [ ] Errors and unsupported capabilities are communicated honestly.
- [ ] The interface is responsive and accessible.
- [ ] All visible controls have functional behavior.

If native generation cannot be invoked from the app, mark that acceptance item as **blocked by runtime capability**, explain the evidence, and do not claim the application is fully complete.

# 15. EXECUTION INSTRUCTIONS

Now create the application directly in Gemini Canvas.

Follow this order:

1. Inspect the Canvas environment and identify the supported React/runtime constraints.
2. Verify whether native image generation is callable from the application.
3. Build the complete single-file React application.
4. Implement only verified native generation and output capabilities.
5. Run the app in Canvas preview.
6. Test every visible control and each applicable application state.
7. Verify mobile and desktop layouts.
8. Report what works, what was tested, and any runtime-blocked feature.

Do not respond with another requirement document or a multi-file repository project. Generate the actual single-file React application in Canvas.

If a native image-generation call is not available to the app, finish the functional configuration UI and explicitly report the generation blocker. Never fake the image-generation workflow.

---

**END OF GEMINI CALENDAR MASTER PROMPT V2**
