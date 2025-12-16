import 'server-only';
import crypto from 'crypto';

const APP_SECRET = process.env.APP_SECRET || 'your-secret-key';

function generateUserId(): string {
  return crypto.randomBytes(16).toString('hex');
}

function generateMD5(input: string): string {
  return crypto.createHash('md5').update(input).digest('hex');
}

export function make(input?: string|undefined): string {
  const _key_ = `${generateUserId()}:${Date.now().toString()}:${crypto.randomBytes(16).toString('hex')}@${input}`;
  const unique = generateMD5(_key_);

  const signature = crypto
    .createHmac('sha256', APP_SECRET)
    .update(unique)
    .digest('hex');

  return `${unique}.${signature}`;
}

export function verify(uid: string): boolean {
  const parts = uid.split('.');

  if (parts.length !== 2) {
    return false;
  }

  const [data, signature] = parts;
  const expectedSignature = crypto
      .createHmac('sha256', APP_SECRET)
      .update(data)
      .digest('hex');

  return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
}
