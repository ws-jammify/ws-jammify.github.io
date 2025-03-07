/**
 * Mobile Navigation Handler for Jammify
 * Provides consistent mobile navigation experience across all pages
 */

$(document).ready(function() {
    // Mobile menu toggle with enhanced animation
    $('#mobile-menu-button').click(function() {
        if ($('#mobile-menu').hasClass('hidden')) {
            // Open menu
            $('#mobile-menu').removeClass('hidden');
            $('#mobile-menu-backdrop').removeClass('hidden');
            $('body').addClass('overflow-hidden');
            
            // Animate in
            setTimeout(function() {
                $('#mobile-menu').removeClass('opacity-0 scale-y-95').addClass('opacity-100 scale-y-100');
            }, 10);
        } else {
            // Close menu
            $('#mobile-menu').removeClass('opacity-100 scale-y-100').addClass('opacity-0 scale-y-95');
            $('#mobile-menu-backdrop').addClass('hidden');
            $('body').removeClass('overflow-hidden');
            
            // Hide after animation completes
            setTimeout(function() {
                $('#mobile-menu').addClass('hidden');
            }, 300);
        }
    });
    
    // Close mobile menu when clicking backdrop
    $('#mobile-menu-backdrop').click(function() {
        $('#mobile-menu-button').click();
    });
    
    // Close mobile menu on window resize if screen becomes large
    $(window).resize(function() {
        if ($(window).width() >= 768) {
            $('#mobile-menu').addClass('hidden opacity-0 scale-y-95').removeClass('opacity-100 scale-y-100');
            $('#mobile-menu-backdrop').addClass('hidden');
            $('body').removeClass('overflow-hidden');
        }
    });
});
