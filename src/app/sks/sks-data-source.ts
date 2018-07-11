import { SksApiService } from './sks-api.service';
import { DataSource } from '@angular/cdk/table';

export class SksDataSource extends DataSource<any> {
    constructor(private api: SksApiService) {
        super();
    }

    connect() {
        return this.api.getSkss();
    }

    disconnect() {

    }
}
