// filters.js
export function filterContacts(contacts, { searchTerm = '', category = '' }) {
    console.log('Filtering with:', { searchTerm, category }); // Debug
    console.log('Total contacts:', contacts.length); // Debug

    // Mapeo de categorías del árbol a categorías de contactos
    const categoryMap = {
        'Emergency Services': 'Emergency',
        'Golf Cart Services': 'Golf Cart',
        'Resort Venues': ['Hotel', 'Spa', 'Wellness', 'Bar', 'Restaurant'],
        'Resort Activities': ['Scuba', 'Aqua', 'Tour', 'Activity', 'Tennis', 'Wellness', 'Concierge'],
        'Transportation Services': 'Transportation',
        'Special Services': ['Nanny', 'Photography', 'Personal Care', 'Kids Club', 'Chef', 'Catering', 'Delivery', 'Butler', 'Concierge'],
        'Off Property': ['Tour', 'Shopping', 'Restaurant']
    };

    return contacts.filter(contact => {
        // Si no hay categoría seleccionada, mostrar todos los contactos
        if (!category) return true;

        // Obtener las categorías correspondientes del mapeo
        const mappedCategories = categoryMap[category];
        if (!mappedCategories) return false;

        // Normalizar la categoría del contacto
        const contactCategory = (contact.category || '').toLowerCase();

        // Verificar si la categoría del contacto coincide con alguna de las categorías mapeadas
        const matchesCategory = Array.isArray(mappedCategories)
            ? mappedCategories.some(cat => contactCategory.includes(cat.toLowerCase()))
            : contactCategory.includes(mappedCategories.toLowerCase());

        // Si no coincide con la categoría, filtrar este contacto
        if (!matchesCategory) return false;

        // Si no hay término de búsqueda, mantener el contacto
        if (!searchTerm) return true;

        // Buscar en nombre y descripción
        const searchFields = [
            contact.name,
            contact.description
        ].filter(Boolean);

        // Convertir el término de búsqueda a minúsculas
        const term = searchTerm.toLowerCase().trim();
        
        // Verificar si algún campo coincide con el término de búsqueda
        return searchFields.some(field => 
            field.toString().toLowerCase().includes(term)
        );
    });
}