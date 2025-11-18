import { Expose, Type } from 'class-transformer';

type ClassConstructor<T = any> = new (...args: any[]) => T;

export function createCursorPaginationResponseDto<T extends ClassConstructor>(
  dataType: T
) {
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
