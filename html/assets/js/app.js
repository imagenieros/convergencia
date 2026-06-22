class App {
    constructor() {
        this.inactivityTimeoutMs = 5 * 60 * 1000;
        this.inactivityTimer = null;
        this.countdownInterval = null;
        this.inactivityDeadline = null;
        this.mainNav = null;
        this.$attractMode = document.querySelector('.js-attract-mode');
        this.$attractVideo = document.querySelector('.js-attract-video');
        this.$topBarTimer = document.querySelector('.js-top-bar-timer');

        this.buildComponents()
        this.initComponents()
        this.hideAttractMode()
        this.bindEvents()
        this.startCountdown()
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

        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key.toLowerCase() === 'l') {
                event.preventDefault();
                this.showAttractMode();
            }
        });

        this.$attractMode.addEventListener('click', () => {
            this.hideAttractMode();
            this.resetInactivityTimer();
        });
    }

    resetInactivityTimer() {
        window.clearTimeout(this.inactivityTimer);
        this.inactivityDeadline = Date.now() + this.inactivityTimeoutMs;
        this.updateCountdown();
        this.inactivityTimer = window.setTimeout(() => {
            this.showAttractMode();
        }, this.inactivityTimeoutMs);
    }

    isAttractModeVisible() {
        return this.$attractMode.classList.contains('is-visible');
    }

    showAttractMode() {
        this.mainNav.goHome({ immediate: true });
        window.clearTimeout(this.inactivityTimer);
        this.inactivityDeadline = null;
        this.updateCountdown(0);
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

    startCountdown() {
        this.updateCountdown(this.inactivityTimeoutMs);
        this.countdownInterval = window.setInterval(() => {
            if (!this.inactivityDeadline) return;

            const remainingMs = Math.max(0, this.inactivityDeadline - Date.now());
            this.updateCountdown(remainingMs);
        }, 250);
    }

    updateCountdown(remainingOverrideMs = null) {
        const remainingMs = remainingOverrideMs ?? Math.max(0, (this.inactivityDeadline ?? Date.now()) - Date.now());
        const totalSeconds = Math.ceil(remainingMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        this.$topBarTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    // console.log('App initialized');
});
