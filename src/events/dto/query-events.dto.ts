import { IsOptional,IsString,IsIn, IsDateString, IsInt,Min } from "class-validator";
import { Type } from "class-transformer";
import { EvenetCategory } from "../interfaces/event.interface";

const VALID_CATEGORIES: EvenetCategory[] = ['Art','Fitness','Food','Music','Tech']

export class QueryEventsDto{
    @IsOptional()
    @IsString()
    search?:string;

    @IsOptional()
    @IsIn(VALID_CATEGORIES)
    category?:EvenetCategory;

    @IsOptional()
    @IsDateString()
    date_from?:string;

    @IsOptional()
    @IsDateString()
    date_to?:string;

    @IsOptional()
    @Type(() =>Number)
    @IsInt()
    @Min(1)
    limit?:number = 12

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?:number = 1;
}