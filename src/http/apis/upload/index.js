class APISClass {
    apis() {
        return {
            file: {
                headers: {
                    token: null
                },
                method: 'post',
                path: '/upload/image'
            }
        };
    }
}
const APIS = new APISClass();
export default APIS;
