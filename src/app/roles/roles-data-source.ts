import { RolesApiService } from './roles-api.service';
import { DataSource } from '@angular/cdk/table';

export class UtentiDataSource extends DataSource<any> {
    constructor(private api: RolesApiService) {
        super();
    }

    connect() {
        return this.api.getKeys();
    }

    disconnect() {

    }
}
