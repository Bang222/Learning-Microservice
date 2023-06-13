import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef(); // message cu the
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
    return this.authService.getUser();
  }
  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef(); // message cu the
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
    return this.authService.postUser();
  }
}
