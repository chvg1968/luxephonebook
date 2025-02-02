// filters.js

export function filterContacts(contacts, filters) {
    // Mapeo de categorías antiguas a nuevas
    const categoryMapping = {
        "Personal Chefs": "Personal Chefs and Catering",
        "Pre-Made Meals and Catering": "Personal Chefs and Catering",
        "Delivery Services and Personal Grocery Shopping": "Delivery Services",
        "Nanny Service": "Nanny Services",
        "Restaurant": "Restaurants",
        "Personal Chefs, Catering and Pre-Made Meals": "Personal Chefs and Catering",
        "Restaurants": "Restaurants"
    };

    // Mapeo de secciones
    const sectionMapping = {
        "Resort Restaurants and Venues": "Resort Restaurants and Venues"
    };

    // Función de normalización
    const normalizeString = (str) => {
        return str ? str.trim().toLowerCase() : '';
    };

    // Registro de depuración
    console.log('Filtering contacts with:', {
        contacts: contacts.length,
        filters: filters
    });

    return contacts.filter(contact => {
        let matchesSearch = true;
        let matchesCategory = true;

        // Normalizar sección y categoría del contacto
        const normalizedContactSection = normalizeString(
            sectionMapping[contact.section] || contact.section
        );
        const normalizedContactCategory = normalizeString(
            categoryMapping[contact.category] || contact.category
        );

        // Normalizar filtros
        const normalizedFilterSection = normalizeString(
            sectionMapping[filters.section] || filters.section
        );
        const normalizedFilterCategory = normalizeString(
            categoryMapping[filters.category] || filters.category
        );

        // Aplicar filtro de búsqueda si existe
        if (filters.searchTerm) {
            const searchTerm = normalizeString(filters.searchTerm);
            const name = normalizeString(contact.name);
            const category = normalizedContactCategory;
            const description = normalizeString(contact.description || '');

            matchesSearch = name.includes(searchTerm) || 
                          category.includes(searchTerm) || 
                          description.includes(searchTerm);
        }

        // Aplicar filtros de categoría y sección
        if (filters.section && filters.category) {
            // Flexibilizar la comparación para restaurantes
            const isRestaurantCategory = 
                normalizedFilterCategory === 'restaurant' || 
                normalizedFilterCategory === 'resort restaurant';
            
            const isResortRestaurantSection = 
                normalizedContactSection.includes('resort restaurants') && 
                normalizedContactCategory.includes('restaurant');

            matchesCategory = (
                (normalizedContactSection === normalizedFilterSection && 
                 normalizedContactCategory === normalizedFilterCategory) ||
                (isRestaurantCategory && isResortRestaurantSection)
            );
        }
        // Si solo hay sección
        else if (filters.section && !filters.category) {
            matchesCategory = normalizedContactSection === normalizedFilterSection;
        }
        // Si solo hay categoría
        else if (filters.category && !filters.section) {
            matchesCategory = normalizedContactCategory === normalizedFilterCategory;
        }

        // Registro de depuración para cada contacto
        console.log('Contact filter details:', {
            contact: contact.name,
            contactSection: normalizedContactSection,
            contactCategory: normalizedContactCategory,
            filterSection: normalizedFilterSection,
            filterCategory: normalizedFilterCategory,
            matchesSearch,
            matchesCategory
        });

        return matchesSearch && matchesCategory;
    });