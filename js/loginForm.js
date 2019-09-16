var loginForm = {
    data: function () {
        return {
            login: "",
            password: "",
            loginNew: "",
            passwordNew: "",
            nameNew: "",
            apiUrl: "http://localhost:13333"
        }
    },
    template: '#login-form',
    methods: {
        doLogin() {
            apiClient.setLoginData(this.apiUrl, this.login, this.password);
            apiClient.getUserInfo().then(e => {
                this.$emit("success-login", new CurrentUser(e.data))
            }).catch(e => {
                ApiClient.errorAlert(e);
            })
        },
        doRegister() {
            ApiClient.register(this.apiUrl, this.loginNew, this.passwordNew, this.nameNew).then(
                () => {
                    apiClient.setLoginData(this.apiUrl, this.loginNew, this.passwordNew);
                    return apiClient.getUserInfo();
                }
            ).then(e => {
                this.$emit("success-login", new CurrentUser(e.data))
            }).catch(e => {
                ApiClient.errorAlert(e);
            });
        }
    }
};