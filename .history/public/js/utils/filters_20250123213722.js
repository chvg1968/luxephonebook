// filters.js
export function filterContacts(contacts, { searchTerm = '', category = '' }) {
    console.log('Filtering with:', { searchTerm, category }); // Debug
    console.log('Total contacts:', contacts.length); // Debug

    return contacts.filter(contact => {
        // Si no hay categoría seleccionada, mostrar todos los contactos
        if (!category) return true;

        // Normalizar la categoría del contacto y la categoría seleccionada
        const contactCategory = (contact.category || '').toLowerCase();
        const contactSection = (contact.section || '').toLowerCase();
        const selectedCategory = category.toLowerCase();

        console.log('Contact:', contact.name, { contactCategory, contactSection, selectedCategory }); // Debug

        // Verificar si coincide con la categoría o sección
        const matchesCategory = 
            contactCategory.includes(selectedCategory) || 
            selectedCategory.includes(contactCategory) ||
            contactSection.includes(selectedCategory) ||
            selectedCategory.includes(contactSection);

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