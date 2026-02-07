class SwipeScroller {
    constructor(element) {
        window.scrollTo(0,0)
        this.$el = element;
        this.$track = this.$el.querySelector('.track');
        this.$debugContainer = document.querySelector('.js-debug');

        this.isSliding = false;
        this.dragging = false
        this.position = 0;
        this.velocity = 0;
        this.desceleration = 1
        this.extraSpacePercent = window.innerHeight * .37 // 37% extra space
        this.scrollEnabled = false

        // Wait for images to load to ensure accurate maxHeight calculation
        window.addEventListener('load', () => {
            this.maxHeight = -(this.$el.clientHeight - window.innerHeight) - this.extraSpacePercent; 
            this.scrollEnabled = (this.$el.clientHeight + this.extraSpacePercent) > window.innerHeight;
            this.bindEvents();
            this.animate();
        });

        // timeout events binding to ensure DOM is fully ready
        setTimeout(() => {
            // reset scroll position to top
            this.resetScroll();
        }, 100);

        window.resetSwiper = this.resetSwiper.bind(this)
    }

    resetSwiper() {
        this.isSliding = false;
        this.dragging = false
        this.position = 0;
        this.velocity = 0;

        this.maxHeight = -(this.$el.clientHeight - window.innerHeight) - this.extraSpacePercent;
        this.scrollEnabled = (this.$el.clientHeight + this.extraSpacePercent) > window.innerHeight;
        this.resetScroll();
    }

    bindEvents() {
        const onDown = (e) => {
            e.preventDefault(); // Evita comportamientos predeterminados
            this.dragging = true;
            this.velocity = this.velocity > 0 ? 1 : -1; // set velocity to 1 or -1 based on current value

            this.startX = this.getEventX(e);
            this.lastX = this.startX;
        };

        const onMove = (e) => {
            if (!this.dragging) return;

            const x = this.getEventX(e);
            const dx = x - this.lastX;
            this.lastX = x;
            this.velocity = dx;
        };

        const onUp = () => {
            this.dragging = false;
        };

        // Mouse
        this.$el.addEventListener('mousedown', onDown);
        document.addEventListener('mousemove', onMove); // Cambiado de window a document
        document.addEventListener('mouseup', onUp); // Cambiado de window a document

        // Touch
        this.$el.addEventListener('touchstart', onDown, { passive: false });
        document.addEventListener('touchmove', onMove, { passive: false }); // Cambiado de window a document
        document.addEventListener('touchend', onUp); // Cambiado de window a document

        // Update this.maxHeight on resize window
        window.addEventListener('resize', () => {
            this.resetScroll();
            this.extraSpacePercent = window.innerHeight * .37 // 37% extra space
            this.maxHeight = -(this.$el.clientHeight - window.innerHeight) - this.extraSpacePercent;
        });
    }

    getEventX(e) {
        return e.touches ? e.touches[0].clientY : e.clientY;
    }

    resetScroll() {
        this.position = 0;   
        this.setTransform(this.position);
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        }); 
    }

    setTransform(position) {
        this.$track.style.transform = `translateY(${position}px)`;
    }

    update() {
        if(this.velocity > 0) {
            this.isSliding = true;
            this.velocity -= this.desceleration;

            if(this.velocity < 0) this.velocity = 0;
        } 

        if(this.velocity < 0) {
            this.isSliding = true
            this.velocity += this.desceleration;
            if(this.velocity > 0) this.velocity = 0;
        } 

        if ( this.velocity === 0 ) {
            this.isSliding = false;
        }

        this.position += this.velocity;
        
        if (this.position < this.maxHeight) {
            this.position = this.maxHeight;
        } else if (this.position > 0) {
            this.position = 0;
        }

        this.scrollEnabled && this.setTransform(this.position);

        // debug
        if(this.$debugContainer) {
            this.$debugContainer.innerHTML = `
            Position: ${this.position}<br />
            Max Height: ${this.maxHeight}<br />
            Window innerHeight: ${window.innerHeight}<br />
            height container: ${this.$el.clientHeight}<br />
            extra space: ${this.extraSpacePercent}<br />
            `
        }
        
    }

    animate() {
        this.update()
        requestAnimationFrame(this.animate.bind(this))
    }

}
