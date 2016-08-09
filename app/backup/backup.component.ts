import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Http, Response } from '@angular/http';
import { MODAL_DIRECTIVES, ModalComponent  } from 'ng2-bs3-modal/ng2-bs3-modal';
import values = require("core-js/fn/array/values");
import { ArrayFilterPipe } from './array-filter.pipe';
import { MenuLeft } from './../menuleft/menuleft.component';


@Component({
    selector: 'catalog-backup',
    directives: [MODAL_DIRECTIVES, MenuLeft],
    pipes: [ArrayFilterPipe],
    templateUrl: 'app/backup/backup.component.html',
    styleUrls: ['app/backup/backup.component.css']
})

export class CatalogBackupComponent implements OnInit {
    @ViewChild('modal')
    modal: ModalComponent;
    constructor(private http: Http) {
        this.http = http;
    }
    data: any;
    dataPolicy:any;
    namePolicy:any;
    valuePolicy: Object;
    n : number;
    result: Object;
    VCenter: Array<Object>[];
    Policy: Array<Object>[];
    ngOnInit() {
       this.dataPolicy = {};
        this.data = {};
        this.http.get(`/app/backup/data.json`)
            .map(response => response.json().VCenter)
            .subscribe(
                data => this.VCenter = data,
                error => console.log(error)
            );
        this.http.get(`/app/backup/policy.json`)
            .map(response => response.json().Policy)
            .subscribe(
                dataPolicy => this.Policy = dataPolicy,
                error => console.log(error)
            );

    }
    onSelect(valuePolicy:any, valueName:any) {
        this.namePolicy = valueName;
        this.modal.open(valueName);
    }
    refresh() {
        this.ngOnInit();
    }
}
