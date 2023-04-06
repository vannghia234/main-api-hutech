import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "example" })
    content: string;
}

export class UpdateTodoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "1" })
    id: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "example" })
    content: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: false })
    checked: string;
}

export class DeleteTodoDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: "1" })
    id: string;
}