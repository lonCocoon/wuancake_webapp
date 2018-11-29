import Vue from 'vue';
import Router from 'vue-router';

    
import _15434986023859d49a922ebc8a6d77ca82c0a74289b98 from '@/pages/Appshell.vue';
    

    
import _15434986023859c9f839430bb8a7a81a1878def5842a9 from '@/pages/changePassword.vue';
    

    
import _1543498602385d2462dcf0c7beccd286c658e08187914 from '@/pages/Error.vue';
    

    
import _15434986023851fc08f066f41b27b30ecbed1bda422e7 from '@/pages/forgetPassword.vue';
    

    
import _15434986023857e956ff74231425712aa6ee1ebe29619 from '@/pages/Grouping.vue';
    

    
import _154349860238567830448037326425509e44bce7632b7 from '@/pages/Index.vue';
    

    
import _154349860238567c7fac9d0314ab40632ee4454b0fdcd from '@/pages/Leave.vue';
    

    
import _15434986023858df541b53e4cb5088c52e8d2c73e2b09 from '@/pages/login.vue';
    

    
import _15434986023851fd767d722abb005d4803b600464a204 from '@/pages/OldIndex.vue';
    

    
import _1543498602385c5f19d99e92dfb5fd429cf8a19b0b5d5 from '@/pages/SignUp.vue';
    

    
import _154349860238591bf2e35394f7ea75808a659f2014e2c from '@/pages/SubmitWeekly.vue';
    


let routes = [
    {
        "path": "/appshell",
        "component": _15434986023859d49a922ebc8a6d77ca82c0a74289b98,
        "meta": {},
        "name": "appshell"
    },
    {
        "path": "/change-password",
        "component": _15434986023859c9f839430bb8a7a81a1878def5842a9,
        "meta": {},
        "name": "changePassword"
    },
    {
        "path": "/forget-password",
        "component": _15434986023851fc08f066f41b27b30ecbed1bda422e7,
        "meta": {},
        "name": "forgetPassword"
    },
    {
        "path": "/grouping",
        "component": _15434986023857e956ff74231425712aa6ee1ebe29619,
        "meta": {},
        "name": "grouping"
    },
    {
        "path": "/",
        "component": _154349860238567830448037326425509e44bce7632b7,
        "meta": {},
        "name": "index"
    },
    {
        "path": "/leave",
        "component": _154349860238567c7fac9d0314ab40632ee4454b0fdcd,
        "meta": {},
        "name": "leave"
    },
    {
        "path": "/login",
        "component": _15434986023858df541b53e4cb5088c52e8d2c73e2b09,
        "meta": {},
        "name": "login"
    },
    {
        "path": "/old-index",
        "component": _15434986023851fd767d722abb005d4803b600464a204,
        "meta": {},
        "name": "oldIndex"
    },
    {
        "path": "/sign-up",
        "component": _1543498602385c5f19d99e92dfb5fd429cf8a19b0b5d5,
        "meta": {},
        "name": "signUp"
    },
    {
        "path": "/submit-weekly",
        "component": _154349860238591bf2e35394f7ea75808a659f2014e2c,
        "meta": {},
        "name": "submitWeekly"
    },
    {
        "path": "/error",
        "component": _1543498602385d2462dcf0c7beccd286c658e08187914,
        "meta": {},
        "name": "error",
        "alias": "*"
    }
];

Vue.use(Router);




const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};



export const keepAlivePages = routes.filter(route => route.keepAlive || route.meta.keepAlive)
                            .map(route => route.name);

export function createRouter() {
    let router = new Router({
        mode: 'history',
        base: '/',
        scrollBehavior,
        routes
    });



    

    router.beforeEach((to, from, next) => {
        if (router.app.$store) {
            if (router.app.$store.state.pageTransition.enable) {
                
                let effect = 'fade';
                
                router.app.$store.commit('pageTransition/setType', 'fade');
                router.app.$store.commit('pageTransition/setEffect', effect);
            }
        }
        next();
    });


    return router;
}
