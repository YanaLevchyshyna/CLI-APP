import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');
// console.log(contactsPath);

export const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const oneContact = contacts.find((item) => item.id === id);
  return oneContact;
};

export const addContact = async ({ name, email, phone }) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  // метод stringify прибирає всі зайві пробіли, відступи і все записує в один рядок
  // першим аргументом передаємо те що потрібно перетворити на строку,
  // другим функція замінник, якщо нам потрібно замінити одні символи на інші, то це передаємо другим аргументом,
  // третій аргумент - кількість відступів
  return newContact;
};
