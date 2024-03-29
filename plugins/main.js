import Vue from "vue"
import VueMeta from "vue-meta"

import firebase from "firebase/app"
import "firebase/storage"
import "firebase/firestore"
// import "firebase/messaging"

import FlamelinkPlugin from "./flamelink"

import PageMix from '@/components/PageMix.vue'
Vue.component('page-mix', PageMix);

import PageCategory from '@/components/PageCategory.vue'
Vue.component('page-category', PageCategory);



// console.log({firebaseConfig});
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})


// OFFLINE PERSISTENCE
// firebase.firestore().enablePersistence({synchronizeTabs:true})
// .catch(function(err) {
//     console.log(err);
// });
// END OFFLINE PERSISTENCE



Vue.config.productionTip = false;
Vue.config.devtools = true

// new Vue({
//     router,
//     render: h => h(App)
// }).$mount("#app")



/* CUSTOM FUNCTIONS */

// let footerStatic = document.querySelector('.page-container > *:first-child');
// console.log(footerStatic);
// footerStatic.innerHTML = "yo";

// let footerStatic = document.querySelector('#footerStaticContent:after');
// footerStatic.style.content = 'yo';

// let footerStatic = window.getComputedStyle(document.querySelector('#footerStaticContent'), ':after').getPropertyValue('content');
// footerStatic = "yo"

/* Custom properties */
let root = document.documentElement;
let bodyEl = document.body;
let headerHeight = document.getElementById('headerMain').offsetHeight;
let footerHeight = document.getElementById('footerTabs').offsetHeight;
root.style.setProperty('--headerHeight', headerHeight + "px");
root.style.setProperty('--footerHeight', footerHeight + "px");
/* END Custom properties */



/* SUPER TOGGLE */
const superToggle = function(element, class0, class1) {
    element.classList.toggle(class0);
    element.classList.toggle(class1);
  }
/* End SUPER TOGGLE */



/* THEME CHECK */
const theme = localStorage.getItem('theme');
// First visit on the website, set theme to light.
if (typeof theme === 'undefined' || theme === null) {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
}

// Switch + set local storage
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', (event) => {
    if (document.documentElement.getAttribute('data-theme') == 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else if (document.documentElement.getAttribute('data-theme') == 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
})

// future check
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}
/* END THEME CHECK */



/* Scroll appear/disappear bars */
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        bodyEl.classList.remove("scrolling-down");
    } else {
        bodyEl.classList.add("scrolling-down");
    }
    prevScrollpos = currentScrollPos;
}
/* END Scroll appear/disappear bars */

/* Open/Close Drawer */
const drawerToggle = document.querySelectorAll('.drawer-toggle');
const menuIconTop = document.querySelector('#mainMenuBtn');
const menuIconFab = document.querySelector('#mainMenuFab > span');
for (let i = 0; i < drawerToggle.length; i++) {
    drawerToggle[i].addEventListener('click', (event) => {
        bodyEl.classList.toggle('drawer-opened');
        // if (menuIconTop.innerHTML === "menu") {
        //     menuIconTop.innerHTML = "close"
        // } else {
        //     menuIconTop.innerHTML = "menu"
        // }
        // if (menuIconFab.innerHTML === "apps") {
        //     menuIconFab.innerHTML = "close"
        // } else {
        //     menuIconFab.innerHTML = "apps"
        // }
    });
};
/* END Open/Close Drawer */

/* Changing design depending on day time */
function dayTimeCss() {
    let currentTime = new Date().getHours();
    let appEl = document.getElementById('app');
    if (0 <= currentTime && currentTime < 5) {
        appEl.classList.add('night');
    }
    if (5 <= currentTime && currentTime < 11) {
        appEl.classList.add('morning');
    }
    if (11 <= currentTime && currentTime < 16) {
        appEl.classList.add('day');
    }
    if (16 <= currentTime && currentTime < 19) {
        appEl.classList.add('evening');
    }
    if (19 <= currentTime && currentTime < 24) {
        appEl.classList.add('night');
    }
}
dayTimeCss();
/* END Changing design depending on day time */
