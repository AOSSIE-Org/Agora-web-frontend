import { Component, OnInit } from '@angular/core';

import { VotingService } from '../../../../../services/voting.service';

@Component({
  selector: 'app-approval-ballot',
  templateUrl: './approval-ballot.component.html',
  styleUrls: ['./approval-ballot.component.scss']
})
export class ApprovalBallotComponent implements OnInit {

  constructor(private votingService: VotingService) { }

  ngOnInit() {
  }

}
