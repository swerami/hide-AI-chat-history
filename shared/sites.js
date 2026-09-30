const HCH_SITES = [
  { key: "claude", name: "Claude", hosts: ["claude.ai"] },
  { key: "chatgpt", name: "ChatGPT", hosts: ["chatgpt.com"] },
  { key: "gemini", name: "Gemini", hosts: ["gemini.google.com"] },
  { key: "grok", name: "Grok", hosts: ["grok.com"] },
];

const HCH_DEFAULTS = { enabled: true, sites: {} };

function hchIsActive(settings, siteKey) {
  return settings.enabled && settings.sites[siteKey] !== false;
}
