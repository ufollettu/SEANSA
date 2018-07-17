import { PcApiService } from './pc-api.service';
import { DataSource } from '@angular/cdk/table';

export class PcDataSource extends DataSource<any> {
    constructor(private api: PcApiService) {
        super();
    }

    connect() {
        return this.api.getPcs();
    }

    disconnect() {

    }
}
