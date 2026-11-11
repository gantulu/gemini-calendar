import { useMemo, useState } from "react";

const products = ["iPhone", "iPad", "MacBook", "Apple Watch", "AirPods", "Accessories"];
const concepts = [
  "Premium Product Showcase",
  "Product Launch",
  "Lifestyle Photography",
  "Minimalist Studio",
  "Cinematic Product",
  "Seasonal Campaign",
  "Promotional Design",
];
const styles = ["Photorealistic", "Premium Editorial", "Minimalist", "Cinematic", "Modern Lifestyle", "3D Render"];
const colors = ["Natural / Default", "Black", "Silver", "White", "Gold", "Custom"];
const backgrounds = ["Studio gradient", "Warm neutral studio", "Dark luxury", "Modern interior", "Outdoor lifestyle", "Custom"];
const lighting = ["Soft studio light", "Golden hour", "Dramatic cinematic", "Bright natural light"];
const compositions = ["Centered hero", "Rule of thirds", "Close-up detail", "Negative-space editorial"];
const angles = ["Eye level", "Three-quarter view", "Low angle", "Top-down"];
const moods = ["Premium", "Clean", "Bold", "Warm", "Futuristic"];

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

export default function App() {
  const [product, setProduct] = useState("iPhone");
  const [model, setModel] = useState("");
  const [color, setColor] = useState(colors[0]);
  const [concept, setConcept] = useState(concepts[0]);
  const [customConcept, setCustomConcept] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [background, setBackground] = useState(backgrounds[0]);
  const [light, setLight] = useState(lighting[0]);
  const [composition, setComposition] = useState(compositions[0]);
  const [angle, setAngle] = useState(angles[1]);
  const [mood, setMood] = useState(moods[0]);
  const [customColor, setCustomColor] = useState("");
  const [customBackground, setCustomBackground] = useState("");
  const ready = useMemo(() => Boolean(product && concept), [product, concept]);
  // Keep generation disabled until Canvas adds and verifies its native image feature.
  const nativeGenerationAvailable = false;

  function reset() {
    setProduct("iPhone");
    setModel("");
    setColor(colors[0]);
    setConcept(concepts[0]);
    setCustomConcept("");
    setStyle(styles[0]);
    setBackground(backgrounds[0]);
    setLight(lighting[0]);
    setComposition(compositions[0]);
    setAngle(angles[1]);
    setMood(moods[0]);
    setCustomColor("");
    setCustomBackground("");
  }


  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Gemini Calendar home">
          <span className="brand-mark">G</span>
          <span>gemini<span className="brand-light">calendar</span></span>
        </a>
        <div className="topbar-right">
          <span className="topbar-caption">APPLE CAMPAIGN STUDIO</span>
          <button className="text-button" onClick={reset}>Reset</button>
        </div>
      </header>

      <section className="intro">
        <div className="eyebrow"><span className="eyebrow-line" /> CREATIVE WORKSPACE · MALAYSIA</div>
        <h1>Make your next<br /><em>campaign iconic.</em></h1>
        <p>Craft premium Apple product visuals for your Instagram presence.</p>
      </section>

      <div className="workspace">
        <section className="configuration">
          <div className="section-heading">
            <div><span className="step">01</span><h2>Product & campaign</h2></div>
            <span className="section-note">START WITH THE SUBJECT</span>
          </div>

          <div className="product-grid" role="group" aria-label="Select product family">
            {products.map((item, index) => (
              <button key={item} className={product === item ? "product-card selected" : "product-card"} onClick={() => setProduct(item)} aria-pressed={product === item}>
                <span className="product-index">0{index + 1}</span>
                <span>{item}</span>
                <span className="selection-dot" />
              </button>
            ))}
          </div>

          <label className="field">
            <span>Product model / details <small>OPTIONAL</small></span>
            <input value={model} onChange={(event) => setModel(event.target.value)} placeholder="e.g. iPhone model, finish or details" />
          </label>

          <div className="field-grid">
            <SelectField label="Product color" value={color} onChange={setColor} options={colors} />
            <SelectField label="Campaign concept" value={concept} onChange={setConcept} options={concepts} />
          </div>
          {color === "Custom" && <label className="field"><span>Custom color direction</span><input value={customColor} onChange={(event) => setCustomColor(event.target.value)} placeholder="Describe the desired color" /></label>}
          {concept === "Promotional Design" && <label className="field"><span>Campaign direction <small>OPTIONAL</small></span><input value={customConcept} onChange={(event) => setCustomConcept(event.target.value)} placeholder="Describe the campaign idea" /></label>}

          <div className="section-heading visual-heading">
            <div><span className="step">02</span><h2>Visual direction</h2></div>
            <span className="section-note">SHAPE THE AESTHETIC</span>
          </div>

          <div className="field-grid">
            <SelectField label="Visual style" value={style} onChange={setStyle} options={styles} />
            <SelectField label="Background" value={background} onChange={setBackground} options={backgrounds} />
            {background === "Custom" && <label className="field"><span>Custom background</span><input value={customBackground} onChange={(event) => setCustomBackground(event.target.value)} placeholder="Describe the environment" /></label>}
            <SelectField label="Lighting" value={light} onChange={setLight} options={lighting} />
            <SelectField label="Composition" value={composition} onChange={setComposition} options={compositions} />
            <SelectField label="Camera angle" value={angle} onChange={setAngle} options={angles} />
            <SelectField label="Visual mood" value={mood} onChange={setMood} options={moods} />
          </div>

          <div className="output-spec">
            <div>
              <span className="output-label">OUTPUT FORMAT</span>
              <strong>Portrait · 9:16</strong>
              <small>Target dimensions 1080 × 1920 px · subject to native runtime support</small>
            </div>
            <div className="ratio-icon" aria-hidden="true"><span /></div>
          </div>

          <button className="generate-button" disabled={!ready || !nativeGenerationAvailable}>
            <span className="sparkle">✳</span> Generate image <span className="button-arrow">↗</span>
          </button>
          <p className="fine-print">Image generation becomes available after native Gemini features are connected in Canvas.</p>
        </section>

        <aside className="preview-column">
          <div className="preview-heading">
            <div><span className="step">03</span><h2>Your creation</h2></div>
            <span className="preview-status">IMAGE PREVIEW</span>
          </div>
          <div className="preview-frame">
            <div className="preview-inner">
              <div className="preview-orbit orbit-one" />
              <div className="preview-orbit orbit-two" />
              <div className="preview-content">
                <span className="preview-symbol">✳</span>
                <span className="preview-kicker">YOUR NEXT CAMPAIGN</span>
                <strong>Imagine<br />what's next.</strong>
                <span className="preview-description">Your generated image will appear here.</span>
              </div>
              <span className="preview-ratio">9 : 16</span>
            </div>
          </div>
          <div className="preview-footer">
            <span className="status-dot" />
            <span>Waiting for native image generation</span>
          </div>
          <div className="runtime-notice">
            <span className="notice-icon">i</span>
            <div>
              <strong>Canvas AI connection required</strong>
              <p>Google provides an “Add Gemini features” workflow for image generation in Canvas. Complete that native connection before enabling generation here.</p>
            </div>
          </div>
          <div className="preview-meta">
            <span>GEMINI CALENDAR</span>
            <span>APPLE STORE MALAYSIA</span>
          </div>
        </aside>
      </div>

      <footer className="footer">
        <span>Designed for the vertical screen.</span>
        <span>GEMINI CALENDAR · V1</span>
      </footer>
    </main>
  );
}
