// import { Document, model, Schema } from 'mongoose'
// import { IUser, IUserDocument, IUserModel } from './interfaces/user'
// import { USER_ERROR_USER_ALREADY_EXISTS } from '../../config/errors'
// import * as mongoosePaginate from 'mongoose-paginate'
// import * as jwt from 'jsonwebtoken'
// import { SECRET_KEY } from '../../config/keys'
// import * as bcryptjs from 'bcryptjs'
// import { hashString } from '../../tools/hash'

// export var schema = new Schema({
//     full_name: { type: Schema.Types.String },
//     image_path: { type: Schema.Types.String },
//     email: { type: Schema.Types.String },
//     phone: { type: Schema.Types.String },
//     password: { type: Schema.Types.String },
// },
//     {
//         timestamps: {
//             createdAt: 'created_at',
//             updatedAt: 'updated_at'
//         }
//     })

// schema.index({ '$**': 'text' })
// schema.plugin(mongoosePaginate)

// schema.set('toJSON', {
//     transform(doc, ret) {
//         delete ret.__v
//     },
// })

// schema.set('toObject', {
//     transform(doc, ret) {
//         delete ret.__v
//     },
// })

// schema.statics.getById = async function getById(_id) {
//     const query = this.findOne({ _id }, { _id: 0 })
//     return query.exec().then((user: IUserDocument) => (user ? user : undefined))
// }

// schema.statics.register = async function register(user: IUser) {
//     const { email, password } = user
//     if (await User.doesExist(email)) {
//         return USER_ERROR_USER_ALREADY_EXISTS.message
//     }
//     user.password = await hashString(password)
//     try {
//         return new User(user).save()
//     } catch (error) {
//         return undefined
//     }

// }

// schema.statics.login = async function login(email =, password =) {
//     const user = await User.findOne({ email }).exec()
//     if (user) {
//         const passwordCorrect = await bcryptjs.compare(password, user.password) || user.password === password
//         if (passwordCorrect) {
//             const token = jwt.sign(user.toJSON(),
//                 SECRET_KEY,
//                 {
//                     expiresIn: '730h'
//                 }
//             )
//             const { full_name, _id } = user

//             const result = {
//                 token,
//                 full_name,
//                 _id
//             }
//             return result
//         } else {
//             return undefined
//         }
//     }
// }
// //

// schema.statics.getIdByJWT = async function getIdByJWT(token =) {
//     return jwt.verify(
//         token,
//         SECRET_KEY,
//         (err, decoded) => {
//             if (err) {
//                 if (err.message === 'jwt expired') {
//                     return 'Token has expired'
//                 }
//                 return false
//             } else {
//                 const { _id, facilities, full_name } = decoded
//                 return { user_id: _id, facilities, full_name }
//             }
//         }
//     )
// }

// schema.statics.doesExist = async function doesExist(email =) {
//     const userExists = await User.find({ email }).limit(1).countDocuments().exec()
//     return userExists
// }

// export const User: IUserModel = model<IUserDocument, IUserModel>('users', schema)
// export default User
// export {
//     IUser,
//     IUserDocument
// }