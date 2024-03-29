import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@ammarahmad/common";
import queueGroupName from "./queue-group-name";
import { TicketModel } from "../../models";
import TicketUpdatedPublisher from "../publishers/ticket-updated-publisher";

class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const ticket = await TicketModel.findById(data.ticket.id);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    ticket.set({ orderId: data.id });

    await ticket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    msg.ack();
  }
}

export default OrderCreatedListener;
