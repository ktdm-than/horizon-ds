import StyleDictionary from 'style-dictionary';

const T = 'tokens/';
const CORE = T + 'core.default.tokens.json';
const STYLES = [
  T + 'typography.styles.tokens.json',
  T + 'effects.styles.tokens.json',
  T + 'color.styles.tokens.json',
];

// Figma writes font weight as a style NAME. CSS needs a number.
const WEIGHTS = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  'Semi Bold': 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
};

// ---------------------------------------------------------------------------
// 1. PREPROCESSORS
// ---------------------------------------------------------------------------

// Runs BEFORE any transform, so the shorthand sees the fixed values.
StyleDictionary.registerPreprocessor({
  name: 'typography/fix',
  preprocessor: (dict) => {
    const walk = (node) => {
      for (const key of Object.keys(node)) {
        const t = node[key];
        if (!t || typeof t !== 'object') continue;
        
        const type = t.$type || t.type;
        const valKey = t.$value !== undefined ? '$value' : t.value !== undefined ? 'value' : null;

        if (type === 'typography' && valKey) {
          const v = t[valKey];
          t[valKey] = {
            ...v,
            fontWeight: WEIGHTS[v.fontWeight] ?? v.fontWeight,
            lineHeight:
              typeof v.lineHeight === 'number'
                ? { value: v.lineHeight, unit: 'px' }
                : v.lineHeight,
          };
        } else {
          walk(t);
        }
      }
      return node;
    };
    return walk(dict);
  },
});

// ---------------------------------------------------------------------------
// 2. CUSTOM TRANSFORMS FOR GRADIENTS & SHADOWS / ELEVATION
// ---------------------------------------------------------------------------

// Transform gradient objects into valid CSS linear-gradient string
StyleDictionary.registerTransform({
  name: 'css/gradient',
  type: 'value',
  transitive: true,
  matcher: (token) => {
    const type = token.$type || token.type;
    return type === 'gradient' || type === 'colorGradient';
  },
  transform: (token) => {
    const val = token.$value ?? token.value;
    if (typeof val === 'string') return val;

    // Standard Figma/DTCG gradient stops array: [{ color, position }, ...]
    if (Array.isArray(val)) {
      const stops = val.map((stop) => {
        const color = stop.color;
        let pos = stop.position ?? stop.stop ?? 0;
        if (typeof pos === 'number') {
          pos = pos <= 1 ? `${Math.round(pos * 100)}%` : `${pos}px`;
        }
        return `${color} ${pos}`.trim();
      });
      
      const angle = token.angle || token.rotation || '180deg';
      return `linear-gradient(${angle}, ${stops.join(', ')})`;
    }

    return val;
  },
});

// Transform single/multi-layered shadows into valid CSS box-shadow string
StyleDictionary.registerTransform({
  name: 'css/elevation-shadow',
  type: 'value',
  transitive: true,
  matcher: (token) => {
    const type = token.$type || token.type;
    return type === 'shadow' || type === 'boxShadow' || type === 'elevation';
  },
  transform: (token) => {
    const val = token.$value ?? token.value;
    if (typeof val === 'string') return val;

    const formatSingleShadow = (s) => {
      if (typeof s === 'string') return s;

      const x = typeof s.x === 'number' ? `${s.x}px` : s.x ?? '0px';
      const y = typeof s.y === 'number' ? `${s.y}px` : s.y ?? '0px';
      const blur = typeof s.blur === 'number' ? `${s.blur}px` : s.blur ?? '0px';
      const spread = typeof s.spread === 'number' ? `${s.spread}px` : s.spread ?? '0px';
      const color = s.color ?? 'rgba(0, 0, 0, 0.15)';
      const inset = s.inset || s.type === 'innerShadow' ? 'inset ' : '';

      return `${inset}${x} ${y} ${blur} ${spread} ${color}`.trim();
    };

    if (Array.isArray(val)) {
      return val.map(formatSingleShadow).join(', ');
    }

    if (typeof val === 'object' && val !== null) {
      return formatSingleShadow(val);
    }

    return val;
  },
});

// ---------------------------------------------------------------------------
// 3. BUILD PIPELINES
// ---------------------------------------------------------------------------

const css = (name, sources, selector, filter) =>
  new StyleDictionary({
    source: sources,
    preprocessors: ['typography/fix'],
    platforms: {
      css: {
        transformGroup: 'css',
        transforms: ['css/gradient', 'css/elevation-shadow'],
        buildPath: 'build/css/',
        files: [
          {
            destination: name,
            format: 'css/variables',
            options: { selector, showFileHeader: false },
            filter,
          },
        ],
      },
    },
  });

const native = (sources) =>
  new StyleDictionary({
    source: sources,
    preprocessors: ['typography/fix'],
    platforms: {
      ios: {
        transformGroup: 'ios-swift',
        buildPath: 'build/ios/',
        files: [
          {
            destination: 'Tokens.swift',
            format: 'ios-swift/class.swift',
            options: { className: 'Tokens' },
          },
        ],
      },
      android: {
        transformGroup: 'android',
        buildPath: 'build/android/',
        files: [
          {
            destination: 'colors.xml',
            format: 'android/resources',
            resourceType: 'color',
            filter: (t) => (t.$type || t.type) === 'color',
          },
        ],
      },
    },
  });

// ---------------------------------------------------------------------------
// 4. EXECUTION
// ---------------------------------------------------------------------------

// :root — core, light colours, web space + type, styles
await css(
  'tokens.css',
  [
    CORE,
    T + 'semantic.light.tokens.json',
    T + 'typography.english.tokens.json',
    T + 'typography.burmese.tokens.json',
    ...STYLES,
  ],
  ':root'
).buildAllPlatforms();

// dark — only the colours that change
await css(
  'tokens-dark.css',
  [CORE, T + 'semantic.dark.tokens.json'],
  '[data-theme="dark"]',
  (t) => t.filePath.includes('semantic.dark')
).buildAllPlatforms();