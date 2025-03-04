/**
 * Jammify Team Carousel and Modal Functions
 * Contains all functionality for the team carousel and member modals
 */

$(document).ready(function() {
    // Store team data globally for modal access
    let teamData = [];
    
    // Load team data from JSON
    $.getJSON("js/team.json", function(data) {
        teamData = data;
        
        // Generate grid items
        $.each(data, function(index, member) {
            // Create a shortened description (around 100 characters)
            let shortDescription = member.description.length > 100 
                ? member.description.substring(0, 100) + '...' 
                : member.description;
                
            $('#team-carousel').append(`
                <div class="team-card p-5 text-center" data-member-index="${index}">
                    <div class="mx-auto mb-4 relative">
                        <div class="member-image mx-auto">
                            <img src="${member['formal-image']}" alt="${member.name}" class="w-full h-full object-cover transition-transform duration-300">
                        </div>
                    </div>
                    <h3 class="text-lg font-bold mb-1">${member.name}</h3>
                    <p class="text-jammify-teal text-sm mb-3">${member.role}</p>
                    <p class="text-gray-300 text-xs mb-5">${shortDescription}</p>
                    <div class="social-icons flex justify-center space-x-3 mt-auto">
                        <a href="#" class="w-7 h-7 flex items-center justify-center rounded-full bg-[#152238]/70 text-jammify-teal hover:text-white hover:bg-jammify-teal/20 transition duration-300">
                            <i class="fab fa-facebook-f text-sm"></i>
                        </a>
                        <a href="#" class="w-7 h-7 flex items-center justify-center rounded-full bg-[#152238]/70 text-jammify-teal hover:text-white hover:bg-jammify-teal/20 transition duration-300">
                            <i class="fab fa-twitter text-sm"></i>
                        </a>
                        <a href="#" class="w-7 h-7 flex items-center justify-center rounded-full bg-[#152238]/70 text-jammify-teal hover:text-white hover:bg-jammify-teal/20 transition duration-300">
                            <i class="fab fa-instagram text-sm"></i>
                        </a>
                    </div>
                </div>
            `);
        });
        
        // Initialize Owl Carousel
        initTeamCarousel();
        
        // Add click event for team member cards
        $(document).on('click', '.team-card', function() {
            const memberIndex = $(this).data('member-index');
            showTeamMemberModal(teamData[memberIndex]);
        });
        
    }).fail(function() {
        // Fallback if JSON loading fails
        console.log("Could not load team data");
        
        // Display error message
        $('#team-carousel').html(`
            <div class="bg-[#152238]/70 backdrop-blur-sm rounded-xl border border-[#37E2D550] shadow-lg overflow-hidden p-8 text-center">
                <p class="text-gray-300">Sorry, we couldn't load the team information. Please try again later.</p>
            </div>
        `);
    });
});

/**
 * Initialize the team carousel with Owl Carousel
 */
function initTeamCarousel() {
    $('#team-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
            '<i class="fas fa-chevron-left"></i>',
            '<i class="fas fa-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
}

/**
 * Show team member modal with member details
 * @param {object} member - Team member data object
 */
function showTeamMemberModal(member) {
    // Create modal content based on screenshot reference
    $('#modal-content').html(`
        <div class="relative rounded-xl overflow-hidden bg-[#152238]/90 backdrop-blur-sm border border-[#37E2D550] shadow-xl">
            <button id="modal-close" class="absolute top-3 right-3 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-jammify-dark-blue rounded-full border border-jammify-teal/30 text-jammify-teal hover:text-white hover:border-jammify-teal hover:bg-jammify-dark-blue/90 transition-all duration-300 shadow-lg">
                <i class="fas fa-times"></i>
            </button>
            <!-- Cover Image -->
            <div class="cover-image w-full h-40 relative overflow-hidden">
                <img src="assets/images/cover-image.jpg" alt="Cover Image" class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-gradient-to-b from-[#00000020] via-[#00000060] to-[#152238] backdrop-blur-sm"></div>
            </div>
            
            <!-- Profile Image with Carousel -->
            <div class="absolute top-20 left-1/2 transform -translate-x-1/2">
                <div class="relative">
                    <div class="absolute inset-0 bg-jammify-teal/20 rounded-full blur-md"></div>
                    <div class="w-28 h-28 rounded-full border-2 border-jammify-teal/50 overflow-hidden profile-carousel-container relative">
                        <div class="member-photo-carousel owl-carousel owl-theme">
                            <div class="item">
                                <img src="${member['formal-image']}" alt="${member.name} - Formal" class="w-full h-full object-cover">
                            </div>
                            <div class="item">
                                <img src="${member['casual-image']}" alt="${member.name} - Casual 1" class="w-full h-full object-cover">
                            </div>
                            <div class="item">
                                <img src="${member['casual-image-2']}" alt="${member.name} - Casual 2" class="w-full h-full object-cover">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-dots-custom flex justify-center space-x-2 py-2 mt-1"></div>
            </div>
            
            <!-- Content Container -->
            <div class="pt-20 pb-6 px-6">
                <!-- Name and Role -->
                <div class="text-center mb-3">
                    <h2 class="text-xl font-bold">${member.name}</h2>
                    <p class="text-jammify-teal text-sm">${member.role}</p>
                </div>
                
                <!-- Social Icons -->
                <div class="flex justify-center space-x-3 mb-4">
                    <a href="#" class="text-jammify-teal hover:text-white transition duration-300 bg-[#152238] h-8 w-8 rounded-full flex items-center justify-center">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="text-jammify-teal hover:text-white transition duration-300 bg-[#152238] h-8 w-8 rounded-full flex items-center justify-center">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="text-jammify-teal hover:text-white transition duration-300 bg-[#152238] h-8 w-8 rounded-full flex items-center justify-center">
                        <i class="fab fa-instagram"></i>
                    </a>
                </div>
                
                <!-- Description -->
                <div class="text-sm text-gray-300 space-y-2">
                    <p class="member-description">${member.description}</p>
                    
                    <!-- Skills -->
                    <div class="mt-4">
                        <h3 class="text-sm font-semibold text-white mb-2 text-center">Skills</h3>
                        <div class="flex flex-wrap gap-2 justify-center">
                            ${member.skills ? member.skills.map(skill => `
                                <span class="bg-jammify-teal/20 text-jammify-teal px-2 py-1 rounded-full text-xs">${skill}</span>
                            `).join('') : '<span class="text-gray-400 text-xs">No skills listed</span>'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);
    
    // Show the modal with simple fade-in
    $('#team-modal').removeClass('hidden').addClass('visible');
    $('body').css('overflow', 'hidden'); // Prevent background scrolling
    
    // Initialize the photo carousel
    setTimeout(() => {
        initMemberPhotoCarousel();
    }, 100);
    
    // Setup close events
    setupModalCloseEvents();
}

/**
 * Initialize the photo carousel in the modal
 */
function initMemberPhotoCarousel() {
    $('.member-photo-carousel').owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        onInitialized: function(event) {
            // Create custom dots
            let dotsCount = event.item.count;
            $('.carousel-dots-custom').empty(); // Clear existing dots
            
            for (let i = 0; i < dotsCount; i++) {
                $('.carousel-dots-custom').append(`
                    <div class="dot ${i === 0 ? 'active' : ''}"></div>
                `);
            }
            
            // Add click events to dots
            $('.carousel-dots-custom .dot').on('click', function() {
                let index = $(this).index();
                $('.member-photo-carousel').trigger('to.owl.carousel', [index, 300]);
            });
        },
        onChanged: function(event) {
            // Update active dot
            let index = event.item.index % event.item.count;
            $('.carousel-dots-custom .dot').removeClass('active');
            $('.carousel-dots-custom .dot').eq(index).addClass('active');
        }
    });
}

/**
 * Set up modal close event handlers
 */
function setupModalCloseEvents() {
    // Close modal when clicking close button
    $('#modal-close').off('click').on('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the modal content
    $('.modal-backdrop').off('click').on('click', function() {
        closeModal();
    });
    
    // Close modal when clicking on the modal container
    $('#team-modal').off('click').on('click', function(e) {
        if (e.target.id === 'team-modal') {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    $(document).off('keydown.modalEscape').on('keydown.modalEscape', function(e) {
        if (e.key === 'Escape' && !$('#team-modal').hasClass('hidden')) {
            closeModal();
        }
    });
}

/**
 * Close the team member modal
 */
function closeModal() {
    // Simple fade out
    $('#team-modal').removeClass('visible');
    
    // Wait for animation to finish before hiding
    setTimeout(() => {
        $('#team-modal').addClass('hidden');
        $('body').css('overflow', 'auto'); // Re-enable scrolling
        
        // Remove document keydown event when modal is closed
        $(document).off('keydown.modalEscape');
    }, 300);
}
