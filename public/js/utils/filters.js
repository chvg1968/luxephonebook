// filters.js

export function filterContacts(contacts, filters) {
    // Mapeo de categorías antiguas a nuevas
    const categoryMapping = {
        "Personal Chefs": "Personal Chefs and Catering",
        "Pre-Made Meals and Catering": "Personal Chefs and Catering",
        "Delivery Services and Personal Grocery Shopping": "Delivery Services",
        "Nanny Service": "Nanny Services"
    };

    return contacts.filter(contact => {
        // Si no hay filtros, mostrar todos los contactos
        if (!filters.category && !filters.section) {
            return true;
        }

        // Si solo hay sección, filtrar por sección
        if (filters.section && !filters.category) {
            return contact.section === filters.section;
        }

        // Si hay categoría y sección, filtrar por ambos
        if (filters.category && filters.section) {
            // Caso especial para Wellness Center que aparece en múltiples secciones
            if (filters.category === "Wellness Center") {
                return contact.category === filters.category && contact.section === filters.section;
            }

            // Normalizar la categoría del contacto usando el mapeo
            const normalizedCategory = categoryMapping[contact.category] || contact.category;
            
            // Filtrar usando la categoría normalizada
            return normalizedCategory === filters.category && contact.section === filters.section;
        }

        return false;
    });
}