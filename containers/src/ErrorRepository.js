export class ErrorRepository {
    constructor() {
        this.errors = new Map();
    }

    translate(code) {
        return this.errors.get(code) || 'Unknown error';
    }
} 