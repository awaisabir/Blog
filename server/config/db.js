// db configuration
// mongodb://<dbuser>:<dbpassword>@ds133814.mlab.com:33814/blog-db
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
import SECRET from './secret';

export default {
    address: 'mongodb://localhost:27017/QSocial',
    auth_secret: SECRET
};