Vue.component('login-form', loginForm);
Vue.component('users-block', usersBlock);
Vue.component('records-block', recordsBlock);

var Vue = new Vue({
    el: '#app',
    data: {
        isLogin: false,
        currentUser: null
    },
    methods: {
        onSuccessLogin: function(user) {
            this.isLogin = true;
            this.currentUser = user;
        },
        onEditCurrent: function(password) {
            apiClient.setCurrentPassword(password);
            this.isLogin = false;
            apiClient.getUserInfo().then(e => {
                this.currentUser = new CurrentUser(e.data);
                this.isLogin = true;
            }).catch(e => {
                ApiClient.errorAlert(e);
            })
        },
        onRemoveCurrent() {
            this.exit();
        },
        exit() {
            this.isLogin = false;
        }
    }
});