import { UtentiApiService } from './utenti-api.service';
import { DataSource } from '@angular/cdk/table';

export class UtentiDataSource extends DataSource<any> {
    constructor(private api: UtentiApiService) {
        super();
    }

    connect() {
        return this.api.getUtenti();
    }

    disconnect() {

    }
}
