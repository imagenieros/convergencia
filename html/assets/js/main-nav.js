class MainNav {
    constructor(element) {
        this.$el = element;
        this.$globalContainer = document.querySelector('.global-container');
        this.$navElements = this.$el.querySelectorAll('.js-icon-action')
        this.$contentElements = document.querySelectorAll('.js-content')
        this.$backButton = document.querySelector('.js-back')
        this.$bottomNavContainer = document.querySelector('.bottom-bar-container')

        this.bindEvents()
    }


    bindEvents() {
        this.$navElements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.hideDetails();
                this.showBackNav()
                this.showDetails(e.currentTarget.dataset.key);
                this.turnOnLed(e.currentTarget.dataset.pin, e.currentTarget.dataset.value);
                this.$globalContainer.classList.add('show-detail')
                window.resetSwiper()
            });
        });

        this.$backButton.addEventListener('click', () => {
            window.resetSwiper()
            this.$globalContainer.classList.remove('show-detail')
            this.showHomepageNav()
            this.demoMode()

            // add a bit of delay, waiting for transition
            setTimeout(() => {
                this.hideDetails()
            }, 500)
        })
    }


    // helper functions
    hideDetails() {
        this.$contentElements.forEach(element => {
            element.classList.add('hidden')
        });

        this.showHomepageNav()
    }


    showDetails(key) {
        this.$contentElements.forEach(element => {
            if(element.dataset.id === key) {
                element.classList.remove('hidden')
            }
        });
    }


    turnOnLed(pin, value) {        
        // turn on light
        fetch(`/serial.php?pin=${pin}&value=${value}`)
    }

    demoMode() {
        fetch(`/serial.php?pin=0&value=0`)
    }


    showHomepageNav() {
        this.$bottomNavContainer.classList.add('show-homepage')
        this.$bottomNavContainer.classList.remove('show-back')
    }


    showBackNav() {
        this.$bottomNavContainer.classList.remove('show-homepage')
        this.$bottomNavContainer.classList.add('show-back')
    }


}
