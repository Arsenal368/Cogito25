import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  politicalLeanings: json("political_leanings"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizResponses = pgTable("quiz_responses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  value: integer("value").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  source: text("source").notNull(),
  perspective: text("perspective").notNull(), // 'liberal', 'conservative', 'neutral'
  biasScore: integer("bias_score"),
  content: text("content"),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const readingHistory = pgTable("reading_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  articleId: integer("article_id").references(() => articles.id),
  readAt: timestamp("read_at").defaultNow(),
  timeSpent: integer("time_spent"), // in seconds
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertQuizResponseSchema = createInsertSchema(quizResponses).omit({
  id: true,
  createdAt: true,
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
});

export const insertReadingHistorySchema = createInsertSchema(readingHistory).omit({
  id: true,
  readAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type QuizResponse = typeof quizResponses.$inferSelect;
export type InsertQuizResponse = z.infer<typeof insertQuizResponseSchema>;
export type Article = typeof articles.$inferSelect;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type ReadingHistory = typeof readingHistory.$inferSelect;
export type InsertReadingHistory = z.infer<typeof insertReadingHistorySchema>;
