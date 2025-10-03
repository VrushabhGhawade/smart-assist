export enum Priority {
    Low = 1,
    Medium = 2,
    High = 3
}

export enum TicketStatus {
    Open = 1,
    Closed = 2,
    Resolved = 3
}

export class CreateTicket {
    UserId: string | undefined;
    Title: string | undefined;
    Description: string | undefined;
    Status: TicketStatus | undefined;
    Priority: Priority | undefined;
    // CreatedBy: string | undefined;
    // AssignedToId: string | undefined;
    // AssignedToName: string | undefined;
    Attachment: any | null;
}
