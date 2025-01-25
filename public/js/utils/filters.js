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
        let matchesSearch = true;
        let matchesCategory = true;

        // Aplicar filtro de búsqueda si existe
        if (filters.searchTerm) {
            const searchTerm = filters.searchTerm.toLowerCase();
            const name = contact.name.toLowerCase();
            const category = contact.category.toLowerCase();
            const description = (contact.description || '').toLowerCase();

            matchesSearch = name.includes(searchTerm) || 
                          category.includes(searchTerm) || 
                          description.includes(searchTerm);
        }

        // Aplicar filtros de categoría y sección si existen
        if (filters.category && filters.section) {
            const normalizedCategory = categoryMapping[contact.category] || contact.category;
            matchesCategory = normalizedCategory === filters.category && 
                            contact.section === filters.section;
        }
        // Si solo hay sección (Emergency o Golf Cart)
        else if (filters.section && !filters.category) {
            matchesCategory = contact.section === filters.section;
        }

        return matchesSearch && matchesCategory;
    });
}