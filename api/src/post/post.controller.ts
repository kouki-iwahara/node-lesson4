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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { CreateOrUpdateRequest } from './dto/createOrUpdateRequest';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPosts(@Query('userId') userId: number) {
    return await this.postService.getPosts(userId).catch(err => {
      throw new Error(err);
    });
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deletePost(@Param('id') id: string) {
    await this.postService.deletePosts(+id).catch(err => {
      throw new Error(err);
    });
  }
}
