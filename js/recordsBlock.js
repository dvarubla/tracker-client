var recordsBlock = {
    props: {
        currentUser: null
    },
    data: function () {
        return {
            records: [],
            curPage: 0,
            activeRecord: this.getInitialRecord(),
            searchText: "",
            search: {
                startDate: "",
                endDate: "",
                showValue: false,
                value: ""
            }
        };
    },
    watch: {
        searchText: function () {
            this.refreshRecords();
        }
    },
    mounted: function () {
        this.refreshRecords();
    },
    template: '#records-block',
    methods: {
        refreshRecords() {
            return apiClient.getRecords(this.curPage, this.searchText).then(records => {
                this.records = records.data.items;
            })
        },
        submitRecord() {
            if (this.activeRecord.isAdd) {
                return apiClient.addRecord(this.activeRecord)
                    .then(this.refreshRecords)
                    .then(() => {
                        this.activeRecord = this.getInitialRecord();
                    })
                    .catch(
                        e => {
                            ApiClient.errorAlert(e);
                        }
                    );
            } else {
                return apiClient.editRecord(this.activeRecord)
                    .then(this.refreshRecords)
                    .then(() => {
                        this.activeRecord = this.getInitialRecord();
                    })
                    .catch(
                        e => {
                            ApiClient.errorAlert(e);
                        }
                    );
            }
        },
        removeRecord(record) {
            apiClient.removeRecord(record.id).then(this.refreshRecords).then(
                () => {
                    if (record.id === this.activeRecord.id) {
                        this.activeRecord = this.getInitialRecord();
                    }
                }
            ).catch(
                e => {
                    ApiClient.errorAlert(e);
                }
            );
        },
        stopEdit() {
            this.activeRecord = this.getInitialRecord();
        },
        setCurrentRecord(record) {
            this.activeRecord = {
                isAdd: false,
                id: record.id,
                recordDate: record.recordDate,
                cost: record.cost,
                description: record.description,
                comment: record.comment,
                userId: record.user.id
            };
        },
        getInitialRecord() {
            return {
                isAdd: true,
                id: -1,
                recordDate: "2010-01-02T03:05Z",
                cost: "",
                description: "",
                comment: "",
                userId: this.currentUser.getId()
            };
        },
        calcAverage() {
            apiClient.calcAverage(this.search.startDate, this.search.endDate).then(r => {
                this.search.value = r.data.value;
                this.search.showValue = true;
            }).catch(
                e => {
                    ApiClient.errorAlert(e);
                }
            );
        },
        calcTotal() {
            apiClient.calcTotal(this.search.startDate, this.search.endDate).then(r => {
                this.search.value = r.data.value;
                this.search.showValue = true;
            }).catch(
                e => {
                    ApiClient.errorAlert(e);
                }
            );
        }
    }
};