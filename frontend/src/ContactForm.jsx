import { useState } from "react";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
  const [firstName, setFirstName] = useState(existingContact.firstName || "");
  const [lastName, setLastName] = useState(existingContact.lastName || "");
  const [email, setEmail] = useState(existingContact.email || "");

  const updating = Object.entries(existingContact).length !== 0;

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      firstName,
      lastName,
      email,
    };

    const url =
      "http://127.0.0.1:5000/" +
      (updating ? `update_contact/${existingContact.id}` : "create_contact");
    const options = {
      method: updating ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, options);

    if (response.status !== 200 && response.status !== 201) {
      const data = await response.json();
      alert(data.message);
    } else {
      updateCallback();
    }
  };
  return (
    <form onSubmit={onSubmit} className="px-4 py-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-montserrat font-semibold text-center">{updating ? "Updating": "Creating"} contact</h1>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input 
          className="border border-gray-300 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input 
          className="border border-gray-300 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input 
          className="border border-gray-300 block py-2 px-4 w-full rounded focus:outline-none focus:border-teal-500"
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button 
      className="px-4 py-2 text-md font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50"
      type="submit">
        {updating ? "Update" : "Create"}
        </button>
    </form>
  );
};

export default ContactForm;
