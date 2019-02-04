import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ElectionDataService } from '../../../../services/election-data.service';
import { ElectionService } from '../../../../services/election.service';
import { Election } from '../../../../model/election.model';

@Component({
  selector: 'app-edit-election',
  templateUrl: './edit-election.component.html',
  styleUrls: ['./edit-election.component.scss']
})
export class EditElectionComponent implements OnInit {

  constructor(
      private electionDataService: ElectionDataService,
      private router: Router,
      private electionService: ElectionService,
      private route: ActivatedRoute
    ) {
      this.route.params.subscribe(params => {
        this.electionService.getElection(params['id']).subscribe((data: Election) => {
          electionDataService.setOrigin('valid');
          this.electionDataService.setStatus('edit');
          this.electionDataService.buildElectionFormsData(data);
          this.router.navigate(['./form1'], { relativeTo: this.route, skipLocationChange: true });
        },
          (err: HttpErrorResponse) => {
            this.router.navigate(['/dashboard']);
          });
    });
  }

  ngOnInit() {
  }

}
