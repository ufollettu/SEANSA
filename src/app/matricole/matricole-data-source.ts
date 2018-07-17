import { MatricoleApiService } from './matricole-api.service';
import { DataSource } from '@angular/cdk/table';

export class MatricoleDataSource extends DataSource<any> {
    constructor(private api: MatricoleApiService) {
        super();
    }

    connect() {
        return this.api.getMatricole();
    }

    disconnect() {

    }
}
