// filters.js
export function filterContacts(contacts, { searchTerm = '', category = '' }) {
    console.log('Filtering with:', { searchTerm, category }); // Debug
    console.log('Total contacts:', contacts.length); // Debug

    // Mapeo de categorías del árbol a categorías de contactos
    const categoryMap = {
        'Emergency': 'Emergency',
        'Golf Cart': 'Golf Cart',
        'Hotel': 'Hotel',
        'Spa': 'Spa',
        'Wellness Center': 'Wellness',
        'Bar': 'Bar',
        'Restaurant': 'Restaurant',
        'Scuba Diving Tours': 'Scuba',
        'Aqua Tours': 'Aqua',
        'Tours': 'Tour',
        'Activities Reservations': 'Activity',
        'Tennis Reservations': 'Tennis',
        'Concierge': 'Concierge',
        'Transportation': 'Transportation',
        'Nanny Services': 'Nanny',
        'Professional Photography': 'Photography',
        'Personal Care and Fitness': 'Personal Care',
        "Kid's Club": 'Kids Club',
        'Personal Chefs': 'Chef',
        'Pre-Made Meals and Catering': 'Catering',
        'Delivery Services': 'Delivery',
        'Butler Services': 'Butler',
        'Concierge Services': 'Concierge',
        'Shopping': 'Shopping'
    };

    return contacts.filter(contact => {
        // Si no hay categoría seleccionada, mostrar todos los contactos
        if (!category) return true;

        // Obtener la categoría mapeada
        const mappedCategory = categoryMap[category];
        if (!mappedCategory) {
            console.log('No mapping found for category:', category);
            return false;
        }

        // Normalizar las categorías para comparación
        const contactCategory = (contact.category || '').toLowerCase();
        const targetCategory = mappedCategory.toLowerCase();

        console.log('Comparing:', { contactCategory, targetCategory }); // Debug

        // Verificar si la categoría del contacto coincide
        const matchesCategory = contactCategory.includes(targetCategory) || 
                              targetCategory.includes(contactCategory);

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