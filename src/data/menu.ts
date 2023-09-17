import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Define the Menu interface
export interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
  badge?: string;
}

export interface Menu {
  'menu-items': MenuItem[];
}

// Read the YAML data from the menu.yml file
const menuFilePath = path.join(process.cwd(), 'src/data/menu.yml');
const menuData = fs.readFileSync(menuFilePath, 'utf8');

// Parse the YAML data to get the menu array
const menuYAML: Menu = yaml.load(menuData) as Menu;
const menu: MenuItem[] = menuYAML['menu-items'];

// Export the menu array for use in other parts of your application
export default menu;
