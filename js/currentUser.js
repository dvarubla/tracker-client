class CurrentUser {
    constructor(data) {
        this.data = data;
    }
    getPrivilegyAliases() {
        return this.data.privilegies.map(p => p.alias);
    }
    hasPrivilege(priv) {
        return this.getPrivilegyAliases().includes(priv);
    }
    getName() {
        return this.data.data.name;
    }
    getId() {
        return this.data.data.id;
    }
}