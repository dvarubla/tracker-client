class ApiClient {
    constructor() {
        this.PAGE_COUNT = 99999;
    }

    getCurrentPassword() {
        return this.password;
    }

    setCurrentPassword(password) {
        this.password = password;
    }

    addCreds(obj) {
        obj = obj || {};
        Object.assign(obj, {
            withCredentials: true,
            auth: {
                username: this.login,
                password: this.password
            }
        });
        return obj;
    }

    setLoginData(apiUrl, login, password) {
        this.apiUrl = apiUrl;
        this.login = login;
        this.password = password;
    }

    calcAverage(startDate, endDate) {
        return axios.get(
            this.apiUrl + "/expenses/average", this.addCreds({params: {start: startDate, end: endDate}})
        );
    }

    calcTotal(startDate, endDate) {
        return axios.get(
            this.apiUrl + "/expenses/total", this.addCreds({params: {start: startDate, end: endDate}})
        );
    }

    static register(apiUrl, login, password, name){
        return axios.post(apiUrl + "/user/register", {
            login: login,
            password: password,
            name: name
        });
    }

    getUserInfo() {
        return axios.get(this.apiUrl + "/user/current", this.addCreds());
    }

    getUsers(page, query) {
        return axios.get(this.apiUrl + "/users/", this.addCreds({
            params: {page: page, count: this.PAGE_COUNT, query: query},
        }));
    }

    getRecords(page, query) {
        return axios.get(this.apiUrl + "/expenses/", this.addCreds({
            params: {page: page, count: this.PAGE_COUNT, query: query}
        }));
    }

    editRecord(record) {
        return axios.put(
            this.apiUrl + "/expense",
            {
                id: record.id, recordDate: record.recordDate, userId: record.userId,
                cost: record.cost, description: record.description, comment: record.comment
            },
            this.addCreds()
        );
    }

    addUserByManager(user) {
        return axios.post(
            this.apiUrl + "/user",
            {login: user.login, name: user.name, roleId: user.roleId, password: user.password},
            this.addCreds()
        );
    }

    addRecord(record) {
        return axios.post(
            this.apiUrl + "/expense",
            {recordDate: record.recordDate, cost: record.cost, description: record.description, comment: record.comment},
            this.addCreds()
        );
    }

    editUser(user) {
        var obj = {id: user.id, name: user.name, roleId: user.roleId};
        if (user.editPassword) {
            obj.password = user.password;
        }
        return axios.put(
            this.apiUrl + "/user",
            obj, this.addCreds()
        );
    }

    removeUser(id) {
        return axios.delete(
            this.apiUrl + "/user",
            this.addCreds({params: {id: id}})
        );
    }

    removeRecord(id) {
        return axios.delete(
            this.apiUrl + "/expense",
            this.addCreds({params: {id: id}})
        );
    }

    getAllRoles() {
        return axios.get(this.apiUrl + "/roles", this.addCreds());
    }

    static errorAlert(e) {
        console.log(e);
        alert(e.response.data.message);
    }
}

var apiClient = new ApiClient();