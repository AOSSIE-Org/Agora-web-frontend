import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ElectionDataService } from '../../../../services/election-data.service';
import { ElectionFormThree } from '../../../../model/election/election-form-three.model';

@Component({
  selector: 'app-election-form-three',
  templateUrl: './election-form-three.component.html',
  styleUrls: ['./election-form-three.component.scss']
})
export class ElectionFormThreeComponent implements OnInit {

  currentCandidate: string;
  form3 = new ElectionFormThree();
  constructor(private router: Router, private route: ActivatedRoute, private electionDataService: ElectionDataService) {
    const origin = this.electionDataService.getOrigin();
    if (origin && 'valid' === origin) {
      this.form3 = this.electionDataService.getForm3();
    } else {
      this.router.navigate(['dashboard']);
    }
    this.currentCandidate = '';
  }

  ngOnInit() {
  }

  hasCandidates() {
    if (this.form3.candidates.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  next() {
    this.electionDataService.setForm3(this.form3);
    this.router.navigate(['../form4'], { relativeTo: this.route, skipLocationChange: true });
  }

  delete(index: number) {
    this.form3.candidates.splice(index, 1);
  }

  previous() {
    this.router.navigate(['../form2'], { relativeTo: this.route, skipLocationChange: true });
  }

  add(candidate: string) {
    this.form3.candidates.push(candidate);
    this.currentCandidate = '';
  }

}
