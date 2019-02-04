import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ElectionFormOne } from '../../../../model/election/election-form-one.model';
import { ElectionDataService } from '../../../../services/election-data.service';

@Component({
  selector: 'app-election-form-one',
  templateUrl: './election-form-one.component.html',
  styleUrls: ['./election-form-one.component.scss']
})
export class ElectionFormOneComponent implements OnInit {

  form1 = new ElectionFormOne();
  constructor(private router: Router, private route: ActivatedRoute, private electionDataService: ElectionDataService) {
    const origin = this.electionDataService.getOrigin();
    if (origin && 'valid' === origin) {
      this.form1 = this.electionDataService.getForm1();
    } else {
        this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

  next() {
    this.electionDataService.setForm1(this.form1);
    this.router.navigate(['../form2'], { relativeTo: this.route, skipLocationChange: true });
  }
}
