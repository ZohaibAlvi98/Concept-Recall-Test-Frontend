class APISClass {
    apis() {
        return {
            fetchAll: {
                headers: {
                    token: null
                },
                method: 'get',
                path: '/project/fetch/all/:type'
            },
            create: {
                headers: {
                    token: null
                },
                method: 'post',
                path: '/project/create'
            },
            changeStatus: {
                headers: {
                    token: null
                },
                method: 'post',
                path: '/project/change/status'
            },
            update: {
                headers: {
                    token: null
                },
                method: 'post',
                path: '/project/update'
            },
            search: {
                headers: {
                    token: null
                },
                method: 'get',
                path: '/project/search'
            }
        };
    }
}
const APIS = new APISClass();
export default APIS;
