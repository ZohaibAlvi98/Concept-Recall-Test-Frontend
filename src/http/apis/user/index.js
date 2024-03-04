class APISClass {
    apis() {
        return {
            login: {
                headers: {},
                method: 'post',
                path: '/user/login'
            },
            register: {
                headers: {},
                method: 'post',
                path: '/user/register'
            },
            fetch: {
                headers: {
                    token: null
                },
                method: 'get',
                path: '/user/fetch'
            }
        };
    }
}
const APIS = new APISClass();
export default APIS;
