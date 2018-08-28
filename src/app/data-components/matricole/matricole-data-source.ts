import { MatricoleApiService } from './matricole-api.service';
import { DataSource } from '@angular/cdk/table';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

export class MatricoleDataSource extends DataSource<any> {

    constructor(private api: MatricoleApiService, private sksId: string) {
        super();
    }

    connect() {
        return this.api.getMatricoleBySks(this.sksId);
    }

    disconnect() {

    }
}
