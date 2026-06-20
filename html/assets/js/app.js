class App {
    constructor() {
        this.inactivityTimeoutMs = 5 * 60 * 1000;
        this.inactivityTimer = null;
        this.mainNav = null;
        this.$attractMode = document.querySelector('.js-attract-mode');
        this.$attractVideo = document.querySelector('.js-attract-video');

        this.buildComponents()
        this.initComponents()
        this.hideAttractMode()
        this.bindEvents()
        this.resetInactivityTimer()
    }

    buildComponents() {
        this.components = {
            'SwipeScroller': SwipeScroller,
            'MainNav' : MainNav
        }
    }

    initComponents() {
        document.querySelectorAll('[data-component]').forEach(element => {
            const componentName = element.dataset.component;
            const instance = new this.components[componentName](element);

            if (componentName === 'MainNav') {
                this.mainNav = instance;
            }
        });
    }

    bindEvents() {
        const activityEvents = ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart'];

        activityEvents.forEach(eventName => {
            document.addEventListener(eventName, () => {
                if (this.isAttractModeVisible()) return;

                this.resetInactivityTimer();
            }, { passive: true });
        });

        this.$attractMode.addEventListener('click', () => {
            this.hideAttractMode();
            this.resetInactivityTimer();
        });
    }

    resetInactivityTimer() {
        window.clearTimeout(this.inactivityTimer);
        this.inactivityTimer = window.setTimeout(() => {
            this.showAttractMode();
        }, this.inactivityTimeoutMs);
    }

    isAttractModeVisible() {
        return this.$attractMode.classList.contains('is-visible');
    }

    showAttractMode() {
        this.mainNav.goHome({ immediate: true });
        this.$attractMode.hidden = false;
        this.$attractMode.classList.add('is-visible');
        this.$attractVideo.currentTime = 0;
        this.$attractVideo.play().catch(() => {});
    }

    hideAttractMode() {
        this.$attractMode.classList.remove('is-visible');
        this.$attractVideo.pause();
        this.$attractVideo.currentTime = 0;
        this.$attractMode.hidden = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    // console.log('App initialized');
});
