# Auto Plural Alias (Obsidian Plugin)

## Abstract

**Auto Plural Alias** is an open-source Obsidian plugin that automatically manages note aliases based on a note’s title. It ensures that singular and plural forms of a note title stay synchronized in the YAML front matter, reducing manual upkeep and improving link discovery across your vault.


---

## Functionality

The plugin triggers whenever a note is created or the title changed, automatically inserting an appropriate plural or singular form of the title as an alias.
Key plugin features:
- Does not affect any existing YAML frontmatter.
- Replaces singular form alias if title is switched to singular form, or vice versa.
- Uses natural language processing to ensure consistent forms each time.

## Installation

### From Obsidian (Recommended)

Once available in the Community Plugins directory (not yet available):

1. Open **Obsidian**
2. Go to **Settings → Community Plugins**
3. Disable **Safe Mode**
4. Click **Browse**
5. Search for **Auto Plural Alias**
6. Install and enable the plugin

---

### Manual Installation

1. Download the latest release from GitHub
2. Extract the files 'main.js' and 'manifest.json' into your vault folder under the following:
```
.obsidian/plugins/auto-plural-alias/
```
3. Restart Obsidian or reload plugins
4. Turn the toggle 'on' in Obsidian plugins to begin use.

## Sources

1. Pluralize -- Natural Language Processing
2. Obsidian API -- Direct access to YAML Frontmatter Editing

## Support
Did you find this helpful? Buy me a coffee! https://buymeacoffee.com/peterlogan
