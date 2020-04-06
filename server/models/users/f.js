// import { Document, model, Schema } from 'mongoose'
// import { IFile, IFileDocument, IFileModel } from './interfaces/file'
// import * as mongoosePaginate from 'mongoose-paginate'
// import { ObjectID } from 'mongodb'

// export var schema: Schema = new Schema({
//     factory_id: { type: Schema.Types.ObjectId },
//     name: { type: Schema.Types.String },
//     path: { type: Schema.Types.String },
//     type: { type: Schema.Types.String },
//     order_process_id: { type: Schema.Types.ObjectId },
//     order_id: { type: Schema.Types.ObjectId },
//     user_id: { type: Schema.Types.ObjectId }
//     },
//     {
//     timestamps: {
//         createdAt: 'created_at',
//         updatedAt: 'updated_at'
//     }})

// schema.index({ '$**': 'text' })
// schema.plugin(mongoosePaginate)

// schema.set('toJSON', {
//     transform(doc: any, ret: any) {
//         delete ret.__v
//     },
// })

// schema.set('toObject', {
//     transform(doc: any, ret: any) {
//         delete ret.__v
//     },
// })

// schema.statics.getById = async function getById(_id: ObjectID) {
//     const query = this.findOne({ _id })
//     return query.exec().then((form: IFileDocument) => (form ? form : undefined))
// }

// schema.statics.getByOrderProcessId = async function getByOrderProcessId(order_process_id: ObjectID) {
//     const query = this.find({ order_process_id })
//     return query.exec().then((form: IFileDocument[]) => (form ? form : undefined))
// }

// schema.statics.revise = async function revise(file: IFileDocument) {
//     const { _id } = file
//     const $set = file
//     const query = this.findOneAndUpdate({ _id }, { $set }, { new: true })
//     return query.exec().then((file: IFileDocument) => (file ? file : undefined))
// }

// schema.statics.destroy = async function destroy(_id: ObjectID, user_id: ObjectID) {
//     const query = this.remove({ _id })
//     return query.exec().then((form: IFileDocument) => (form ? form : undefined))
// }

// schema.statics.createNew = async function createNew(form: IFile) {
//     try {
//         return new File(form).save()
//     } catch (error) {
//         return undefined
//     }
// }

// export const File: IFileModel = model<IFileDocument, IFileModel>('files', schema)
// export default File
// export {
//     IFile,
//     IFileDocument
// }
