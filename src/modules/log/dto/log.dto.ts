import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";

export class GetListDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "todo" })
    public key_unit: string;

    @IsNumberString()
    @IsOptional()
    @ApiProperty({ example: 10 })
    public per_page: number;

    @IsNumberString()
    @IsOptional()
    @ApiProperty({ example: 1 })
    public page: number;
}

export class ClearDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "todo" })
    key_unit: string;
}