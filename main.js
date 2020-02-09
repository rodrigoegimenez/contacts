let contacts = []

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target
  let name = form.name.value
  let phone = form.phone.value
  let emergency = form.emergency.checked
  let contact = contacts.find(contact => contact.name == name)
  if (!contact) {
    contact = {
      id: generateId(),
      name: name,
      phone: phone,
      emergency: emergency
    }
    contacts.push(contact)
  }
  else {
    contact.phone = phone
    contact.emergency = emergency
  }
  form.reset()
  toggleAddContactForm()
  saveContacts()
  drawContacts()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactsData = JSON.parse(window.localStorage.getItem("contacts"))
  if (contactsData) {
    contacts = contactsData
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  sortContacts()
  let template = ""
  contacts.forEach(contact => {
    if (contact.emergency) {
      template += '<div class="card mt-1 mb-1 emergency-contact">'
    } else {
      template += '<div class="card mt-1 mb-1">'
    }
    template += `<h3 class="mt-1 mb-1">${contact.name}</h3>
        <div class="d-flex space-between">
          <p>
            <i class="fa fa-fw fa-phone"></i>
            <span>${contact.phone}</span>
          </p>
          <i class="action fa fa-trash text-danger" onclick="removeContact('${contact.id}')"></i>
        </div>
      </div>`
  })
  document.getElementById("contact-list").innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  contacts.splice(index, 1)
  saveContacts()
  drawContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  let contactForm = document.getElementById("new-contact-form")
  if (contactForm.classList.contains("hidden")) {
    contactForm.classList.remove("hidden")
  } else {
    contactForm.classList.add("hidden")
  }
}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

function sortContacts() {
  contacts.sort((a, b) => {
    if (a.emergency && !b.emergency) return -1
    if (!a.emergency && b.emergency) return 1
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
}

loadContacts()
drawContacts()