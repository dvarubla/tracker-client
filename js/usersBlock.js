var usersBlock = {
    props: {
        currentUser: null
    },
    data: function () {
        return {
            users: [],
            curPage: 0,
            activeUser: this.getInitialUser(),
            roles: [],
            searchText: ""
        };
    },
    watch: {
        searchText: function () {
            this.refreshUsers();
        }
    },
    mounted: function () {
        this.getAllRoles();
        this.refreshUsers();
    },
    template: '#users-block',
    methods: {
        refreshUsers() {
            return apiClient.getUsers(this.curPage, this.searchText).then(users => {
                this.users = users.data.items;
            })
        },
        submitUser() {
            if (this.activeUser.isAdd) {
                return apiClient.addUserByManager(this.activeUser)
                    .then(this.refreshUsers)
                    .then(() => {
                        this.activeUser = this.getInitialUser();
                    })
                    .catch(
                        e => {
                            ApiClient.errorAlert(e);
                        }
                    );
            } else {
                return apiClient.editUser(this.activeUser)
                    .then(() => {
                        if (this.activeUser.id === this.currentUser.getId()) {
                            this.$emit(
                                "edit-current",
                                (this.activeUser.editPassword) ? this.activeUser.password : apiClient.getCurrentPassword()
                            );
                        } else {
                            this.refreshUsers();
                            this.activeUser = this.getInitialUser();
                        }
                    })
                    .catch(
                        e => {
                            ApiClient.errorAlert(e);
                        }
                    );
            }
        },
        removeUser(user) {
            apiClient.removeUser(user.id).then(
                    () => {
                        if (user.id === this.currentUser.getId()) {
                            this.$emit('remove-current');
                        } else {
                            if (user.id === this.activeUser.id) {
                                this.activeUser = this.getInitialUser();
                            }
                            return this.refreshUsers();
                        }
                    }
                ).catch(
                e => {
                    ApiClient.errorAlert(e);
                }
            );
        },
        stopEdit() {
            this.activeUser = this.getInitialUser();
        },
        setCurrentUser(user) {
            this.activeUser = {
                isAdd: false,
                id: user.id,
                login: user.login,
                password: "",
                editPassword: false,
                name: user.name,
                roleId: user.role.id,
            };
        },
        getAllRoles() {
            apiClient.getAllRoles().then((roles) => {
                this.roles = roles.data.items;
            });
        },
        getInitialUser() {
            return {
                isAdd: true,
                id: -1,
                login: "",
                password: "",
                editPassword: true,
                name: "",
                roleId: 1
            };
        }
    }
};