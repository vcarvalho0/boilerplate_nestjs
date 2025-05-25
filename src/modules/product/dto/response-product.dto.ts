import { ApiProperty } from '@nestjs/swagger';

export class ResponseProductDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  companyId: number;
}
