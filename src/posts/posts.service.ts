import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { db } from '../db/index';
import { postsTable } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PostsService {
  async create(createPostDto: CreatePostDto) {
    return await db.insert(postsTable).values({
      title: createPostDto.title,
      lead: createPostDto.lead,
      content: createPostDto.content
    }).returning();
  }

  async findAll() {
    return await db.select().from(postsTable);
  }

  async findOne(id: string) {
    return await db.select().from(postsTable).where(eq(postsTable.id, id));
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await db.update(postsTable).set({...updatePostDto, updatedAt: new Date()}).where(eq(postsTable.id, id)).returning();
  }

  async remove(id: string) {
    return await db.delete(postsTable).where(eq(postsTable.id, id)).returning();
  }
}
