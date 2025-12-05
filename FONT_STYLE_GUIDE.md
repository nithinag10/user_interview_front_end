# Font Style Guide - Industrial Clarity Theme

## Font Families
- **Monospace (font-mono)**: JetBrains Mono, Roboto Mono, IBM Plex Mono
- **Sans-serif (font-sans)**: Inter

## Usage Rules

### Use `font-sans` for:
- ✅ Large headlines and hero titles
- ✅ Body text and paragraphs
- ✅ Descriptions and explanations
- ✅ Narrative content
- ✅ Card/section descriptions
- ✅ User input placeholders
- ✅ Long-form text

### Use `font-mono` for:
- ✅ Data labels (PROBLEM, MARKET, PAYMENT)
- ✅ Metrics and scores (7/10, 85%)
- ✅ Section headers in ALL CAPS (ANALYSIS, KEY EVIDENCE)
- ✅ Technical indicators (LIVE, IN PROGRESS)
- ✅ Agent names (INTERVIEWER, CUSTOMER)
- ✅ Timestamps (10:30 AM)
- ✅ Step numbers (01, 02, 03)
- ✅ Status labels and badges
- ✅ Small technical annotations

## Component-Level Rules

### Headers
```tsx
// Main page title - sans
<h1 className="font-sans">Stop believing your own hype</h1>

// Section headers (large) - sans
<h2 className="font-sans">The First-Principles Validation Engine</h2>

// Subsection headers - sans
<h3 className="font-sans">The Intake</h3>

// Data section labels (small, ALL CAPS) - mono
<h3 className="font-mono">ANALYSIS</h3>
<h3 className="font-mono">PROBLEM VALIDATION</h3>
```

### Body Text
```tsx
// Descriptions - sans
<p className="font-sans">Tell us the specific persona...</p>

// Small annotations - mono
<p className="font-mono text-xs">YOU DEFINE THE CONSTRAINTS</p>
```

### Data Display
```tsx
// Score numbers - mono
<span className="font-mono">7/10</span>

// Labels - mono
<span className="font-mono">CONFIDENCE: 85%</span>

// Reasoning text - sans
<p className="font-sans">The problem validation shows strong signals...</p>
```

### Buttons
```tsx
// Button text - inherit (usually bold sans)
<Button className="font-bold">Run Simulation</Button>
```

### Forms
```tsx
// Labels - sans (medium weight)
<Label className="font-medium">Job to be Done</Label>

// Input placeholder - sans
<Input placeholder="Describe the task..." />

// Helper text - mono (small)
<p className="font-mono text-xs">Required field</p>
```

## Examples from Each Page

### Home Page
- Hero title: `font-sans` ✅
- Section headers: `font-sans` ✅
- Step numbers (01, 02): `font-mono` ✅
- Step titles: `font-sans` ✅
- Small labels: `font-mono` ✅

### New Interview Page
- Form labels: `font-sans` (medium weight) ✅
- Input placeholders: `font-sans` ✅
- Section labels: `font-mono` ✅

### Interview Room Page
- Page title: `font-sans` ✅
- Agent names: `font-mono` ✅
- Messages: `font-sans` ✅
- LIVE indicator: `font-mono` ✅

### Insights Page
- Section headers (ANALYSIS): `font-mono` ✅
- Score labels (PROBLEM): `font-mono` ✅
- Score numbers (7/10): `font-mono` ✅
- Reasoning text: `font-sans` ✅
- Badge labels: `font-mono` ✅
