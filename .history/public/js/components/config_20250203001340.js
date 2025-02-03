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
        "Personal Chefs": "🧑🏻‍🍳",
        "Pre-Made Meals and Catering": "🧑🏻‍🍳",
        "Delivery Services and Personal Grocery Shopping": "fa-shopping-cart",
        "Butler Services": "fa-user-tie",
        "Shopping": "fa-shopping-bag",
        "Places to Visit": "fa-map-marker-alt",
        
        // Subcategorías de Restaurant en Off Property
        "Near and Casual": "fa-shirt",
        "Carolina - 30 min West": "fa-map-marker-alt",
        "Fajardo - 30 min East": "fa-map-marker-alt", 
        "San Juan - 45 min West": "fa-map-marker-alt",
        "More variety": "fa-road",
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
                "Restaurants",
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
                "Food Delivery",
                "Concierge Services",
                "Grocery Shopping and Errands",
                "In Advance Delivery Services"
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
                        "Carolina - 30 min West", 
                        "Fajardo - 30 min East", 
                        "San Juan - 45 min West",
                    ]
                },
                {
                    name: "Shopping",
                    subcategories: [
                        "On the way from the airport (more variety)",
                        "Near Bahia Beach",
                        "Specialty Food, Wine and Liquors Stores",
                        "Shopping Malls",
                    ]
                }
            ]
        }
}; 
