import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ElectionDataService } from '../../../../services/election-data.service';

@Component({
  selector: 'app-create-election',
  templateUrl: './create-election.component.html',
  styleUrls: ['./create-election.component.scss']
})
export class CreateElectionComponent implements OnInit, OnDestroy {

  constructor(private electionDataService: ElectionDataService, private router: Router, private route: ActivatedRoute) {
    electionDataService.setOrigin('valid');
    electionDataService.setStatus('create');
    this.router.navigate(['./form1'], { relativeTo: this.route, skipLocationChange: true });

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
