export class CreatePostError extends Error {
  constructor(
    public message: string,
    public code: number,
    public error: string = "Bad Request"
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
export class GetPostError extends Error {
  constructor(
    public message: string,
    public code: number,
    public error: string = "Bad Request"
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
export class UpdatePostError {}
export class DeletePostsError extends Error {
  constructor(
    public message: string,
    public code: number,
    public error: string = "Bad Request"
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
