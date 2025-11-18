import { UseInterceptors } from '@nestjs/common';
import { SerializerInterceptor } from '@/modules/api/common/interceptors/serialize.interceptor';
import { SerializeConstructor } from '@/modules/api/common/@types/serialize-constructor';

export function Serialize(dto: SerializeConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}
