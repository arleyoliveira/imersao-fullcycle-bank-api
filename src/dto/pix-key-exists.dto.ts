import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { PixKeyKind } from "src/models/pix-key.models";

export class PixKeyExistsDto {
    @IsString()
    @IsNotEmpty()
    readonly key: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(Object.values(PixKeyKind))
    readonly kind: PixKeyKind
}