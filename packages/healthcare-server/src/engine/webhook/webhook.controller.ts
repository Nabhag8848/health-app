import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  @Post('booking.created')
  @HttpCode(200)
  async handleBookingCreated(@Body() payload: Record<string, unknown>) {
    // will have dto
    this.logger.log('Received booking.created webhook');
    this.logger.debug(JSON.stringify(payload));

    return {
      status: 'ok',
    };
  }
}
