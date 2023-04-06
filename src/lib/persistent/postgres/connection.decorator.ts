import { Inject } from '@nestjs/common';
import { DEFAULT } from './postgres-core.module';
import { generateConnectionPoolToken } from './postgres.module';

export function Connection(name: string = DEFAULT) {
  return Inject(generateConnectionPoolToken(name));
}
