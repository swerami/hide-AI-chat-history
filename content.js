(() => {
  const site = HCH_SITES.find((s) => s.hosts.includes(location.hostname));
  if (!site) return;

  const root = document.documentElement;
  let off = false;

  function apply() {
    if (off) root.setAttribute("data-hch-off", "");
    else root.removeAttribute("data-hch-off");
  }

  async function refresh() {
    const settings = await chrome.storage.sync.get(HCH_DEFAULTS);
    off = !hchIsActive(settings, site.key);
    apply();
  }

  refresh();

  chrome.storage.onChanged.addListener((_changes, area) => {
    if (area === "sync") refresh();
  });

  new MutationObserver(() => {
    if (off !== root.hasAttribute("data-hch-off")) apply();
  }).observe(root, { attributes: true, attributeFilter: ["data-hch-off"] });
})();
