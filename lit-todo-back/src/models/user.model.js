export class User {
    constructor({ id, user, email, password, created_at, updated_at }) {
        this.id = id;
        this.user = user;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}