# Gemini Calendar — Requirement Specification V1

**Status:** Draft for user approval  
**Repository:** `gantulu/gemini-calendar`  
**Document:** `prompt.md`  
**Product type:** Gemini Canvas native AI image creation application  
**Target use:** Instagram content for Apple Store Malaysia

---

## 1. Product Definition

Build **Gemini Calendar**, a focused AI image creation application for producing premium promotional visuals featuring Apple products for the Instagram presence of Apple Store Malaysia.

The application collects a small set of creative choices, constructs an image-generation instruction internally, and generates an image using an image-generation capability genuinely available through the native Gemini Canvas environment.

The primary user outcome is a finished vertical promotional image. The application is not a general-purpose prompt-writing tool.

### Core workflow

**Select Apple Product → Choose Campaign Concept → Configure Visual Direction → Generate Image → Preview → Download / Regenerate**

The generated image is the primary and only user-facing result. Do not show the assembled prompt as a result or require the user to copy it elsewhere.

---

## 2. Locked V1 Requirements

| Area | Requirement |
|---|---|
| Application name | Gemini Calendar |
| Target platform | Gemini Canvas |
| Target audience/use | Instagram content for Apple Store Malaysia |
| Main capability | Text-to-Image |
| Generation method | Native Gemini Canvas image-generation capability only |
| Main output | Generated image only |
| Default aspect ratio | 9:16 portrait |
| Target export size | 1080 × 1920 px, only when supported |
| Image upload | Not included |
| Image-to-Image | Not included |
| Reference image | Not included |
| External image API | Not allowed |
| Gemini API key | Not required or requested |
| Backend/server | None |
| Supabase/database | None |
| Edge Functions | None |
| User accounts | None |
| Persistent generation history | Not required |
| Session history | Optional, only if reliably supported by the runtime |

These are product requirements. They do not guarantee that the Canvas runtime supports every generation, resolution, download, or session feature. The implementation must verify runtime capabilities and describe limitations honestly.

---

## 3. Apple Product Selection

Provide a simple product-family selector with these options:

- iPhone
- iPad
- MacBook
- Apple Watch
- AirPods
- Apple Accessories

The user may optionally specify a product model or product details in a short text field. Do not invent a model, technical specification, feature, or product capability.

A product-family selection is creative context only. It is not a live product catalog and must not imply current stock, pricing, or availability.

### Product representation rules

- Keep the selected product as the visual subject.
- Preserve recognizable Apple product design language.
- Do not intentionally distort product proportions, materials, ports, camera layout, display, buttons, or other recognizable hardware details.
- Do not invent product generations, colors, accessories, or specifications.
- Do not add unsupported feature claims, prices, discounts, warranties, or availability statements.
- If exact product fidelity cannot be guaranteed by image generation, do not claim that the generated image is an official or exact product photograph.

---

## 4. Campaign Concept

Offer a concise set of campaign concepts:

- Premium Product Showcase
- Product Launch
- Lifestyle Photography
- Minimalist Studio
- Cinematic Product
- Seasonal Campaign
- Promotional Design

The concept guides composition and visual treatment. It must not introduce unsupported commercial claims.

The application may provide a custom concept text field for a user-supplied creative direction.

---

## 5. Visual Configuration

Provide practical controls for the following:

- Product color
- Background / environment
- Lighting
- Composition
- Camera angle
- Visual mood
- Photography / render style

Use curated presets with sensible defaults. Avoid forcing the user to configure every property.

Example style directions:

- Premium commercial photography
- Photorealistic studio
- Minimalist editorial
- Luxury cinematic
- Modern lifestyle
- Clean product advertising

A selected product color is a visual instruction, not a verified statement that Apple sells that model in that color.

Do not expose a setting as a guaranteed model capability unless the native runtime actually supports it. Unsupported controls must be omitted or clearly treated as prompt guidance.

---

## 6. Instagram Output Requirements

### Default format

- Aspect ratio: **9:16 portrait**
- Target dimensions: **1080 × 1920 px**
- Intended placement: Instagram Stories and Reels; also usable as vertical promotional creative where appropriate.

The 1080 × 1920 px dimensions are a target, not a guarantee. Do not upscale, crop, or distort an image and then claim it was natively generated at that resolution.

### Composition

- Place the Apple product as the primary focal point.
- Use a strong vertical composition suitable for mobile viewing.
- Maintain clear visual hierarchy and intentional negative space.
- Keep important visual content away from extreme edges.
- Use premium, modern, polished commercial art direction.
- Ensure the result remains legible and visually balanced on a phone screen.

### Text in generated images

- Prefer image-first creative with minimal or no embedded text.
- Do not invent prices, discounts, promotional dates, store addresses, URLs, or product claims.
- If the user supplies exact copy, preserve its wording as closely as the image model allows.
- Do not claim generated typography is guaranteed to be accurate.

---

## 7. Native Image Generation — Critical Constraint

Use only an image-generation capability that is genuinely available to the application through the native Gemini Canvas runtime.

Mandatory restrictions:

- Do not call Gemini Developer API, Google AI Studio API, Vertex AI API, or any third-party image-generation API.
- Do not request, store, or expose an API key.
- Do not add an external backend, server, proxy, database, Supabase service, or Edge Function.
- Do not invent a Canvas SDK, package, endpoint, JavaScript method, or runtime interface.
- Do not assume a feature available to Gemini during authoring is automatically callable from the generated application.
- Do not simulate image generation with a static image, stock image, placeholder, or fabricated result.
- Do not claim generation is unlimited or guaranteed free. Respect actual account access, quotas, and runtime restrictions.

### Runtime capability verification

Before implementing the generation action:

1. Inspect the actual Gemini Canvas runtime and its documented/available application capabilities.
2. Confirm whether the application can invoke native image generation directly.
3. Confirm the accepted input format and the returned image representation.
4. Confirm whether aspect ratio, image dimensions, download, and session retention are supported.
5. Implement only verified capabilities.

If the runtime does not expose a callable native image-generation capability:

- Do not implement a fake Generate action.
- Clearly show that native image generation is unavailable in the current runtime.
- Keep any independently functional product/concept/visual configuration usable if practical.
- Do not switch to an external API or ask the user for credentials.
- Report the exact capability limitation rather than implying the application is complete.

---

## 8. Prompt Construction

Build the image-generation instruction internally from the user's selections.

The internal instruction should combine:

1. Selected Apple product family.
2. Optional model/details supplied by the user.
3. Selected campaign concept.
4. Product color, if selected.
5. Background and environment.
6. Lighting and camera direction.
7. Composition and visual hierarchy.
8. Premium commercial art direction.
9. Vertical 9:16 composition requirement.
10. Product accuracy and no-fabrication constraints.

The application should produce concise, coherent image instructions. Avoid contradictory style directives and excessive prompt length.

Do not display the internal prompt as the primary output. Do not require the user to manually copy or paste it.

Do not silently invent product facts or marketing copy to fill missing information.

---

## 9. Main User Interface

Create a focused, premium, responsive creative workspace.

### Header

- Application name: **Gemini Calendar**
- Short descriptor: **Apple Campaign Image Studio**
- Reset / New Creation action.

### Product section

- Product-family selector.
- Optional model/details input.
- Optional product color selector.

### Campaign section

- Campaign concept selector.
- Optional custom concept input.

### Visual direction section

- Background / environment.
- Lighting.
- Composition.
- Camera angle.
- Visual mood / style.

### Output section

- Show the default 9:16 portrait ratio.
- Show the target dimensions as 1080 × 1920 px only as a target.
- Explain when a setting cannot be enforced by the runtime.

### Generate action

- Clear **Generate Image** action.
- Validate required selections before generation.
- Prevent duplicate submissions while a real generation request is running.
- Show an honest loading state.
- Disable generation and explain why when native capability is unavailable.

### Result section

- Display only the actual image returned by a successful native generation operation.
- Do not show a sample or placeholder as a generated result.
- Provide Download only when a real result and supported download behavior are available.
- Provide Regenerate / Create Variation only when the runtime supports another genuine generation request.
- Provide New Creation / Reset.

The generated image is the main output. Do not add a prompt-result panel, prompt-copy workflow, or prompt-only mode.

---

## 10. Application States and Error Handling

Handle at least these states:

- Initial / empty workspace.
- Product selected.
- Campaign concept selected.
- Ready to generate.
- Required selection missing.
- Native generation unavailable.
- Generating.
- Generation successful.
- Usage limit reached, if reported by runtime.
- Generation failed.
- Download unavailable.
- Session result unavailable after reset or runtime loss.

Error handling requirements:

- Use clear, actionable messages.
- Preserve user selections after generation failure.
- Do not fabricate progress percentages.
- Do not add failed requests to generation history.
- Do not display an image unless generation actually succeeded.
- Do not claim a download succeeded unless the browser/runtime confirms the action.

---

## 11. Visual Design and Accessibility

Design direction:

- Premium, modern, minimalist.
- Editorial product-advertising aesthetic.
- Neutral surfaces with restrained accent colors.
- Strong typography and clear hierarchy.
- Product selection and visual configuration should be easy to scan.
- Image preview should be the dominant visual area after generation.
- Responsive desktop and mobile layouts.
- Accessible labels, keyboard interaction, and visible focus states.
- Clear disabled, loading, success, and error states.
- Avoid clutter, excessive controls, and decorative elements that do not improve the workflow.

All visible controls must have real behavior. Do not ship inert buttons or decorative controls that appear functional.

---

## 12. Technical Architecture and Scope

Use only the framework and application structure supported by Gemini Canvas.

Keep responsibilities separated where the runtime permits:

- Product and campaign selection state.
- Visual configuration state.
- Internal prompt construction.
- Native image-generation adapter.
- Generated-image result display.
- Download behavior.
- Error and capability state.

Keep native Canvas integration isolated so that unverified APIs are not spread through the UI.

Do not add:

- External API clients or SDKs.
- API key or secret management.
- Backend or server routes.
- Supabase, database, or Edge Function integrations.
- Product catalog fetching.
- User authentication.
- Manual image upload or file picker.
- Image URL input.
- Image-to-Image or image-editing workflows.
- Fake generation adapters or mock results presented as real output.

---

## 13. Acceptance Criteria

The V1 application is accepted only when:

1. It runs interactively inside Gemini Canvas.
2. Its purpose is Apple promotional image creation for Instagram App Store Malaysia.
3. Users can select an Apple product family.
4. Users can select a campaign concept.
5. Users can configure supported visual directions.
6. The default intended composition is portrait 9:16.
7. 1080 × 1920 px is treated as a target and not falsely guaranteed.
8. The application constructs image instructions internally.
9. The application invokes only a verified native Gemini Canvas image-generation capability.
10. The application displays only a real successfully generated image.
11. The main result is an image, not a prompt.
12. Download and regenerate actions work only when genuinely supported.
13. No manual image upload, reference image, or Image-to-Image feature exists.
14. No API key, external image API, backend, database, or Edge Function is required.
15. Product specifications and marketing claims are not fabricated.
16. Errors and runtime limitations are communicated honestly.
17. The interface is responsive and accessible.
18. All visible controls have functional behavior.

If native image generation is not callable from the Canvas application runtime, acceptance criterion 9 is not met. Report the blocker; do not substitute another generation method.

---

## 14. Implementation and Change-Control Instructions

This document is the **Gemini Calendar Requirement Specification V1**.

Before implementation:

1. Audit the current repository and existing application files.
2. Compare the repository state against this specification.
3. Verify the native Gemini Canvas image-generation capability before coding the generation integration.
4. Report conflicts, unsupported capabilities, and implementation risks.
5. Present the implementation plan and wait for explicit user approval.

After approval:

1. Implement only the approved V1 scope.
2. Do not expand scope or add external services.
3. Verify the application in the actual Gemini Canvas runtime where possible.
4. Test product selection, visual configuration, generation, result display, download, errors, and responsive behavior.
5. Report verified results separately from unverified runtime assumptions.

Do not implement application code, modify other repository files, add dependencies, or change external services before the user explicitly approves implementation.

---

## 15. Final Instruction

Build **Gemini Calendar — Apple Campaign Image Studio V1** directly for Gemini Canvas, following this specification.

The user selects an Apple product and campaign direction, configures the visual treatment, and generates a vertical promotional image through a genuinely available native Gemini Canvas image-generation capability.

The generated image is the primary and only result. The internal prompt is not presented as the deliverable.

No uploads, Image-to-Image, API keys, external image APIs, backend, database, or Edge Functions.

If native image generation is unavailable to the application runtime, stop the generation integration and report the limitation. Never fake a generated image or silently substitute an external service.
