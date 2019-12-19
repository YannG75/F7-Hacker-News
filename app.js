var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
        swipe: 'left',
    },
    // Add default routes
    routes: [
        {
            path: '/about/',
            content: `
      <div class="page">
        <div class="page-content">
          <div class="block">
            <p>This page created dynamically</p>
          </div>
        </div>
      </div>
    `,
        },
    ],
    // ... other parameters
});

var mainView = app.views.create('.view-main');