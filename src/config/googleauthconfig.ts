/* eslint-disable prettier/prettier */
import {OAuth2Client} from 'google-auth-library';


class GoogleAuth {
    public CLIENT_ID;
    public CLIENT_SECRET;
    public REDIRECT_URL;
    public client;
    constructor () {
        this.CLIENT_ID = process.env.CLIENT_ID;
        this.CLIENT_SECRET = process.env.CLIENT_SECRET;
        this.REDIRECT_URL = process.env.REDIRECT_URL;
        this.client = new OAuth2Client(
            this.CLIENT_ID,
            this.CLIENT_SECRET,
            this.REDIRECT_URL
        )
    }
}

export default GoogleAuth;