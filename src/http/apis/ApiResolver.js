import User from './user';
import Projects from './projects'
import Upload from './upload'
class ApiResolverClass {
    constructor() {
        this.apis = {
            projects: Projects.apis(),
            upload: Upload.apis(),
            user: User.apis()
        };
    }

    resolve(name, apiCall) {
        if (!this.apis[name]) throw new Error(`Failed to resolve api [${name}]`);

        if (!this.apis[name][apiCall]) throw new Error(`Failed to resolve api call [${apiCall}]`);

        return this.apis[name][apiCall];
    }
}
const ApiResolver = new ApiResolverClass();
export default ApiResolver;