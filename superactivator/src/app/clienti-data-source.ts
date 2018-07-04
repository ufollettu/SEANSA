import { ApiService } from './api.service';
import { DataSource } from '@angular/cdk/table';

export class ClientiDataSource extends DataSource<any> {
    constructor(private api: ApiService) {
        super();
    }

    connect() {
        return this.api.getCustomers();
    }

    disconnect() {

    }
}
