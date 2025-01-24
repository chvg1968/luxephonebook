// filters.js
export function filterContacts(contacts, { searchTerm = '', category = '' }) {
    console.log('Filtering with:', { searchTerm, category }); // Debug
    console.log('Total contacts:', contacts.length); // Debug

    // Mapeo de categorías principales y sus subcategorías
    const categoryMap = {
        // Categorías principales
        'Emergency': ['Emergency'],
        'Golf Cart': ['Golf Cart'],
        'Resort Venues': ['Hotel', 'Spa', 'Wellness', 'Bar', 'Restaurant'],
        'Resort Activities': ['Scuba', 'Aqua', 'Tour', 'Activity', 'Tennis', 'Wellness', 'Concierge'],
        'Transportation': ['Transportation'],
        'Special Services': ['Nanny', 'Photography', 'Personal Care', 'Kids Club', 'Chef', 'Catering', 'Delivery', 'Butler', 'Concierge'],
        'Off Property': ['Tour', 'Shopping', 'Restaurant'],

        // Subcategorías individuales
        'Hotel': ['Hotel'],
        'Spa': ['Spa'],
        'Wellness Center': ['Wellness'],
        'Bar': ['Bar'],
        'Restaurant': ['Restaurant'],
        'Scuba Diving Tours': ['Scuba'],
        'Aqua Tours': ['Aqua'],
        'Tours': ['Tour'],
        'Activities Reservations': ['Activity'],
        'Tennis Reservations': ['Tennis'],
        'Concierge': ['Concierge'],
        'Nanny Services': ['Nanny'],
        'Professional Photography': ['Photography'],
        'Personal Care and Fitness': ['Personal Care'],
        "Kid's Club": ['Kids Club'],
        'Personal Chefs': ['Chef'],
        'Pre-Made Meals and Catering': ['Catering'],
        'Delivery Services': ['Delivery'],
        'Butler Services': ['Butler'],
        'Concierge Services': ['Concierge'],
        'Shopping': ['Shopping']
    };

    return contacts.filter(contact => {
        // Si no hay categoría seleccionada, mostrar todos los contactos
        if (!category) return true;

        // Obtener las categorías mapeadas
        const mappedCategories = categoryMap[category];
        if (!mappedCategories) {
            console.log('No mapping found for category:', category);
            return false;
        }

        // Normalizar la categoría del contacto
        const contactCategory = (contact.category || '').toLowerCase();

        // Verificar si la categoría del contacto coincide con alguna de las categorías mapeadas
        const matchesCategory = mappedCategories.some(mappedCat => 
            contactCategory.includes(mappedCat.toLowerCase())
        );

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