// config.js
export const icons = {
    // Tu mapeo completo de iconos
        // Secciones principales
        "Medical and Security Emergencies": "fa-kit-medical",
        "Golf": "fa-golf-ball",
        "Unit's Golf Cart":"fa-car",
        "Resort Restaurants and Venues": "fa-utensils",
        "Resort Activities and Adventures": "fa-umbrella-beach",
        "Transportation/Transfer": "fa-taxi",
        "Catering/Delivery/Special Services": "fa-concierge-bell",
        "Off Property Restaurants and Shopping": "fa-map-location-dot",
        
        // Categorías
        "Hotel": "fa-hotel",
        "Spa": "fa-spa",
        "Pool":"fa-person-swimming",
        "Beach": "fa-umbrella-beach",
        "Wellness center": "fa-heart-pulse",
        "Bar": "fa-martini-glass",
        "Restaurants": "fa-utensils",
        "Golf":"fa-golf-ball",
        "Off Property Restaurant": "fa-store",
        "Scuba Diving Tours": "fa-water",
        "Aqua Tours": "fa-ship",
        "Tours": "fa-route",
        "Activities Reservations": "fa-calendar-check",
        "Tennis": "fa-table-tennis",
        "Wellness Center": "fa-heart-pulse",
        "Concierge": "fa-bell-concierge",
        "Concierge Services": "fa-bell-concierge",
        "Transportation": "fa-taxi",
        "Nanny Services": "fa-baby",
        "Professional Photography": "fa-camera",
        "Personal Care and Fitness": "fa-hand-sparkles",
        "Kid's Club": "fa-child",
        "Personal Chefs": "fa-hat-chef",
        "Pre-Made Meals and Catering": "fa-plate-wheat",
        "Delivery Services and Personal Grocery Shopping": "fa-shopping-cart",
        "Butler Services": "fa-user-tie",
        "Shopping": "fa-shopping-bag",
        
        // Subcategorías de Restaurant en Off Property
        "Near and Casual": "fa-shirt",
        "30 min West (Carolina)": "fa-map-marker-alt",
        "30 min East (Fajardo)": "fa-map-marker-alt", 
        "45 min West (San Juan)": "fa-map-marker-alt",
        "On the way from the airport (more variety)": "fa-road",
        "Near Bahia Beach": "fa-umbrella-beach",
        "Specialty Food, Wine and Liquors Stores": "fa-shopping-basket",
        "Shopping Malls": "fa-store"
    };


export const modalSectionMap = {
    'golf-cart-modal': {
        section: 'Golf',
        category: 'Golf Cart'
    },
    'golf-rates-modal': {
        section: 'Golf',
        category: 'Golf Schedule and Rates'
    },
    'emergency-modal': {
        section: 'Emergency',
        category: null
    },
    'restaurant-modal': {
        section: 'Resort Restaurants and Venues',
        category: 'Restaurants'
    },
    'kids-club-modal': {
        section: 'Resort Activities and Adventures',
        category: "Kid's Club"
    },
    'tennis-modal': {
        section: 'Resort Activities and Adventures',
        category: 'Tennis Reservations'
    },
    'catering-modal': {
        section: 'Catering/Delivery/Special Services',
        category: null
    },
    'off-property-modal': {
        section: 'Off Property',
        category: null
    }
};

export const sections = { 
        "Medical and Security Emergencies": {
            isSpecial: true,
            categories: []
        },
        "Resort Restaurants and Venues": {
            isSpecial: false,
            categories: [
                "Restaurant",
                "Bar",
                "Hotel",
                "Pool", 
                "Beach",
                "Spa",
                "Wellness Center"
            ]
        },
        "Unit's Golf Cart":{
            isSpecial: false,
            categories: [],
            openModal: true
        },
        "Resort Activities and Adventures": {
            isSpecial: false,
            categories: [
                "Golf",
                "Nature and Wildlife",
                "Tennis",
                "Water Park and Water Sports",  
                "Wellness Center"
            ]
        },
        "Off Property Transportation and Airport Transfers": {
            isSpecial: false,
            categories: [
                "Scuba Diving Tours",
                "Aqua Tours",
                "Tours", 
                "Transportation"
            ]
        },
        "Catering/Delivery/Special Services": {
            isSpecial: false,
            categories: [
                "Nanny Services",
                "Professional Photography",
                "Personal Care and Fitness",
                "Kid's Club",
                "Personal Chefs, Catering and Pre-Made Meals",
                "Butler Services",
                "Concierge Services",
                "Delivery Services"
            ]
        },
        "Off Property Restaurants and Shopping": {
            isSpecial: false,
            categories: [
                {
                    name: "Places to Visit",
                    categories: []
                },
                {
                    name: "Restaurants",
                    subcategories: [
                        "Near and Casual",
                        "30 min West (Carolina)", 
                        "30 min East (Fajardo)", 
                        "45 min West (San Juan)",
                    ]
                },
                {
                    name: "Shopping",
                    subcategories: [
                        "On the way from the airport (more variety)",
                        "Specialty Food, Wine and Liquors Stores",
                        "Shopping Malls",
                    ]
                }
            ]
        }
}; 
