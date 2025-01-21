// filters.js
export function filterContacts(contacts, searchTerm) {
    if (!searchTerm) return contacts;
    
    searchTerm = searchTerm.toLowerCase().trim();
    
    return contacts.filter(contact => {
        const searchFields = [
            contact.name,
            contact.phone,
            contact.description,
            contact.section
        ];
        
        return searchFields.some(field => 
            field && field.toString().toLowerCase().includes(searchTerm)
        );
    });
}