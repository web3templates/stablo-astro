import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Define the Menu interface
export interface Menu {
    label: string;
    href: string;
    external?: boolean;
    badge?: string;
}

// Read the YAML data from the menu.yml file
const menuFilePath = path.join(process.cwd(), 'src/data/menu.yml');
const menuData = fs.readFileSync(menuFilePath, 'utf8');

// Parse the YAML data to get the menu array
const menu: Menu[] = yaml.load(menuData) as Menu[];

// Export the menu array for use in other parts of your application
export default menu;