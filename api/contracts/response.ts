declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    globalError(message: string, code?: number): this
  }
}
