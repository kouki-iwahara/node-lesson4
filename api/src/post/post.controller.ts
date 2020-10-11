import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Param,
  Query,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateOrUpdateRequest } from './dto/createOrUpdateRequest';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getPosts(@Query('userId') userId: number) {
    return await this.postService.getPosts(userId).catch(err => {
      throw new Error(err);
    });
  }

  @Post('/:id')
  async createPost(
    @Body(ValidationPipe)
    param: CreateOrUpdateRequest,
    @Param('id') userId: string,
  ) {
    param.userId = +userId;
    const post = await this.postService.createOrUpdatePost(param).catch(err => {
      throw new Error(err);
    });
    return post;
  }

  @Put('/:id')
  async updatePost(
    @Body(ValidationPipe)
    param: CreateOrUpdateRequest,
    @Param('id') id: string,
  ) {
    param.id = +id;
    const post = await this.postService.createOrUpdatePost(param).catch(err => {
      throw new Error(err);
    });
    return post;
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    const result = await this.postService.deletePosts(+id).catch(err => {
      throw new Error(err);
    });
    return result;
  }
}
