export const categories = {
    emergency: {
        id: 'Emergency Services',
        name: 'Emergency Services',
        icon: 'fas fa-exclamation-circle',
        subcategories: {
            medical: {
                id: 'Medical',
                name: 'Medical Services',
                icon: 'fas fa-user-md'
            },
            security: {
                id: 'Security',
                name: 'Security',
                icon: 'fas fa-shield-alt'
            },
            reception: {
                id: 'Reception',
                name: 'Reception',
                icon: 'fas fa-concierge-bell'
            }
        }
    },
    resort: {
        id: 'Resort Venues',
        name: 'Resort Venues',
        icon: 'fas fa-umbrella-beach',
        subcategories: {
            sports: {
                id: 'Sports',
                name: 'Sports',
                icon: 'fas fa-volleyball-ball',
                subcategories: {
                    golf: {
                        id: 'Golf',
                        name: 'Golf',
                        icon: 'fas fa-golf-ball'
                    },
                    tennis: {
                        id: 'Tennis',
                        name: 'Tennis',
                        icon: 'fas fa-table-tennis'
                    }
                }
            },
            dining: {
                id: 'Restaurant',
                name: 'Dining',
                icon: 'fas fa-utensils',
                subcategories: {
                    restaurants: {
                        id: 'Restaurant',
                        name: 'Restaurants',
                        icon: 'fas fa-hamburger'
                    },
                    bars: {
                        id: 'Bar',
                        name: 'Bars & Lounges',
                        icon: 'fas fa-glass-martini-alt'
                    },
                    cafe: {
                        id: 'Cafe',
                        name: 'Cafes',
                        icon: 'fas fa-coffee'
                    }
                }
            },
            facilities: {
                id: 'Facilities',
                name: 'Facilities',
                icon: 'fas fa-building',
                subcategories: {
                    pools: {
                        id: 'Pools',
                        name: 'Pools',
                        icon: 'fas fa-swimming-pool'
                    },
                    beaches: {
                        id: 'Beaches',
                        name: 'Beaches',
                        icon: 'fas fa-umbrella-beach'
                    }
                }
            }
        }
    },
    activities: {
        id: 'Activities',
        name: 'Activities',
        icon: 'fas fa-hiking',
        subcategories: {
            waterSports: {
                id: 'Water Sports',
                name: 'Water Sports',
                icon: 'fas fa-water'
            },
            boatTours: {
                id: 'Boat Tours',
                name: 'Boat Tours',
                icon: 'fas fa-ship'
            }
        }
    },
    wellness: {
        id: 'Wellness',
        name: 'Wellness',
        icon: 'fas fa-spa',
        subcategories: {
            spa: {
                id: 'Spa',
                name: 'Spa Services',
                icon: 'fas fa-hot-tub'
            },
            fitness: {
                id: 'Fitness',
                name: 'Fitness',
                icon: 'fas fa-dumbbell'
            },
            yoga: {
                id: 'Yoga',
                name: 'Yoga',
                icon: 'fas fa-pray'
            }
        }
    },
    personalServices: {
        id: 'Personal Services',
        name: 'Personal Services',
        icon: 'fas fa-concierge-bell',
        subcategories: {
            chefs: {
                id: 'Personal Chef',
                name: 'Personal Chefs',
                icon: 'fas fa-utensils'
            },
            photography: {
                id: 'Photography',
                name: 'Photography',
                icon: 'fas fa-camera'
            }
        }
    },
    beauty: {
        id: 'Beauty',
        name: 'Beauty',
        icon: 'fas fa-spa',
        subcategories: {
            beauty: {
                id: 'Beauty',
                name: 'Beauty Services',
                icon: 'fas fa-magic'
            },
            massage: {
                id: 'Massage',
                name: 'Massage',
                icon: 'fas fa-hands'
            }
        }
    },
    tours: {
        id: 'Tours',
        name: 'Tours',
        icon: 'fas fa-map-marked-alt',
        subcategories: {
            general: {
                id: 'Tours',
                name: 'General Tours',
                icon: 'fas fa-map'
            },
            food: {
                id: 'Food Tours',
                name: 'Food Tours',
                icon: 'fas fa-utensils'
            },
            adventure: {
                id: 'Adventure',
                name: 'Adventure Tours',
                icon: 'fas fa-hiking'
            }
        }
    },
    transportation: {
        id: 'Transportation',
        name: 'Transportation',
        icon: 'fas fa-taxi'
    },
    childcare: {
        id: 'Childcare',
        name: 'Childcare',
        icon: 'fas fa-baby',
        subcategories: {
            nanny: {
                id: 'Childcare',
                name: 'Nanny Services',
                icon: 'fas fa-child'
            }
        }
    },
    hotelServices: {
        id: 'Hotel Services',
        name: 'Hotel Services',
        icon: 'fas fa-hotel',
        subcategories: {
            stRegis: {
                id: 'St. Regis Hotel',
                name: 'St. Regis',
                icon: 'fas fa-star'
            }
        }
    }
};
