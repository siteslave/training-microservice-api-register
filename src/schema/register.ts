import S from 'fluent-json-schema'

const registerSchema = S.object()
  .prop('username', S.string().minLength(4).required())
  .prop('password', S.string().minLength(8).required())
  .prop('firstName', S.string().minLength(2).maxLength(50).required())
  .prop('lastName', S.string().minLength(2).maxLength(100).required())

export default {
  body: registerSchema
}