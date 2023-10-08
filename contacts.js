import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const contactsPath = path.resolve('db', 'contacts.json');
// console.log(contactsPath);

function updateContact(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (id) => {
  const contacts = await getAllContacts();
  const oneContact = contacts.find((item) => item.id === id);
  return oneContact || null;
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
  await updateContact(contacts);
  // метод stringify прибирає всі зайві пробіли, відступи і все записує в один рядок
  // першим аргументом передаємо те що потрібно перетворити на строку,
  // другим функція замінник, якщо нам потрібно замінити одні символи на інші, то це передаємо другим аргументом,
  // третій аргумент - кількість відступів
  return newContact;
};

export const updateContactById = async (id, { name, email, phone }) => {
  const contacts = await getAllContacts();

  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContact(contacts);

  return contacts[index];
};

export const deleteContactById = async (id) => {
  const contacts = await getAllContacts();

  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  const [newContactsArray] = contacts.splice(index, 1);
  // деструктуризуємо масив контакітв, видаляємо потрібний
  await updateContact(contacts);
  //  оновлюємо наш масив контактів після видалення;
  return newContactsArray;
  // метод сплайс дозволяє повернути масив з видаленим контактом.
};
