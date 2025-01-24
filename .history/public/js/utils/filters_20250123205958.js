// filters.js
export function filterContacts(contacts, { searchTerm = '', category = '' }) {
    return contacts.filter(contact => {
        // Primero verificar si el contacto coincide con la categoría seleccionada
        const matchesCategory = !category || 
            contact.category === category || 
            contact.section === category;

        // Si no coincide con la categoría, filtrar este contacto
        if (!matchesCategory) return false;

        // Si no hay término de búsqueda, mantener el contacto
        if (!searchTerm) return true;

        // Buscar en todos los campos relevantes
        const searchFields = [
            contact.name,
            contact.phone,
            contact.description,
            contact.category,
            contact.section
        ];

        // Convertir el término de búsqueda a minúsculas para comparación insensible a mayúsculas
        const term = searchTerm.toLowerCase().trim();
        
        // Verificar si algún campo coincide con el término de búsqueda
        return searchFields.some(field => 
            field && field.toString().toLowerCase().includes(term)
        );
    });
}