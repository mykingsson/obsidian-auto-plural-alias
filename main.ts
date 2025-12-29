import { Plugin, TFile } from 'obsidian';
import * as pluralize from 'pluralize';

export default class AutoPluralAliasPlugin extends Plugin {

    async onload() {
        console.log('Loading Auto Plural Alias Plugin');

        this.registerEvent(
            this.app.vault.on('create', async (file) => {
                if (file instanceof TFile && file.extension === 'md' && file.basename !== 'Untitled') {
                    await this.addPluralAlias(file);
                }
            })
        );

        this.registerEvent(
            this.app.vault.on('rename', async (file, oldPath) => {
                if (file instanceof TFile && file.extension === 'md') {
                    const oldName = oldPath.split('/').pop()?.replace('.md', '');
                    if (oldName && oldName !== file.basename) {
                        await this.addPluralAlias(file);
                    }
                }
            })
        );
    }

    async addPluralAlias(file: TFile) {
        const fileName = file.basename;

        const isPlural = pluralize.isPlural(fileName);
        const aliasForm = isPlural
            ? pluralize.singular(fileName)
            : pluralize.plural(fileName);

        if (aliasForm.toLowerCase() === fileName.toLowerCase()) {
            return;
        }

        await this.app.fileManager.processFrontMatter(file, (fm) => {
            let aliases: string[] = [];

            // Normalize existing aliases
            if (typeof fm.alias === 'string') {
                aliases = [fm.alias];
                delete fm.alias;
            }

            if (Array.isArray(fm.aliases)) {
                aliases = aliases.concat(fm.aliases);
            }

            // Replace filename if present
            const index = aliases.findIndex(
                a => a.toLowerCase() === fileName.toLowerCase()
            );

            if (index !== -1) {
                aliases[index] = aliasForm;
            } else if (!aliases.some(a => a.toLowerCase() === aliasForm.toLowerCase())) {
                aliases.push(aliasForm);
            }

            // De-duplicate
            aliases = Array.from(new Set(aliases));

            // Write back in the cleanest form
            if (aliases.length === 1) {
                fm.alias = aliases[0];
                delete fm.aliases;
            } else if (aliases.length > 1) {
                fm.aliases = aliases;
                delete fm.alias;
            }
        });
    }

    onunload() {
        console.log('Unloading Auto Plural Alias Plugin');
    }
}
