import { Controller, Get, Param, Query } from "@nestjs/common";
import { QueryEventsDto } from "./dto/query-events.dto";
import { EventsService } from "./event.services";
@Controller('events')

export class EventController{

    constructor (private readonly eventService:EventsService){}

    @Get()
    getEvents(@Query() query:QueryEventsDto){
        return this.eventService.getEvents(query)
    }
    
    
    @Get(':id')
    getEventsbyId(@Param('id') id:string){
        return this.eventService.getEventbyId(id)
    }
}