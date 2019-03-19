import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { VotingService } from '../../../../../services/voting.service';
import { ElectionService } from '../../../../../services/election.service';
import { ElectionData } from '../../../../../model/electionData.model';
import { BallotData } from '../../../../../model/ballotData.model';

declare var $: any;

@Component({
  selector: 'app-preferencial-ballot',
  templateUrl: './preferencial-ballot.component.html',
  styleUrls: ['./preferencial-ballot.component.scss'],
})
export class PreferencialBallotComponent implements OnInit {
  election: ElectionData = new ElectionData();
  revealMsg = 'Show Ballots';
  msg = 'Vote';
  isLoading = false;
  startingTime: string;
  endingTime: string;
  localTimezoneStartingTime: string;
  localTimezoneEndingTime: string;
  candidates: String[] = new Array();
  selected: String[] = new Array();
  constructor(
    private votingService: VotingService,
    private electionService: ElectionService,
    private router: Router,
  ) {
    if (
      this.votingService.getOrigin() &&
      this.votingService.getOrigin() === 'valid'
    ) {
      this.candidates = votingService.getData().candidates;
      this.startingTime = votingService.getData().startingDate;
      this.localTimezoneStartingTime = new Date(this.startingTime).toLocaleString();
      this.endingTime = votingService.getData().endingDate;
      this.localTimezoneEndingTime = new Date(this.endingTime).toLocaleString();
      this.election = votingService.getData();
    }
  }

  ngOnInit() {}

  revealBallots() {
    const pastBallots = document.getElementById('ballotsDisplay');
    if (pastBallots.style.display === 'block') {
      pastBallots.style.display = 'none';
      this.revealMsg = 'Show Ballots';
    } else {
      pastBallots.style.display = 'block';
      this.revealMsg = 'Hide Ballots';
    }
  }

  delete(index: number) {
    Swal({
      title: 'Remove',
      text: 'Are you sure you want to remove this candidate from the ballot?',
      type: 'warning',
      confirmButtonColor: '#FFCD00',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.value) {
        const value = this.selected[index];
        this.selected.splice(index, 1);
        this.candidates.push(value);
      }
    });
  }

  add(index: number) {
    const value = this.candidates[index];
    this.candidates.splice(index, 1);
    this.selected.push(value);
  }

  isEmpty() {
    return this.selected.length < 1 ? true : false;
  }

  vote() {
    this.msg = 'Voting';
    let stringBallot = '';
    this.selected.forEach((candidate: string, index: number) => {
      if (index < this.selected.length - 1) {
        stringBallot = stringBallot.concat(candidate + '>');
      } else {
        stringBallot = stringBallot.concat(candidate);
      }
    });

    const ballot = new BallotData();
    ballot.ballotInput = stringBallot;
    ballot.passCode = this.votingService.getVoterCode();

    this.electionService
      .vote(this.votingService.getVoterID(), ballot)
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this.msg = 'Vote';
          Swal({
            title: 'OK',
            text: 'Your vote was successfully counted',
            type: 'success',
            confirmButtonColor: '#FFCD00',
            showCancelButton: false,
            confirmButtonText: 'Home',
          }).then(result => {
            this.router.navigate(['/home']);
          });
        },
        (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msg = 'Vote';
          if (err.status === 200) {
            Swal({
              title: 'OK',
              text: 'Your vote was successfully counted',
              type: 'success',
              confirmButtonColor: '#FFCD00',
              showCancelButton: false,
              confirmButtonText: 'Home',
            }).then(result => {
              this.router.navigate(['/home']);
            });
          } else {
            this.showNotification(
              'danger',
              'Failed to submit your vote. Please try again',
            );
          }
        },
      );
  }

  cancel() {
    this.showNotification(
      'danger',
      'You did not submit your vote. Remember your voting links expires when the election ends',
    );
    this.router.navigate(['/home']);
  }

  showNotification(notifType, message) {
    $.notify(
      {
        icon: notifType === 'success' ? 'done' : 'notifications',
        message: message,
      },
      {
        type: notifType,
        timer: 4000,
        placement: {
          from: 'top',
          align: 'right',
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>',
      },
    );
  }
}
