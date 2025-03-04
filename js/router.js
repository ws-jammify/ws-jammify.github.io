// Simple SPA Router for Jammify
const Router = {
  // Current route
  currentRoute: '/',
  
  // Routes object
  routes: {},
  
  // Initialize the router
  init: function(routes) {
    this.routes = routes;
    
    // Handle initial load
    window.addEventListener('load', () => {
      this.handleRouteChange();
    });
    
    // Handle popstate events (back/forward browser buttons)
    window.addEventListener('popstate', () => {
      this.handleRouteChange();
    });
    
    // Intercept all links for SPA navigation
    document.addEventListener('click', (e) => {
      // Only process link clicks
      if (e.target.tagName === 'A' && e.target.getAttribute('href')) {
        const href = e.target.getAttribute('href');
        
        // Skip external links or hash links
        if (href.startsWith('http') || href.startsWith('#')) {
          return;
        }
        
        // Prevent default navigation
        e.preventDefault();
        
        // Navigate to the link
        this.navigate(href);
      }
    });
  },
  
  // Handle route changes
  handleRouteChange: function() {
    const path = window.location.pathname || '/';
    this.currentRoute = path;
    
    // Call the route handler if it exists
    if (this.routes[path]) {
      this.routes[path]();
    } else {
      // Handle 404 if no route matches
      console.log(`No route found for ${path}`);
      if (this.routes['404']) {
        this.routes['404']();
      }
    }
  },
  
  // Navigate to a specific route
  navigate: function(path) {
    // Update URL without page reload
    window.history.pushState({}, "", path);
    
    // Handle the new route
    this.handleRouteChange();
  }
};