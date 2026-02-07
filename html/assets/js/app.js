class App {
    constructor() {
        // set up global properties
        

        this.buildComponents()
        this.initComponents()
    }

    buildComponents() {
        this.components = {
            'SwipeScroller': SwipeScroller,
            'MainNav' : MainNav
        }
    }

    initComponents() {
        document.querySelectorAll('[data-component]').forEach(element => {
            new this.components[element.dataset.component](element)	
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new App();
    // console.log('App initialized');
});