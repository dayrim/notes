import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const NoteScalarFieldEnumSchema = z.enum(['id','title','content','plainContent','createDate','updateDate']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// NOTE SCHEMA
/////////////////////////////////////////

export const NoteSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  plainContent: z.string(),
  createDate: z.coerce.date().nullable(),
  updateDate: z.coerce.date().nullable(),
})

export type Note = z.infer<typeof NoteSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// NOTE
//------------------------------------------------------

export const NoteSelectSchema: z.ZodType<Prisma.NoteSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  plainContent: z.boolean().optional(),
  createDate: z.boolean().optional(),
  updateDate: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const NoteWhereInputSchema: z.ZodType<Prisma.NoteWhereInput> = z.object({
  AND: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteWhereInputSchema),z.lazy(() => NoteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  plainContent: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updateDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const NoteOrderByWithRelationInputSchema: z.ZodType<Prisma.NoteOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  plainContent: z.lazy(() => SortOrderSchema).optional(),
  createDate: z.lazy(() => SortOrderSchema).optional(),
  updateDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteWhereUniqueInputSchema: z.ZodType<Prisma.NoteWhereUniqueInput> = z.object({
  id: z.string().uuid().optional()
}).strict();

export const NoteOrderByWithAggregationInputSchema: z.ZodType<Prisma.NoteOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  plainContent: z.lazy(() => SortOrderSchema).optional(),
  createDate: z.lazy(() => SortOrderSchema).optional(),
  updateDate: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => NoteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => NoteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => NoteMinOrderByAggregateInputSchema).optional()
}).strict();

export const NoteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NoteScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => NoteScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => NoteScalarWhereWithAggregatesInputSchema),z.lazy(() => NoteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => UuidWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  plainContent: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updateDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const NoteCreateInputSchema: z.ZodType<Prisma.NoteCreateInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  plainContent: z.string(),
  createDate: z.coerce.date().optional().nullable(),
  updateDate: z.coerce.date().optional().nullable()
}).strict();

export const NoteUncheckedCreateInputSchema: z.ZodType<Prisma.NoteUncheckedCreateInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  plainContent: z.string(),
  createDate: z.coerce.date().optional().nullable(),
  updateDate: z.coerce.date().optional().nullable()
}).strict();

export const NoteUpdateInputSchema: z.ZodType<Prisma.NoteUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plainContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updateDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NoteUncheckedUpdateInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plainContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updateDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NoteCreateManyInputSchema: z.ZodType<Prisma.NoteCreateManyInput> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  plainContent: z.string(),
  createDate: z.coerce.date().optional().nullable(),
  updateDate: z.coerce.date().optional().nullable()
}).strict();

export const NoteUpdateManyMutationInputSchema: z.ZodType<Prisma.NoteUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plainContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updateDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const NoteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NoteUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  plainContent: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updateDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NoteCountOrderByAggregateInputSchema: z.ZodType<Prisma.NoteCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  plainContent: z.lazy(() => SortOrderSchema).optional(),
  createDate: z.lazy(() => SortOrderSchema).optional(),
  updateDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  plainContent: z.lazy(() => SortOrderSchema).optional(),
  createDate: z.lazy(() => SortOrderSchema).optional(),
  updateDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const NoteMinOrderByAggregateInputSchema: z.ZodType<Prisma.NoteMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  plainContent: z.lazy(() => SortOrderSchema).optional(),
  createDate: z.lazy(() => SortOrderSchema).optional(),
  updateDate: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedUuidWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const NoteFindFirstArgsSchema: z.ZodType<Prisma.NoteFindFirstArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteScalarFieldEnumSchema.array().optional(),
}).strict() 

export const NoteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NoteFindFirstOrThrowArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteScalarFieldEnumSchema.array().optional(),
}).strict() 

export const NoteFindManyArgsSchema: z.ZodType<Prisma.NoteFindManyArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: NoteScalarFieldEnumSchema.array().optional(),
}).strict() 

export const NoteAggregateArgsSchema: z.ZodType<Prisma.NoteAggregateArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithRelationInputSchema.array(),NoteOrderByWithRelationInputSchema ]).optional(),
  cursor: NoteWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const NoteGroupByArgsSchema: z.ZodType<Prisma.NoteGroupByArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
  orderBy: z.union([ NoteOrderByWithAggregationInputSchema.array(),NoteOrderByWithAggregationInputSchema ]).optional(),
  by: NoteScalarFieldEnumSchema.array(),
  having: NoteScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const NoteFindUniqueArgsSchema: z.ZodType<Prisma.NoteFindUniqueArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict() 

export const NoteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NoteFindUniqueOrThrowArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict() 

export const NoteCreateArgsSchema: z.ZodType<Prisma.NoteCreateArgs> = z.object({
  select: NoteSelectSchema.optional(),
  data: z.union([ NoteCreateInputSchema,NoteUncheckedCreateInputSchema ]),
}).strict() 

export const NoteUpsertArgsSchema: z.ZodType<Prisma.NoteUpsertArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereUniqueInputSchema,
  create: z.union([ NoteCreateInputSchema,NoteUncheckedCreateInputSchema ]),
  update: z.union([ NoteUpdateInputSchema,NoteUncheckedUpdateInputSchema ]),
}).strict() 

export const NoteCreateManyArgsSchema: z.ZodType<Prisma.NoteCreateManyArgs> = z.object({
  data: NoteCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const NoteDeleteArgsSchema: z.ZodType<Prisma.NoteDeleteArgs> = z.object({
  select: NoteSelectSchema.optional(),
  where: NoteWhereUniqueInputSchema,
}).strict() 

export const NoteUpdateArgsSchema: z.ZodType<Prisma.NoteUpdateArgs> = z.object({
  select: NoteSelectSchema.optional(),
  data: z.union([ NoteUpdateInputSchema,NoteUncheckedUpdateInputSchema ]),
  where: NoteWhereUniqueInputSchema,
}).strict() 

export const NoteUpdateManyArgsSchema: z.ZodType<Prisma.NoteUpdateManyArgs> = z.object({
  data: z.union([ NoteUpdateManyMutationInputSchema,NoteUncheckedUpdateManyInputSchema ]),
  where: NoteWhereInputSchema.optional(),
}).strict() 

export const NoteDeleteManyArgsSchema: z.ZodType<Prisma.NoteDeleteManyArgs> = z.object({
  where: NoteWhereInputSchema.optional(),
}).strict() 

interface NoteGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.NoteArgs
  readonly type: Prisma.NoteGetPayload<this['_A']>
}

export const tableSchemas = {
  note: {
    fields: new Map([
      [
        "id",
        "UUID"
      ],
      [
        "title",
        "TEXT"
      ],
      [
        "content",
        "TEXT"
      ],
      [
        "plainContent",
        "TEXT"
      ],
      [
        "createDate",
        "TIMESTAMPTZ"
      ],
      [
        "updateDate",
        "TIMESTAMPTZ"
      ]
    ]),
    relations: [
    ],
    modelSchema: (NoteCreateInputSchema as any)
      .partial()
      .or((NoteUncheckedCreateInputSchema as any).partial()),
    createSchema: NoteCreateArgsSchema,
    createManySchema: NoteCreateManyArgsSchema,
    findUniqueSchema: NoteFindUniqueArgsSchema,
    findSchema: NoteFindFirstArgsSchema,
    updateSchema: NoteUpdateArgsSchema,
    updateManySchema: NoteUpdateManyArgsSchema,
    upsertSchema: NoteUpsertArgsSchema,
    deleteSchema: NoteDeleteArgsSchema,
    deleteManySchema: NoteDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof NoteCreateInputSchema>,
    Prisma.NoteCreateArgs['data'],
    Prisma.NoteUpdateArgs['data'],
    Prisma.NoteFindFirstArgs['select'],
    Prisma.NoteFindFirstArgs['where'],
    Prisma.NoteFindUniqueArgs['where'],
    never,
    Prisma.NoteFindFirstArgs['orderBy'],
    Prisma.NoteScalarFieldEnum,
    NoteGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
