"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Publisher {
    constructor(client) {
        this.client = client;
    }
    publish(data) {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if (err) {
                    return reject();
                }
                console.log("Event publish to subject ", this.subject);
                resolve();
            });
        });
    }
}
exports.default = Publisher;
