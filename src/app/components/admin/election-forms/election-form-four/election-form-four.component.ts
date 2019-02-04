import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ElectionFormFour } from '../../../../model/election/election-form-four.model';
import { ElectionDataService } from '../../../../services/election-data.service';
import { VOTING_ALGORITHMS } from '../../../../model/election.model';

@Component({
  selector: 'app-election-form-four',
  templateUrl: './election-form-four.component.html',
  styleUrls: ['./election-form-four.component.scss']
})
export class ElectionFormFourComponent implements OnInit {
  algos = VOTING_ALGORITHMS;
  form4 = new ElectionFormFour();
  constructor(private router: Router, private route: ActivatedRoute, private electionDataService: ElectionDataService) {
    const origin = this.electionDataService.getOrigin();
    if (origin && 'valid' === origin) {
      this.form4 = this.electionDataService.getForm4();
    } else {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

  next() {
    this.electionDataService.setForm4(this.form4);
    this.router.navigate(['../form5'], { relativeTo: this.route, skipLocationChange: true });
  }

  previous() {
    this.router.navigate(['../form3'], { relativeTo: this.route, skipLocationChange: true });
  }

}
