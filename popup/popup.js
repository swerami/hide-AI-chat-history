const enabledInput = document.getElementById("enabled");
const sitesFieldset = document.getElementById("sites");
const controls = document.getElementById("controls");

async function render() {
  const settings = await chrome.storage.sync.get(HCH_DEFAULTS);

  enabledInput.checked = settings.enabled;
  sitesFieldset.disabled = !settings.enabled;
  enabledInput.onchange = () => {
    sitesFieldset.disabled = !enabledInput.checked;
    chrome.storage.sync.set({ enabled: enabledInput.checked });
  };

  for (const site of HCH_SITES) {
    const label = document.createElement("label");
    label.className = "row";

    const name = document.createElement("span");
    name.textContent = site.name;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.setAttribute("role", "switch");
    input.checked = settings.sites[site.key] !== false;
    input.onchange = async () => {
      const { sites } = await chrome.storage.sync.get(HCH_DEFAULTS);
      sites[site.key] = input.checked;
      await chrome.storage.sync.set({ sites });
    };

    label.append(name, input);
    sitesFieldset.append(label);
  }

  controls.hidden = false;
}

render();
