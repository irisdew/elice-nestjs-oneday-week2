import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class googleAuthGuards extends AuthGuard('google') {}
