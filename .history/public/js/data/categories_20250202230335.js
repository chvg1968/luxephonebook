export const categories = {
    'Medical and Security Emergencies': {
        id: 'Medical and Security Emergencies',
        name: 'Medical and Security Emergencies',
        icon: 'fas fa-kit-medical'
    },

    'Unit’s Golf Cart':{
        id: 'Unit’s Golf Cart',
        name: 'Unit’s Golf Cart',
        icon: 'fas fa-golf-cart'
    },

    'Resort Restaurants and Venues': {
        id: 'Resort Restaurants and Venues',
        name: 'Resort Restaurants and Venues',
        icon: 'fas fa-hotel',
        subcategories: {
            hotel: {
                id: 'Hotel',
                name: 'Hotel',
                icon: 'fas fa-hotel'
            },
            spa: {
                id: 'Spa',
                name: 'Spa',
                icon: 'fas fa-spa'
            },
            wellnessCenter: {
                id: 'Wellness Center',
                name: 'Wellness Center',
                icon: 'fas fa-heart'
            },
            bar: {
                id: 'Bar',
                name: 'Bar',
                icon: 'fas fa-glass-martini-alt'
            },
            restaurant: {
                id: 'Restaurant',
                name: 'Restaurant',
                icon: 'fas fa-utensils'
            },
            pool: {
                id: 'Pool',
                name:'Pool',
                icon: 'fas fa-person-swimming'
            },
            beach: {    
                id: 'Beach',
                name: 'Beach',
                icon: 'fas fa-umbrella-beach'
            },
        },
    },
    resortActivities: {
        id: 'Resort Activities and Adventures',
        name: 'Resort Activities and Adventures',
        icon: 'fas fa-umbrella-beach',
        subcategories: {
            golf: {
                id: 'Golf',
                name: 'Golf',
                icon: 'fas fa-golf-ball'
            },
            scubaDiving: {
                id: 'Scuba Diving Tours',
                name: 'Scuba Diving Tours',
                icon: 'fas fa-water'
            },
            aquaTours: {
                id: 'Aqua Tours',
                name: 'Aqua Tours',
                icon: 'fas fa-ship'
            },
            tours: {
                id: 'Tours',
                name: 'Tours',
                icon: 'fas fa-map-marked-alt'
            },
            activities: {
                id: 'Activities Reservations',
                name: 'Activities Reservations',
                icon: 'fas fa-calendar-check'
            },
            tennis: {
                id: 'Tennis',
                name: 'Tennis',
                icon: 'fas fa-tennis-ball'
            },
            wellness: {
                id: 'Wellness Center',
                name: 'Wellness Center',
                icon: 'fas fa-heart-pulse'
            },
            concierge: {
                id: 'Concierge',
                name: 'Concierge',
                icon: 'fas fa-concierge-bell'
            }
        }
    },
    transportation: {
        id: 'Transportation/Transfer',
        name: 'Transportation/Transfer',
        icon: 'fas fa-car',
        subcategories: {
            transport: {
                id: 'Transportation',
                name: 'Transportation',
                icon: 'fas fa-car'
            }
        }
    },
    specialServices: {
        id: 'Catering/Delivery/Special Services',
        name: 'Catering/Delivery/Special Services',
        icon: 'fas fa-concierge-bell',
        subcategories: {
            nanny: {
                id: 'Nanny Services',
                name: 'Nanny Services',
                icon: 'fas fa-baby'
            },
            photography: {
                id: 'Professional Photography',
                name: 'Professional Photography',
                icon: 'fas fa-camera'
            },
            personalCare: {
                id: 'Personal Care and Fitness',
                name: 'Personal Care and Fitness',
                icon: 'fas fa-heart'
            },
            kidsClub: {
                id: 'Kid\'s Club',
                name: 'Kid\'s Club',
                icon: 'fas fa-child'
            },
            chefs: {
                id: 'Personal Chefs',
                name: 'Personal Chefs',
                icon: 'fas fa-utensils'
            },
            catering: {
                id: 'Pre-Made Meals and Catering',
                name: 'Pre-Made Meals and Catering',
                icon: 'fas fa-hamburger'
            },
            delivery: {
                id: 'Delivery Services and Personal Grocery Shopping',
                name: 'Delivery Services and Personal Grocery Shopping',
                icon: 'fas fa-shopping-cart'
            },
            butler: {
                id: 'Butler Services',
                name: 'Butler Services',
                icon: 'fas fa-user-tie'
            },
            concierge: {
                id: 'Concierge Services',
                name: 'Concierge Services',
                icon: 'fas fa-concierge-bell'
            }
        }
    },
    offProperty: {
        id: 'Off Property Restaurants and Shopping',
        name: 'Off Property Restaurants and Shopping',
        icon: 'fas fa-map-marker-alt',
        subcategories: {
            placesToVisit: {    
                id: 'Places to Visit',
                name: 'Places to Visit',
                icon: 'fas fa-map'
            },
            restaurants: {
                id: 'Restaurants',
                name: 'Restaurants',
                icon: 'fas fa-utensils',
                subcategories: {
                    nearCasual: {
                        id: 'Near and Casual',
                        name: 'Near and Casual',
                        icon: 'fas fa-shirt'
                    },
                    thirtyMinWest: {
                        id: 'Carolina - 30 min West',
                        name: 'Carolina - 30 min West',
                        icon: 'fas fa-map-marker-alt'
                    },
                    thirtyMinEast: {
                        id: 'Fajardo - 30 min East',
                        name: 'Fajardo - 30 min East',
                        icon: 'fas fa-map-marker-alt'
                    },
                    fortyFiveMinWest: {
                        id: 'San Juan - 45 min West',
                        name: 'San Juan - 45 min West',
                        icon: 'fas fa-map-marker-alt'
                    }
                }
            },
            shopping: {
                id: 'Shopping',
                name: 'Shopping',
                icon: 'fas fa-shopping-bag',
                subcategories: {
                    airportRoute: {
                        id: 'On the way from the airport (more variety)',
                        name: 'On the way from the airport (more variety)',
                        icon: 'fas fa-road'
                    },
                    nearBahiaBeach: {
                        id: 'Near Bahia Beach',
                        name: 'Near Bahia Beach',
                        icon: 'fas fa-umbrella-beach'
                    },
                    specialtyFoodWineandLiquors: {
                        id: 'Specialty Food, Wine and Liquors Stores',
                        name: 'Specialty Food, Wine and Liquors Stores',
                        icon: 'fas fa-shopping-basket'
                    },
                    shoppingMalls: {
                        id: 'Shopping Malls',
                        name: 'Shopping Malls',
                        icon: 'fas fa-store'
                    }
                }
            }
        }
    },
}
