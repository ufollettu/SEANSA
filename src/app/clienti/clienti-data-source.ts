import { ClientiApiService } from './clienti-api.service';
import { DataSource } from '@angular/cdk/table';

export class ClientiDataSource extends DataSource<any> {
    constructor(private api: ClientiApiService) {
        super();
    }

    connect() {
        return this.api.getCustomers();
    }

    disconnect() {

    }
}
