import { IsEnum, IsNumber, IsString } from "class-validator";
import { EnumToString } from "src/common/helpers/enumToString";
import { ProductCategory } from "../enums";

export class CreateProductDto {

    @IsEnum(ProductCategory, {
        message: `Invalid options, the correct ones are: ${EnumToString(ProductCategory)}`
    })
    readonly category: string;

    @IsString()
    readonly name: string;

    @IsString()
    readonly weight : string;

    @IsNumber()
    readonly price : string;

    @IsNumber()
    readonly amount : number;

    @IsString()
    readonly imageUrl: string;

}
