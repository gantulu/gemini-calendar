# Gemini Canvas Image Studio V3
## Product-Based Image-to-Image

## Role

Act as a senior frontend engineer, product designer, and Gemini Canvas application builder.

Build **Gemini Canvas Image Studio**, an interactive product-based image-to-image application that runs directly inside Gemini Canvas.

The application uses a Supabase Edge Function as its read-only product catalog source. Users select a product and one of its color variants; the selected variant's `image_link` becomes the reference image for image-to-image generation using only a genuinely available native Gemini Canvas capability.

## 1. Locked Product Requirements

These decisions are mandatory:

- **Reference image source:** `variant_colors[].image_link` only.
- **Size variants:** `variant_size` is informational only; display available size and price information, but do not require a size selection and do not use it to choose the reference image.
- **Manual upload:** remove the image upload/file-picker workflow entirely. Users cannot upload their own reference image.
- **Catalog source:** Supabase Edge Function below is the source of truth for product catalog data.
- **Generation:** use only image-generation or image-editing capabilities genuinely exposed by the Gemini Canvas runtime.
- **No external generation API, API key, paid API account, or additional backend.**

Do not reinterpret or weaken these locked requirements.

## 2. Supabase Product Catalog

Fetch the catalog with an HTTP GET request from:

```text
https://zyiavfljweavoxyyplxj.supabase.co/functions/v1/get-trx-products
```

Requirements:

- Load the catalog when the application starts.
- Treat the endpoint as read-only. Never create, update, or delete catalog data.
- Do not hardcode a product catalog as the primary data source.
- Handle network errors, non-success HTTP responses, empty responses, malformed JSON, and unexpected data shapes.
- Validate data before rendering it. Do not silently invent missing product fields or variants.
- Do not assume authentication headers, query parameters, or undocumented API behavior. Use only what is verified or explicitly provided.
- Do not log secrets or expose credentials. No API key is specified or required by this prompt.

### Expected data model

The following model is based on the supplied example and must be checked against the actual API response before implementation. Treat fields not confirmed by the live response as optional or unknown rather than assuming they always exist.

```ts
type ProductCatalog = Array<{
  product_type: string;
  count?: number;
  item_groups: Array<{
    item_group_id: string;
    count?: number;
    products: Array<{
      id?: string;
      title: string;
      description?: string;
      variant_size?: Array<{
        size?: string;
        price?: number | string;
        sale_price?: number | string;
      }>;
      variant_colors: Array<{
        color: string;
        image_link: string;
      }>;
    }>;
  }>;
}>;
```

Important:
- The supplied sample may be incomplete. Inspect the actual response and adapt parsing to the verified shape.
- Do not assume that `count` is authoritative; derive displayed item counts from actual arrays when appropriate.
- Preserve the hierarchy: `product_type` → `item_groups` → `products`.
- Each product's color variants are the source of selectable reference images.

## 3. Product Selection Workflow

The primary workflow is:

**Load Supabase Catalog → Select Product Type → Select Product Group → Select Product → Select Color Variant → Load Reference Image → Write Prompt → Generate → Preview Result**

Implement the following selection behavior:

1. Fetch and validate the catalog.
2. Display available `product_type` values.
3. After a product type is selected, show its `item_groups`.
4. After a group is selected, show its products.
5. After a product is selected, show its title, description, available size/price information, and color variants.
6. Require the user to select a color variant before generation.
7. Use only the selected variant's `image_link` as the active reference image.
8. When the selected product or color changes, update the active reference image and clear or invalidate any stale selection/result state as appropriate.
9. Ensure the generation request always corresponds to the currently selected product and color. Never use a stale image from a previous selection.

Provide clear selected states and useful empty states at every selection level.

## 4. Reference Image Rules

The reference image must come exclusively from:

```ts
selectedVariant.image_link
```

Mandatory rules:

- Do not use `additional_image_link`, even if it exists in the API response.
- Do not use product thumbnails, unrelated images, or fallback stock images as generation references.
- Load and preview the selected image before enabling generation.
- Validate that the URL is a usable image URL and handle load failures.
- If the selected image fails to load, show an error and prevent generation.
- Changing the color variant must load the newly selected variant's `image_link`.
- Do not silently substitute another variant or product image.
- Keep the displayed reference preview and generation input synchronized.

The URL may point to Cloudinary or another image host. Do not assume host-specific behavior unless verified.

## 5. Size and Price Information

Display `variant_size` as product information only.

- Show the available size and its associated `price` and `sale_price` when present.
- Do not require users to select a size.
- Do not use size or price to determine the reference image.
- Handle missing or incomplete size/price fields gracefully.
- Do not calculate or invent prices that are not present in the API data.

## 6. Prompt and Image Generation

Provide a prompt editor where users describe the desired transformation of the selected product reference image.

Optional controls may include style presets and aspect ratio choices, but only apply settings that the native generation capability actually supports.

### Generation flow

1. Confirm that a product is selected.
2. Confirm that a color variant is selected.
3. Confirm that the selected variant's reference image loaded successfully.
4. Confirm that the prompt is non-empty.
5. Check whether a supported native Gemini Canvas image-generation capability is genuinely available to the application at runtime.
6. Pass the selected reference image and user prompt using the actual documented runtime input format.
7. Apply optional settings only if the capability supports them.
8. Display a result only after a real successful generation response.

### Internal generation contract

The application may use an internal adapter contract similar to:

```ts
type ImageGenerationInput = {
  referenceImage: string;
  productTitle: string;
  productDescription?: string;
  selectedColor: string;
  prompt: string;
};
```

This is an application-level data contract only. It is **not** a claim that Gemini Canvas accepts this exact payload. Map it to the actual supported runtime interface only after verifying that interface.

## 7. Critical Runtime, API, and Cost Constraints

These requirements are mandatory:

- The application runs inside Gemini Canvas.
- Use only image-generation or image-editing capabilities that Gemini Canvas explicitly exposes to the application at runtime.
- Do not use Gemini Developer API, Google AI Studio API, Vertex AI API, or any third-party image-generation API.
- Do not require API keys, paid API accounts, external backends, servers, or user-managed credentials.
- Do not invent a Canvas SDK, JavaScript function, package, endpoint, or runtime integration.
- Do not assume that a feature available to Gemini during app authoring is callable by the generated application at runtime.
- Do not claim unlimited or guaranteed free generation. Respect actual account access, availability, and usage limits.
- The Supabase endpoint is used only for read-only catalog retrieval; it is not an image-generation service.

**Capability fallback:** If Gemini Canvas does not expose a callable native image-generation capability to the application runtime, clearly mark generation as unavailable. Keep catalog browsing, product selection, color selection, reference preview, and prompt editing usable. Do not fabricate a result, substitute a paid API, request an API key, or present a placeholder as generated output.

## 8. Main Interface

Create a polished product-focused creative workspace.

### Header
- Product name: **Gemini Canvas Image Studio**.
- Clear application identity.
- New creation/reset action, if useful.

### Catalog and product selection
- Product type selector.
- Product group selector.
- Product selector.
- Product title and description.
- Informational size/price display.
- Color variant selector.

### Reference image panel
- Preview the selected color variant's `image_link`.
- Show the selected product and color.
- Show image loading and image error states.
- Do not provide upload, replace-file, or remove-upload controls.

### Prompt and settings
- Prompt textarea with a useful example.
- Optional style presets, for example Realistic, 3D Render, Cinematic, Minimalist, Digital Art, and Custom.
- Optional aspect ratio selector only where supported.
- Make unsupported options unavailable or clearly informational; never send unsupported settings to generation.

### Result
- Display only the actual generated image returned by a successful native capability.
- Provide original/reference comparison where feasible.
- Download result only when the runtime provides a real result and browser-supported download behavior.
- Allow reuse of a real generated result only if supported and consistent with the product-based reference workflow.

### History
- Keep generated results in the active session only where the runtime allows it.
- Show prompt and available metadata.
- Never create fake history entries for unsuccessful generation.
- Provide a useful empty state.

## 9. Application States and Error Handling

Handle at least these states:

### Catalog
- Loading catalog.
- Catalog loaded.
- Catalog request failed.
- Empty catalog.
- Invalid or unexpected API response.
- No groups for selected product type.
- No products for selected group.

### Product and reference image
- No product selected.
- Product selected.
- No color variants available.
- Color variant selected.
- Reference image loading.
- Reference image loaded.
- Reference image failed to load.
- Invalid image URL.

### Generation
- Prompt missing.
- Ready to generate.
- Native generation capability unavailable.
- Generating.
- Generation successful.
- Usage limit reached, if reported by runtime.
- Generation failed.

Use clear, actionable error messages. Preserve the catalog and current selection when generation fails. Do not fabricate progress percentages; use an indeterminate loading state unless the runtime provides real progress information.

## 10. Visual Design and Accessibility

Create a polished, modern creative workspace:

- Premium, modern, minimalist visual language.
- Neutral background and restrained accent colors.
- Clear visual hierarchy and readable typography.
- Responsive desktop, tablet, and mobile layouts.
- Product selection and reference image should be prominent.
- Avoid clutter and unnecessary decorative elements.
- Accessible labels, keyboard navigation, and visible focus states.
- All visible controls must have functional behavior.

Prioritize the product-to-reference-to-generation workflow.

## 11. Suggested Architecture

Use the framework and runtime supported by Gemini Canvas. If React is supported, organize the application in a maintainable, modular way, for example:

```text
src/
  components/
    layout/
    catalog/
    product/
    variants/
    reference-image/
    prompt/
    result/
    history/
    ui/
  services/
    product-catalog/
    canvas-image-generation/
  hooks/
  types/
  utils/
  App.tsx
  main.tsx
```

Responsibilities:

- Catalog service: fetch and validate the Supabase response.
- Catalog state: retain the catalog and current selection.
- Product selection UI: navigate the product hierarchy.
- Reference image component: load and display the selected variant image.
- Generation adapter: check runtime capability and map the internal input contract to the verified native interface.
- Result/history components: display only real successful results.

Keep Canvas-specific generation integration isolated in the generation adapter. Do not add a mock implementation that can be mistaken for real generation.

## 12. Acceptance Criteria

The application is accepted when:

1. It runs interactively inside Gemini Canvas.
2. It fetches the product catalog from the specified Supabase Edge Function.
3. It handles loading, network failure, empty data, and malformed responses.
4. It preserves the `product_type` → `item_groups` → `products` hierarchy.
5. Users can select a product.
6. Product title and description are displayed when available.
7. `variant_size` is informational only and does not block generation.
8. Users can select a color from `variant_colors`.
9. Only the selected color's `image_link` is used as the reference image.
10. Changing color updates the reference image and generation input.
11. `additional_image_link` is not used.
12. Manual image upload and related UI are absent.
13. Generation requires a selected product, selected color, successfully loaded reference image, and non-empty prompt.
14. The application checks for a real supported Canvas-native generation capability.
15. No Developer API, third-party generation API, API key, paid API account, or external backend is used.
16. No fake or placeholder generation result is presented as real output.
17. Errors and unavailable/limited access are communicated honestly.
18. All visible controls work and the layout is responsive.

## 13. Dependencies and Verification Risks

Before claiming the implementation is fully functional, verify:

- The complete live JSON response and its actual nesting/field names.
- Browser access to the Supabase endpoint from Gemini Canvas.
- CORS behavior for the Canvas runtime origin.
- Actual consistency of product groups, product records, and color variants.
- Accessibility and successful loading of the supplied image URLs.
- The actual native Gemini Canvas runtime interface for image-to-image input and output.

Do not claim these items are verified without testing them. If any dependency cannot be verified in the Canvas environment, document the limitation and implement honest fallback behavior.

## 14. Final Instructions for Gemini Canvas

Build the interactive **Gemini Canvas Image Studio V3** application directly in Gemini Canvas according to this specification.

Start by inspecting the actual Supabase response and the capabilities genuinely exposed by the Canvas runtime. Implement the catalog browsing and product/color selection flow using verified data. Use the selected color variant's `image_link` as the only reference image source.

Do not add manual image upload. Do not require size selection. Do not use `additional_image_link`. Do not invent API behavior or runtime integrations.

Before implementing image generation, inspect the capabilities actually available in the Canvas environment. Use native Gemini image generation only if it is genuinely exposed to this application.

If native image-to-image generation cannot be called from the application runtime, deliver the working catalog, selection, reference preview, and prompt interface, and clearly report that generation is unavailable. Do not switch to a paid API, ask for credentials, or display fake generated content.

The priority is a genuinely usable, product-based Gemini Canvas application with no API-key setup and no external generation backend.
