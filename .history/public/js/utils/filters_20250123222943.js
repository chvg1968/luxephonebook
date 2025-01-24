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
        let matchesCategory = true;
        let matchesSearch = true;

        // Verificar la categoría si está presente
        if (category) {
            const mappedCategories = categoryMap[category];
            if (!mappedCategories) {
                console.log('No mapping found for category:', category);
                return false;
            }

            const contactCategory = (contact.category || '').toLowerCase();
            matchesCategory = mappedCategories.some(mappedCat => 
                contactCategory.includes(mappedCat.toLowerCase())
            );
        }

        // Verificar el término de búsqueda si está presente
        if (searchTerm) {
            const searchFields = [
                contact.name,
                contact.description,
                contact.phone
            ].filter(Boolean);

            const term = searchTerm.toLowerCase().trim();
            matchesSearch = searchFields.some(field => 
                field?.toString().toLowerCase().includes(term)
            );
        }

        // Si no hay categoría ni término de búsqueda, no mostrar nada
        if (!category && !searchTerm) {
            return false;
        }

        // El contacto debe coincidir con la categoría (si hay una seleccionada)
        // Y con el término de búsqueda (si hay uno)
        return (category ? matchesCategory : true) && (searchTerm ? matchesSearch : true);
    });
}