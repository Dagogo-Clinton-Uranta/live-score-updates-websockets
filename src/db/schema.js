import {pgTable, serial, text,integer, timestamp,pgEnum,jsonb} from 'drizzle-orm/pg-core'

//Define the 'demo_users' table 

export const matchStatusEnum= pgEnum('match_status',['scheduled','live','finished'])

export const matches = pgTable('demo_users',{
    id:serial('id').primaryKey(),
    sport:text('sport').notNull(),
    homeTeam:text('home_team').notNull(),
    awayTeam:text('away_team').notNull(),
    status:matchStatusEnum('status').notNull().default('scheduled'),
    startTime:timestamp('start_time'),
    endTime:timestamp('end_time'),
    homeScore:text('home_Score').notNull().default(0),
    awayScore:text('away_Score').notNull().default(0),
    createdAt:timestamp('created_at').defaultNow().notNull(),
 
})

export const commentary = pgTable = ('commentary',{
    id:serial('id').primaryKey(),
    matchId:integer('match_id').notNull().references(()=>'matches.id'),
    minute:integer('minute'),
    sequence:integer('sequence'),
    period:integer('period'),
    eventType:integer('event_type'),
    actor:integer('actor'),
    team:integer('team'),
    message:text('message').notNull(),
    metadata:jsonb('metadata'),
    tags:text('tags').array(),
    createdAt:timestamp('created_at').defaultNow().notNull(),
})




