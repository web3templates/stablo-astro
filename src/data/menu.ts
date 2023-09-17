import fs from 'fs';
import path from 'path';

// Define the Menu interface
export interface Menu {
    label: string;
    href: string;
    external?: boolean;
    badge?: string;
}

// Read the JSON data from the menu.json file
const menuFilePath = path.join(process.cwd(), 'src/data/menu.json');
const menuData = fs.readFileSync(menuFilePath, 'utf8');

// Parse the JSON data to get the menu array
const menu: Menu[] = JSON.parse(menuData);

// Export the menu array for use in other parts of your application
export default menu;
