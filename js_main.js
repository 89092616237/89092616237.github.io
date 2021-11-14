'use strict';

Vue.component('PageHeader', {
    data() {
        return {
            text: '',
            visibleSearch: false,
            visibleNav: false,
            visibleMailBox: false,
            pageOnTheTop: Boolean,
            fullLayout: true,
            extendedMenu: false,
            testIsVisible: false
        }
    },
    methods: {
        clickOutsideNavMenu(e){
            let nav = document.getElementById('nav'),
                targetEl = e.target;

            do {
                if (targetEl === nav) {
                    return;
                }
                targetEl = targetEl.parentNode;
            } while (targetEl);

            this.visibleNav = false;
            document.documentElement.classList.remove('ovh');
        },
        navMenuToggle(){
            this.visibleNav = !this.visibleNav;
        },
        navSubmit() {
            window.location='form/'+this.text.split('kpmi.ru/form/').pop();
        },
        showSearch(){
            this.visibleSearch = true;
            this.$refs.search.focus();
        },
        showProcessSection(){
            let section = document.getElementById('processSection'),
                sectionOffsetTop = section.getBoundingClientRect().top;

            if(sectionOffsetTop < 0.5*window.innerHeight){
                section.classList.add('is-active');
            }
        },
        scrollEndHandling(){
            this.pageOnTheTop = window.pageYOffset === 0;
            this.testIsVisible = window.pageYOffset > window.innerHeight - 100;
            this.showProcessSection();

            let isScrolling;
            window.addEventListener('scroll', (event) => {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(() => {
                    this.pageOnTheTop = window.pageYOffset === 0;
                    this.visibleSearch = false;
                    this.testIsVisible = window.pageYOffset > window.innerHeight - 100;

                    this.showProcessSection();
                }, 5);
            }, false);
        },
        startForm: function() {
            axios.post('/form/start/kpmi')
                .then(ans => {
                    window.location = '/form/'+ans.data.data;
                })
        }
    },
    mounted() {
        this.scrollEndHandling();
        document.addEventListener('click', (e) => this.clickOutsideNavMenu(e));
    }
});

new Vue({
    el: '#index',
    data: function() {
        return {
            changeSkinsTime: 3000,
            flkty: Object,
            formId: null,
            hiddenIntro: false,
        }
    },
    delimiters: ['[[',']]'],
    methods: {
        goToForm: function() {
            window.location = '/form/'+this.formId;
        },
        startForm: function() {
            axios.post('/form/start/kpmi')
                .then(ans => {
                    window.location = '/form/'+ans.data.data;
                })
        },
        scrollHandling(){
            this.hiddenIntro = window.pageYOffset > window.innerHeight - 100;
            window.addEventListener('scroll', (event) => {
                this.hiddenIntro = window.pageYOffset > window.innerHeight - 100;
            }, false);
        },
        showProcessSection(){
            let section = document.getElementById('processSection'),
                sectionOffsetTop = section.getBoundingClientRect().top;

            if(sectionOffsetTop < 0.5*window.innerHeight){
                section.classList.add('is-active');
            }
        },
        scrollEndHandling(){
            this.pageOnTheTop = window.pageYOffset === 0;
            this.testIsVisible = window.pageYOffset > window.innerHeight - 100;
            this.showProcessSection();

            let isScrolling;
            window.addEventListener('scroll', (event) => {
                window.clearTimeout(isScrolling);
                isScrolling = setTimeout(() => {
                    this.pageOnTheTop = window.pageYOffset === 0;
                    this.visibleSearch = false;
                    this.testIsVisible = window.pageYOffset > window.innerHeight - 100;

                    this.showProcessSection();
                }, 5);
            }, false);
        },
        initCarousel (){
            const carousel = document.querySelector('.js-person-carousel');
            const carouselCells = document.querySelectorAll('.js-person');
            if(carouselCells.length < 2) {
                return
            }
            this.flkty = new Flickity( carousel, {
                accessibility: false,
                contain: true,
                cellAlign: 'left',
                adaptiveHeight: true,
                percentPosition: true,
                prevNextButtons: false,
                pageDots: false,
            });
        },
        changeSkins(){
            const skinsBox = document.querySelector('.js-skins-change');
            if (!skinsBox) return;

            let skins = skinsBox.getElementsByTagName('img'),
                i = 0,
                activeItem = skins[i];

            activeItem.classList.add('active');

            if(skins.length === 1) return;
            setInterval(() => {
                activeItem.classList.remove('active');
                i = (i + 1) === skins.length ? 0 : (i + 1);
                activeItem = skins[i];
                activeItem.classList.add('active');
            }, this.changeSkinsTime)
        },
    },
    mounted() {
        this.scrollEndHandling();
        this.scrollHandling();
        this.initCarousel();
        this.changeSkins();
    }
});