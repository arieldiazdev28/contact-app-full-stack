const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://127.0.0.1:5000/delete_contact/${id}`,
        options
      );
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="font-montserrat font-bold text-center text-2xl mb-2">Contacts</h2>
      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold font-montserrat tracking-wide text-left">
                id
              </th>
              <th className="p-3 text-sm font-semibold font-montserrat tracking-wide text-left">
                First Name
              </th>
              <th className="p-3 text-sm font-semibold font-montserrat tracking-wide text-left">
                Last Name
              </th>
              <th className="p-3 text-sm font-semibold font-montserrat tracking-wide text-left">
                Email
              </th>
              <th className="p-3 text-sm font-semibold font-montserrat tracking-wide text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-100">
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="p-3 text-sm text-blue-600 font-bold font-inter">
                  {contact.id}
                </td>
                <td className="p-3 text-sm text-gray-700 font-inter">
                  {contact.firstName}
                </td>
                <td className="p-3 text-sm text-gray-700 font-inter">
                  {contact.lastName}
                </td>
                <td className="p-3 text-sm text-gray-700 font-inter">{contact.email}</td>
                <td className="p-3 flex justify-center items-center gap-2">
                  <button
                    onClick={() => updateContact(contact)}
                    className="p-2 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-lg bg-opacity-50"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(contact.id)}
                    className="p-2 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
