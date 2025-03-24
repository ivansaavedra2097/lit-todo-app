export class Todo {
    constructor({ id, title, description, created_at, updated_at }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.user_id = user_id;
    }
}