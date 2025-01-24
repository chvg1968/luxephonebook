// filters.js
export function filterContacts(contacts, { searchTerm = '', category = '' }) {
    console.log('Filtering with:', { searchTerm, category }); // Debug
    console.log('Total contacts:', contacts.length); // Debug

    return contacts.filter(contact => {
        // Si no hay categoría seleccionada, mostrar todos los contactos
        if (!category) return true;

        // Normalizar la categoría del contacto y la categoría seleccionada
        const contactCategory = (contact.category || '').toLowerCase();
        const selectedCategory = category.toLowerCase();

        // Verificar si coincide con la categoría
        const matchesCategory = contactCategory === selectedCategory;

        // Si no coincide con la categoría, filtrar este contacto
        if (!matchesCategory) return false;

        // Si no hay término de búsqueda, mantener el contacto
        if (!searchTerm) return true;

        // Buscar en nombre y descripción
        const searchFields = [
            contact.name,
            contact.description
        ].filter(Boolean); // Eliminar campos null/undefined

        // Convertir el término de búsqueda a minúsculas
        const term = searchTerm.toLowerCase().trim();
        
        // Verificar si algún campo coincide con el término de búsqueda
        return searchFields.some(field => 
            field.toString().toLowerCase().includes(term)
        );
    });
}