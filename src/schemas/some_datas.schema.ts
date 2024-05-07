import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Schema as MongoSchema } from 'mongoose'

export type SomeDataDocument = HydratedDocument<SomeData>

@Schema({ collection: 'some_datas' })
export class SomeData {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  age: number

  @Prop({ required: true })
  gender: string

  @Prop({required: true})
  programName: string

  formData: unknown
}

export const SomeDataSchema = SchemaFactory.createForClass(SomeData)
