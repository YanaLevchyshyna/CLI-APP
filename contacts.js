import fs from 'fs/promises';
import path from 'path';

const contactsPath = path.resolve('db', 'contacts.json');
// console.log(contactsPath);

export const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};
