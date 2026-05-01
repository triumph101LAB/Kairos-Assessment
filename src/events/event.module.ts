import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventsService } from "./event.services";

@Module({
    controllers:[EventController],
    providers:[EventsService]
})

export class EventModule{}