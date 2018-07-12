import { RinnoviApiService } from './rinnovi-api.service';
import { DataSource } from '@angular/cdk/table';

export class SksDataSource extends DataSource<any> {
    constructor(private api: RinnoviApiService) {
        super();
    }

    connect() {
        return this.api.getRinnovi();
    }

    disconnect() {

    }
}
