import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { postsTable } from '../db/schema';
import { eq } from 'drizzle-orm';
import { DrizzleService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly dbService: DrizzleService,
  ) {}

  async create(createPostDto: CreatePostDto) {
    return this.dbService.db.insert(postsTable).values({
      title: createPostDto.title,
      lead: createPostDto.lead,
      content: createPostDto.content
    }).returning();
  }

  async findAll() {
    return this.dbService.db.select().from(postsTable);
  }

  async findOne(id: string) {
    return this.dbService.db
      .select()
      .from(postsTable)
      .where(eq(postsTable.id, id));
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.dbService.db
      .update(postsTable)
      .set({ ...updatePostDto, updatedAt: new Date() })
      .where(eq(postsTable.id, id))
      .returning();
  }

  async remove(id: string) {
    return this.dbService.db
      .delete(postsTable)
      .where(eq(postsTable.id, id))
      .returning();
  }
}
