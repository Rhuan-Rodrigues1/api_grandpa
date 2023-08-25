export class NameUserError extends Error {
    constructor(
        public message: string,
        protected code: number = 400,
        protected error: string = "Bad Request"
    ) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

export class EmailUserError extends Error {
    constructor(
        public message: string,
        protected code: number = 409,
        protected error: string = "Conflict"
    ) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

export class InvalidEmailError extends Error {
    constructor(
        public message: string,
        protected code: number = 400,
        protected error: string = "Bad Request"
    ) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}