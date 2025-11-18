import { Expose, Type } from 'class-transformer';

export function createCursorPaginationResponseDto<
  T extends new (...args: any[]) => any
>(dataType: T) {
  class TypedCursorPaginationResponseDto {
    @Expose()
    cursor: string | null;

    @Expose()
    nextPage: string | null;

    @Expose()
    @Type(() => dataType)
    data: InstanceType<T>[];
  }

  return TypedCursorPaginationResponseDto;
}
