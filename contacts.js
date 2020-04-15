const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

function _getFileData() {
  const fileText = fs.readFileSync(contactsPath, "utf-8");
  return JSON.parse(fileText);
}
function _randomInteger(min = 0, max = 99) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
function listContacts() {
  const data = _getFileData();
  console.log(data);
}

function getContactById(contactId) {
  const data = _getFileData();
  const contact = data.filter((item) => item.id === contactId)[0];

  console.log(contact);
}

function removeContact(contactId) {
  const data = _getFileData();
  const filteredContacts = data.filter((item) => item.id !== contactId);

  fs.writeFileSync(contactsPath, JSON.stringify(filteredContacts, "", 2));
  console.log(filteredContacts);
}

function addContact(name, email, phone) {
  const data = _getFileData();
  const contact = {
    id: _randomInteger(),
    name,
    email,
    phone,
  };
  data.push(contact);
  fs.writeFileSync(contactsPath, JSON.stringify(data, "", 2));
  console.log(data);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
