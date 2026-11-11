import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateProductDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  product_name: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Price must be a positive decimal with up to 2 decimal places',
  })
  base_price: string;

  @IsString()
  @Matches(/^[1-9]\d*$/, {
    message: 'category_id must be a positive integer string',
  })
  category_id: string;

  @IsOptional()
  @IsString()
  @Matches(/^[1-9]\d*$/)
  brand_id?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}